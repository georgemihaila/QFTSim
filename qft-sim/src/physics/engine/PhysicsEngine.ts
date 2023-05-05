import { IWorldParameters, Particle, useElectricFieldRepulsion } from '../'
import { Vector3 } from 'three'
import { SimulationSpace } from '../../infra'
import { PhysicalConstants } from '../'
import { useNewtonianGravity, useNewtonianGravity_GPU, usePlanetaryGravity } from './newtonian/Gravity'
import { worldProps } from '../World'
import { GPU } from 'gpu.js'

export interface PhysicsEngineWorldParameters {
    hasGravity: boolean
}

export interface PhysicsEngineParameters {
    particles: Particle[]
    simulationSpace: SimulationSpace
}

export class PhysicsEngine {
    private _particles: Particle[]
    private _origin: Vector3
    private _end: Vector3
    private _fastestParticleSpeed = 0
    private _restitution = 0.5
    private _friction = 0.5
    private totalMass = 0
    private _gpu = new GPU({ mode: 'gpu' })
    private _rescaleTime = true

    constructor(
        props: Partial<PhysicsEngineParameters>,
        private _centerOfMassChangedCallback?: (centerOfMass: Vector3) => void
    ) {
        this._particles = props.particles ?? []
        this._origin = props.simulationSpace?.origin.clone() ?? new Vector3()
        this._end = props.simulationSpace?.origin.clone().add(props.simulationSpace?.size.clone()) ?? new Vector3()
        if (worldProps.hasGravity) usePlanetaryGravity(this._particles)
        this.totalMass = this._particles.reduce((acc, cur) => acc + cur.relativisticMass, 0)
    }

    public update(deltaTime: number): void {
        this.doUpdatesAsync().then(() => this.updatePosition(deltaTime))

    }

    private doingWork = false

    private async doUpdatesAsync() {
        if (this.doingWork) return Promise.reject()

        this.doingWork = true
        if (worldProps.hasGravity) {
            //usePlanetaryGravity(this._particles)
            //useNewtonianGravity(this._particles)
            useNewtonianGravity_GPU(this._particles, this._gpu)
        }
        if (worldProps.hasElectricField) useElectricFieldRepulsion(this._particles)
        this.handleWallCollisions()
        //this.handleWallTeleportations()
        //this.handleCollisions()

        this.doingWork = false
    }

    // Update position, acceleration, and speed
    private updatePosition(deltaTime: number): void {
        const averagePosition = new Vector3(0, 0, 0)
        const averageSpeed = new Vector3(0, 0, 0)
        let energy = 0
        this._fastestParticleSpeed = 0
        if (worldProps.autoscaleTime) {
            for (const particle of this._particles) {
                const speed = particle.properties.speed?.length() ?? 0
                if (speed > this._fastestParticleSpeed) this._fastestParticleSpeed = speed
            }
            worldProps.timeScale = this._fastestParticleSpeed / (worldProps.autoscaleTimeTarget)
        }
        deltaTime /= worldProps.timeScale === 0 || !worldProps.autoscaleTime ? 1 : worldProps.timeScale

        for (const particle of this._particles) {
            const newSpeed = particle.properties.speed?.clone().add(particle.properties.acceleration?.clone().multiplyScalar(deltaTime) ?? new Vector3()) ?? new Vector3()
            const newPosition = particle.properties.position?.clone().add(particle.properties.speed?.clone().multiplyScalar(deltaTime) ?? new Vector3()) ?? new Vector3()

            particle.properties.position?.copy(newPosition)
            particle.properties.speed?.copy(newSpeed)

            averagePosition.add(newPosition.multiplyScalar(particle.relativisticMass / this._particles.length))
            averageSpeed.add(newSpeed)
        }
        averagePosition.divideScalar(this._particles.length)
        averageSpeed.divideScalar(this._particles.length)
        if (this._centerOfMassChangedCallback) this._centerOfMassChangedCallback(averagePosition)
    }
    // Handle collisions
    private handleCollisions(): void {
        const particles = this._particles
        const numParticles = particles.length

        for (let i = 0; i < numParticles; i++) {
            const p1 = particles[i]
            const position1 = p1.properties.position
            if (!position1) continue

            for (let j = i + 1; j < numParticles; j++) {
                const p2 = particles[j]
                const position2 = p2.properties.position ?? new Vector3()

                if (!p1.properties.mass || !p2.properties.mass || !p1.properties.position || !p2.properties.position) continue

                const distance = position1.distanceTo(position2)
                const radiiSum = p1.scale.length() + p2.scale.length()

                if (distance < radiiSum) {
                    //Do collision
                    const collisionNormal = position1.clone().sub(position2).normalize()
                    const relativeVelocity = p1.properties.speed?.clone().sub(p2.properties.speed ?? new Vector3()) ?? new Vector3()
                    const speedAlongNormal = relativeVelocity.dot(collisionNormal)
                    // Do not resolve if velocities are separating
                    if (speedAlongNormal > 0) continue
                    // Calculate restitution
                    const e = Math.min(this._restitution, this._restitution)
                    // Calculate impulse scalar
                    const j = -(1 + e) * speedAlongNormal
                    const impulse = collisionNormal.clone().multiplyScalar(j)
                    // Apply impulse
                    p1.properties.speed?.add(impulse.clone().multiplyScalar(1 / p1.properties.mass))
                    p2.properties.speed?.sub(impulse.clone().multiplyScalar(1 / p2.properties.mass))
                    // Apply friction
                    const tangent = relativeVelocity.clone().sub(collisionNormal.clone().multiplyScalar(speedAlongNormal))
                    if (tangent.length() > 0) {
                        tangent.normalize()
                        const jt = -relativeVelocity.dot(tangent)
                        const mu = Math.sqrt(this._friction * this._friction)
                        let frictionImpulse: Vector3
                        if (Math.abs(jt) < j * mu) {
                            frictionImpulse = tangent.clone().multiplyScalar(jt)
                        } else {
                            frictionImpulse = tangent.clone().multiplyScalar(-j).multiplyScalar(mu)
                        }
                        p1.properties.speed?.add(frictionImpulse.clone().multiplyScalar(1 / p1.properties.mass))
                        p2.properties.speed?.sub(frictionImpulse.clone().multiplyScalar(1 / p2.properties.mass))
                    }

                }
            }
        }
    }


    private handleWallCollisions(): void {
        for (const particle of this._particles) {
            for (let axis = 0; axis < 3; axis++) {
                if (particle.properties.position) {
                    if (particle.properties.position?.getComponent(axis) <= this._origin.getComponent(axis)) {
                        // Bounce off the wall by reversing the speed on this axis
                        particle.properties.speed?.setComponent(axis, (1 - worldProps.wallELoss) * -particle.properties.speed?.getComponent(axis))
                        // Set the particle position to the boundary
                        particle.properties.position.setComponent(axis, this._origin.getComponent(axis))
                    } else if (particle.properties.position.getComponent(axis) >= this._end.getComponent(axis)) {
                        // Bounce off the wall by reversing the speed on this axis
                        particle.properties.speed?.setComponent(axis, (1 - worldProps.wallELoss) * -particle.properties.speed?.getComponent(axis))
                        // Set the particle position to the boundary
                        particle.properties.position.setComponent(axis, this._end.getComponent(axis))
                    }
                }
            }
        }
    }
    private handleWallTeleportations(): void {
        for (const particle of this._particles) {
            for (let axis = 0; axis < 3; axis++) {
                if (particle.properties.position) {
                    if (particle.properties.position?.getComponent(axis) <= this._origin.getComponent(axis)) {
                        // Wrap around to the opposite side of the boundary
                        particle.properties.position.setComponent(axis, this._end.getComponent(axis) - (this._origin.getComponent(axis) - particle.properties.position?.getComponent(axis)))
                    } else if (particle.properties.position.getComponent(axis) >= this._end.getComponent(axis)) {
                        // Wrap around to the opposite side of the boundary
                        particle.properties.position.setComponent(axis, this._origin.getComponent(axis) + (particle.properties.position?.getComponent(axis) - this._end.getComponent(axis)))
                    }
                }
            }
        }
    }

}
