import { IWorldParameters, Particle, useElectricFieldRepulsion } from '../'
import { Vector3 } from 'three'
import { SimulationSpace } from '../../infra'
import { PhysicalConstants } from '../'
import { useNewtonianGravity, usePlanetaryGravity } from './newtonian/Gravity'

export interface PhysicsEngineWorldParameters {
    hasGravity: boolean
}

export interface PhysicsEngineParameters extends IWorldParameters {
    particles: Particle[]
    simulationSpace: SimulationSpace
}

export class PhysicsEngine {
    private _particles: Particle[]
    private _origin: Vector3
    private _end: Vector3
    private _hasGravity: boolean
    private _hasElectricField: Boolean
    private _autoscaleTime = true;
    private _timeScale = 1;
    private _autoscaleTimeTarget = 1e0 // m/s (1m = 1 grid line)
    private _fastestParticleSpeed = 0
    private _restitution = 0.5
    private _friction = 0.5
    private _wallCollisionEnergyLoss = 0.1
    private totalMass = 0
    constructor(
        props: Partial<PhysicsEngineParameters>,
        private _centerOfMassChangedCallback?: (centerOfMass: Vector3) => void
    ) {
        this._particles = props.particles ?? []
        this._origin = props.simulationSpace?.origin.clone() ?? new Vector3()
        this._end = props.simulationSpace?.origin.clone().add(props.simulationSpace?.size.clone()) ?? new Vector3()
        this._hasGravity = props.hasGravity ?? true
        this._hasElectricField = props.hasElectricField ?? false
        if (this._hasGravity) usePlanetaryGravity(this._particles)
        this.totalMass = this._particles.reduce((acc, cur) => acc + cur.relativisticMass, 0)
    }

    public update(deltaTime: number): void {
        this.updatePosition(deltaTime)
        this.handleWallCollisions()
        useNewtonianGravity(this._particles)
        if (this._hasElectricField) useElectricFieldRepulsion(this._particles)
        //this.handleCollisions()
    }

    debounce(func: Function, delay: number): Function {
        let timeoutId: ReturnType<typeof setTimeout>

        return function (this: any) { // Define the type of `this`
            const context = this
            const args = arguments

            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => func.apply(context, args), delay)
        }
    }

    // Update position, acceleration, and speed
    private updatePosition(deltaTime: number): void {
        const averagePosition = new Vector3(0, 0, 0)
        const averageSpeed = new Vector3(0, 0, 0)
        let energy = 0
        if (this._autoscaleTime) {
            for (const particle of this._particles) {
                const speed = particle.properties.speed?.length() ?? 0
                if (speed > this._fastestParticleSpeed) this._fastestParticleSpeed = speed
            }
            this._timeScale = this._fastestParticleSpeed / this._autoscaleTimeTarget
            deltaTime /= this._timeScale === 0 ? 1 : this._timeScale
            //console.log(`Autoscaling time to ${1 / this._timeScale}`)
        }

        for (const particle of this._particles) {
            const newPosition = particle.properties.position?.clone().add(particle.properties.speed?.clone().multiplyScalar(deltaTime) ?? new Vector3()) ?? new Vector3()
            const newSpeed = particle.properties.speed?.clone().add(particle.properties.acceleration?.clone().multiplyScalar(deltaTime) ?? new Vector3()) ?? new Vector3()

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
                    // Calculate collision normal and tangent vectors
                    const collisionNormal = new Vector3().subVectors(position2, position1).normalize()
                    const collisionTangent = new Vector3().crossVectors(collisionNormal, new Vector3(0, 0, 1)).normalize()

                    // Calculate relative speed and relative position
                    const speed1 = p1.properties.speed || new Vector3()
                    const speed2 = p2.properties.speed || new Vector3()
                    const relativespeed = new Vector3().subVectors(speed2, speed1)
                    const relativePosition = new Vector3().subVectors(position2, position1)

                    // Calculate impulse magnitude and direction
                    const numerator = -(1 + this._restitution) * relativespeed.dot(collisionNormal)
                    const denominator = collisionNormal.dot(collisionNormal) * (1 / p1.properties.mass + 1 / p2.properties.mass)
                    const impulseMagnitude = numerator / denominator
                    const impulse = collisionNormal.clone().multiplyScalar(impulseMagnitude)

                    // Apply impulses to particles
                    p1.properties.speed = speed1.clone().add(impulse.clone().multiplyScalar(1 / p1.properties.mass))
                    p2.properties.speed = speed2.clone().sub(impulse.clone().multiplyScalar(1 / p2.properties.mass))

                    // Add friction
                    const friction = this._friction
                    const impulseTangentMagnitude = relativespeed.dot(collisionTangent) / denominator
                    const impulseTangent = collisionTangent.clone().multiplyScalar(impulseTangentMagnitude)

                    const impulseCombined = impulse.clone().add(impulseTangent.clone().multiplyScalar(friction))
                    p1.properties.speed.add(impulseCombined.clone().multiplyScalar(1 / p1.properties.mass))
                    p2.properties.speed.sub(impulseCombined.clone().multiplyScalar(1 / p2.properties.mass))

                    // Separate particles to prevent overlap
                    const separation = collisionNormal.clone().multiplyScalar(radiiSum - distance)
                    p1.properties.position.add(separation.clone().multiplyScalar(1 / p1.properties.mass))
                    p2.properties.position.sub(separation.clone().multiplyScalar(1 / p2.properties.mass))


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
                        particle.properties.speed?.setComponent(axis, (1 - this._wallCollisionEnergyLoss) * -particle.properties.speed?.getComponent(axis))
                        // Set the particle position to the boundary
                        particle.properties.position.setComponent(axis, this._origin.getComponent(axis))
                    } else if (particle.properties.position.getComponent(axis) >= this._end.getComponent(axis)) {
                        // Bounce off the wall by reversing the speed on this axis
                        particle.properties.speed?.setComponent(axis, (1 - this._wallCollisionEnergyLoss) * -particle.properties.speed?.getComponent(axis))
                        // Set the particle position to the boundary
                        particle.properties.position.setComponent(axis, this._end.getComponent(axis))
                    }
                }
            }
        }
    }

}
