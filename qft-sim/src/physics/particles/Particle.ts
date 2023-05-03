import { Color, Mesh, Vector3 } from "three"
import { ParticleProperties, RelativisticProperties } from './ParticleProperties'
import { PhysicalConstants } from '../PhysicalConstants'

const c = PhysicalConstants.SPEED_OF_LIGHT
export interface ParticleParameters {
    color: Color
}

export abstract class Particle implements ParticleParameters, RelativisticProperties {
    public color: Color
    private _sphere?: Mesh
    public enabled: boolean = true;
    public properties: Partial<ParticleProperties>
    public scale: Vector3 = new Vector3(1, 1, 1);
    get relativisticSpeed() {
        return this?.properties?.speed?.length() ?? 0 / c
    }
    get relativisticAcceleration() {
        return this.properties.acceleration?.multiplyScalar(1 / (1 - Math.pow(this.relativisticSpeed, 2))) // relativistic acceleration
    }
    get relativisticMass() {
        return this.properties?.mass ?? 0 / Math.sqrt(1 - Math.pow(this.relativisticSpeed, 2)) // relativistic mass
    }
    get energy() {
        return Math.sqrt(Math.pow(this.relativisticMass * Math.pow(c, 2), 2) + Math.pow(this.relativisticMass * (this.properties?.speed?.length() ?? 0), 2))
    }
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

