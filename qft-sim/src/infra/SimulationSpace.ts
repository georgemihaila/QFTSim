import {
    Object3D,
    BoxGeometry,
    Mesh,
    MeshStandardMaterial,
    Color,
    Vector3,
    Camera,
    Clock,
} from 'three';
import { I3DObject } from './I3DObject';
import { Renderable } from './IRenderable';
import { PhysicsEngine, Particle } from '../physics';

export class SimulationSpace {
    public origin: Vector3;
    public size: Vector3;
    public enabled: boolean;
    private _engine: PhysicsEngine
    private _clock: Clock = new Clock();

    constructor(origin: Vector3, size: Vector3, particles: Particle[]) {
        this.origin = origin;
        this.size = size;
        this.enabled = true;
        this._engine = new PhysicsEngine(particles, this);
    }

    update(): void {
        this._engine.update(this._clock.getDelta());
    }

    create(): Renderable {
        // Create glass-like box geometry
        const boxGeometry = new BoxGeometry(this.size.x, this.size.y, this.size.z);
        const glassMaterial = new MeshStandardMaterial({
            color: new Color(0xabcdef),
            transparent: true,
            opacity: 0.1,
            metalness: 0.7,
            roughness: 0.1,
        });

        const simulationAreaCube = new Mesh(boxGeometry, glassMaterial);
        simulationAreaCube.position.set(
            this.origin.x + this.size.x / 2,
            this.origin.y + this.size.y / 2,
            this.origin.z + this.size.z / 2
        );
        this.origin.sub(this.size.divideScalar(2));
        return simulationAreaCube as Renderable;
    }
}
