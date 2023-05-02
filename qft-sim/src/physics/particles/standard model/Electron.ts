import { Color } from "three";
import { ParticleType, Particle } from "../";

export class Electron extends Particle {
    constructor() {
        super(
            new Color(0xff0000),
            {
                type: ParticleType.Lepton,
                mass: 0.5109989461, // Electron mass in MeV/c^2 (CODATA 2018)
                charge: -1, // Electron charge in elementary charge units (CODATA 2018)
                spin: 0.5, // Electron spin in units of h-bar (ħ)
            });
    }
}
