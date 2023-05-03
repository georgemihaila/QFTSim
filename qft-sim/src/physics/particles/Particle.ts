import { Color, Mesh, Vector3 } from "three";
import { ParticleProperties } from './ParticleProperties';

export interface ParticleParameters {
    color: Color
}

export abstract class Particle implements ParticleParameters {
    public color: Color;
    private _sphere?: Mesh
    public enabled: boolean = true;
    public properties: Partial<ParticleProperties>;
    public scale: Vector3 = new Vector3(1, 1, 1);
    public ref?: any
    constructor(color: Color, properties: Partial<ParticleProperties> = {
        position: new Vector3(),
        speed: new Vector3(),
        acceleration: new Vector3(),
    }) {
        this.properties = properties
        this.color ??= new Color(0xffffff)
    }
}

