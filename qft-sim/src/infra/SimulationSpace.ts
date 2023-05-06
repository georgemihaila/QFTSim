import {
    Object3D,
    BoxGeometry,
    Mesh,
    MeshStandardMaterial,
    Color,
    Vector3,
    Camera,
    Clock,
} from 'three'
import { I3DObject } from './I3DObject'
import { Renderable } from './IRenderable'
import { PhysicsEngine, Particle, IWorldParameters, worldProps } from '../physics'

export class SimulationSpace {
    public origin: Vector3
    public size: Vector3
    public enabled: boolean
    private _engine: PhysicsEngine
    private _particles: Particle[] = [];
    private _clock: Clock = new Clock();

    constructor(
        origin: Vector3,
        size: Vector3,
        particles: Particle[],
        private _centerOfMassChangedCallback?: (centerOfMass: Vector3) => void) {
        this.origin = origin
        this.size = size
        this.enabled = true
        this._engine = new PhysicsEngine({
            particles: particles,
            simulationSpace: this
        }, _centerOfMassChangedCallback)
        this._particles = particles
        //Add origin to each particle's position
        for (let i = 0; i < this._particles.length; i++) {
            this._particles[i].properties.position?.add(this.origin)
        }
    }

    private _ignoreDelta: boolean = false

    update(): void {
        if (worldProps.paused) {
            this._ignoreDelta = true
            return
        }
        const delta = this._clock.getDelta()
        this._engine.update(this._ignoreDelta ? 0 : delta)
        if (this._ignoreDelta) this._ignoreDelta = false
        //update particle position and rotation based on the ref object
        const temp = new Object3D()
        for (let i = 0; i < this._particles.length; i++) {
            if (!this._particles[i].ref) continue
            if (this._particles[i].properties.position) {
                temp.position.copy(this._particles[i].properties.position ?? new Vector3())
                this._particles[i].ref?.current.position.copy(this._particles[i].properties.position)
            }
            if (this._particles[i].properties.rotation) {
                // temp.rotation.copy(this._particles[i].properties.rotation)
                this._particles[i].ref?.current.rotation.copy(this._particles[i].properties.rotation)
            }
            if (this._particles[i].ref?.current.setMatrixAt) {
                this._particles[i].ref?.current.setMatrixAt(i, temp.matrix)
                this._particles[i].ref?.current.setMatrixAt(i, temp.matrix)
            }
        }
    }
}
