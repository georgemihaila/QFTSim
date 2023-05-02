import { Vector3 } from 'three';
import { Tensor, DecayMode } from '../';

export interface ParticleProperties {
    type: ParticleType;
    mass: number; // in electron volts (eV)
    charge: number; // in elementary charge units (e)
    spin: number; // in units of h-bar (ħ)
    colorCharge?: ColorCharge;
    flavor?: QuarkFlavor;
    isospin?: Isospin;
    weakHypercharge?: number;
    chirality?: Chirality;
    parity?: Parity;
    cp?: CP;
    baryonNumber?: number;
    leptonNumber?: number;
    generation?: Generation;
    lifetime?: number; // in seconds
    decayModes?: DecayMode[];
    interactionCrossSection?: number; // in square meters
    magneticMoment?: Vector3; // in Bohr magnetons
    electricDipoleMoment?: Vector3; // in elementary charge units (e) * meter (m)
    meanSquareRadius?: number; // in meters (m)
    comptonWavelength?: number; // in meters (m)
    magneticQuantumNumber?: number;
    electricQuantumNumber?: number;
    position?: Vector3; // in meters (m)
    speed?: Vector3; // in meters per second (m/s)
    acceleration?: Vector3; // in meters per second squared (m/s^2)
    relativisticSpeed?: number; // dimensionless, calculated as v / c where c is the speed of light
    relativisticAcceleration?: Vector3; // in meters per second squared (m/s^2), taking into account relativistic effects
    massTensor?: Tensor; // a rank-2 tensor representing the mass distribution of the particle
    lengthTensor?: Tensor; // a rank-2 tensor representing the length scaling of the particle
}



export enum ParticleType {
    Quark,
    Lepton,
    GaugeBoson,
    ScalarBoson,
}

export enum ColorCharge {
    Red,
    Green,
    Blue,
    AntiRed,
    AntiGreen,
    AntiBlue,
}

export enum QuarkFlavor {
    Up,
    Down,
    Charm,
    Strange,
    Top,
    Bottom
}

export enum Isospin {
    Up,
    Down,
}

export enum Chirality {
    Left,
    Right,
}

export enum Parity {
    Positive,
    Negative,
}

export enum CP {
    Conservation,
    Violation,
}

export enum Generation {
    First,
    Second,
    Third,
}
