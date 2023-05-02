import { KnownParticle } from './particles/ParticleTypes';

export class DecayMode {
    public readonly products: KnownParticle[];
    public readonly probability: number;

    constructor(products: KnownParticle[], probability: number) {
        this.products = products;
        this.probability = probability;
    }
}
