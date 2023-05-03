import { Particle, useElectricFieldRepulsion } from '../'
import { Vector3 } from 'three'
import { SimulationSpace } from '../../infra'
import { PhysicalConstants } from '../'
import { useNewtonianGravity, usePlanetaryGravity } from './newtonian/Gravity'

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
    private _hasGravity: boolean = false;

    constructor(particles: Particle[], _simulationSpace: SimulationSpace) {
        this._particles = particles
        this._origin = _simulationSpace.origin.clone()
        this._end = _simulationSpace.origin.clone().add(_simulationSpace.size.clone())
    }

    public update(deltaTime: number): void {
        this.updatePosition(deltaTime)
        //this.handleCollisions();
        this.handleWallCollisions()
        if (this._hasGravity) usePlanetaryGravity(this._particles)
        useNewtonianGravity(this._particles)
        useElectricFieldRepulsion(this._particles)
    }

    // Update position, acceleration, and speed
    private updatePosition(deltaTime: number): void {
        deltaTime /= 1000 // Convert to seconds
        for (const particle of this._particles) {
            const newPosition = particle.properties.position?.clone().add(particle.properties.speed?.clone().multiplyScalar(deltaTime) ?? new Vector3()) ?? new Vector3()
            const newSpeed = particle.properties.speed?.clone().add(particle.properties.acceleration?.clone().multiplyScalar(deltaTime) ?? new Vector3()) ?? new Vector3()

            particle.properties.position?.copy(newPosition)
            particle.properties.speed?.copy(newSpeed)
        }
    }
    // Handle collisions
    private handleCollisions(): void {
        for (let i = 0; i < this._particles.length; i++) {
            const p1 = this._particles[i]

            for (let j = i + 1; j < this._particles.length; j++) {
                const p2 = this._particles[j]
                if (!p1.properties.position || !p2.properties.position) continue
                const distance = p1.properties.position.distanceTo(p2.properties.position)
                const radiusSum = p1.scale.x + p2.scale.x // Assuming uniform scaling

                if (distance <= radiusSum) {
                    // Basic collision response - reverse the speed of both particles
                    p1.properties.speed?.negate()
                    p2.properties.speed?.negate()
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
                        particle.properties.speed?.setComponent(axis, -particle.properties.speed?.getComponent(axis))
                        // Set the particle position to the boundary
                        particle.properties.position.setComponent(axis, this._origin.getComponent(axis))
                    } else if (particle.properties.position.getComponent(axis) >= this._end.getComponent(axis)) {
                        // Bounce off the wall by reversing the speed on this axis
                        particle.properties.speed?.setComponent(axis, -particle.properties.speed?.getComponent(axis))
                        // Set the particle position to the boundary
                        particle.properties.position.setComponent(axis, this._end.getComponent(axis))
                    }
                }
            }
        }
    }

}
