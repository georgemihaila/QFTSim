import { Color, Vector3 } from 'three';
import { Particle, ParticleProperties } from '..';

export class GenericParticle extends Particle {
    constructor(color: Color, properties: Partial<ParticleProperties> = {
        position: new Vector3(),
        speed: new Vector3(),
        acceleration: new Vector3(),
    }) {
        super(color, properties)
    }
}