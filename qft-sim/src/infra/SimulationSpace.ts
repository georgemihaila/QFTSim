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
import { PhysicsEngine, Particle } from '../physics'

export class SimulationSpace {
    public origin: Vector3
    public size: Vector3
    public enabled: boolean
    private _engine: PhysicsEngine
    private _particles: Particle[] = [];
    private _clock: Clock = new Clock();

    constructor(origin: Vector3, size: Vector3, particles: Particle[]) {
        this.origin = origin
        this.size = size
        this.enabled = true
        this._engine = new PhysicsEngine(particles, this)
        this._particles = particles
    }

    update(): void {
        this._engine.update(this._clock.getDelta())
        //update particle position and rotation based on the ref object
        for (let i = 0; i < this._particles.length; i++) {
            if (this._particles[i].properties.position)
                this._particles[i].ref.current.position.copy(this._particles[i].properties.position)
            if (this._particles[i].properties.rotation)
                this._particles[i].ref.current.rotation.copy(this._particles[i].properties.rotation)
        }
    }

    create(): Renderable {
        // Create glass-like box geometry
        const boxGeometry = new BoxGeometry(this.size.x, this.size.y, this.size.z)
        const glassMaterial = new MeshStandardMaterial({
            color: new Color(0xabcdef),
            transparent: true,
            opacity: 0.1,
            metalness: 0.7,
            roughness: 0.1,
        })

        const simulationAreaCube = new Mesh(boxGeometry, glassMaterial)
        simulationAreaCube.position.set(
            this.origin.x, this.origin.y, this.origin.z
        )
        return simulationAreaCube as Renderable
    }
}
