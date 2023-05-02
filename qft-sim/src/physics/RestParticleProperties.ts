import { Vector3 } from 'three';
import { DecayMode } from './DecayMode';
import { QuarkFlavor, ParticleProperties, ParticleType, Isospin, ColorCharge, Generation } from './ParticleProperties';
import { ExistingAntiparticles, ExistingParticles, KnownParticle } from './particles/ParticleTypes';

export const ELECTRON_PROPERTIES: ParticleProperties = {
    type: ParticleType.Lepton,
    mass: 0.51099895000, // in MeV/c^2 (source: PDG)
    charge: -1, // in elementary charge units (e)
    spin: 0.5, // in units of h-bar (ħ)
    leptonNumber: 1,
    lifetime: 2.1969811e-6, // in seconds (source: PDG)
    decayModes: [new DecayMode([ExistingParticles.ElectronNeutrino, ExistingParticles.WMinus], 0)],
    interactionCrossSection: 0.665e-31, // in square meters (source: PDG)
    magneticMoment: new Vector3(0, 0, -0.00115965218091), // in Bohr magnetons (source: PDG)
    meanSquareRadius: 2.8179403267e-15, // in meters (source: PDG)
    comptonWavelength: 2.42631023894e-12, // in meters (source: PDG)
}

export const PHOTON_PROPERTIES: ParticleProperties = {
    type: ParticleType.GaugeBoson,
    mass: 0,
    charge: 0,
    spin: 1,
    lifetime: Infinity,
    decayModes: [],
};

export const ELECTRON_NEUTRINO_PROPERTIES: ParticleProperties = {
    type: ParticleType.Lepton,
    mass: 2.2, // eV/c^2
    charge: 0,
    spin: 0.5,
    interactionCrossSection: 0.7e-44, // m^2
    lifetime: Infinity, // s
    decayModes: [],
};

export const MUON_PROPERTIES: ParticleProperties = {
    type: ParticleType.Lepton,
    mass: 105.7, // MeV/c^2
    charge: -1,
    spin: 0.5,
    interactionCrossSection: 1.7e-43, // m^2
    lifetime: 2.2e-6, // s
    decayModes: [],
};

export const TAU_PROPERTIES: ParticleProperties = {
    type: ParticleType.Lepton,
    mass: 1776.82, // MeV/c^2
    charge: -1,
    spin: 0.5,
    interactionCrossSection: 2.6e-42, // m^2
    lifetime: 2.9e-13, // s
    decayModes: [],
};

export const TAU_NEUTRINO_PROPERTIES: ParticleProperties = {
    type: ParticleType.Lepton,
    mass: 15.5, // eV/c^2
    charge: 0,
    spin: 0.5,
    interactionCrossSection: 0.9e-44, // m^2
    lifetime: Infinity, // s
    decayModes: [],
};

export const UP_QUARK_PROPERTIES: ParticleProperties = {
    type: ParticleType.Quark,
    flavor: QuarkFlavor.Up,
    mass: 2.2, // in MeV/c^2
    charge: 2 / 3, // in elementary charge units (e)
    spin: 1 / 2, // in units of h-bar (ħ)
    baryonNumber: 1 / 3,
};
const DOWN_QUARK_PROPERTIES: ParticleProperties = {
    type: ParticleType.Quark,
    mass: 4.8, // in electron volts (eV)
    charge: -1 / 3, // in elementary charge units (e)
    spin: 0.5, // in units of h-bar (ħ)
    flavor: QuarkFlavor.Down,
    isospin: Isospin.Down,
    baryonNumber: 1 / 3,
};

const CHARM_QUARK_PROPERTIES: ParticleProperties = {
    type: ParticleType.Quark,
    mass: 1270, // in electron volts (eV)
    charge: 2 / 3, // in elementary charge units (e)
    spin: 0.5, // in units of h-bar (ħ)
    flavor: QuarkFlavor.Charm,
    baryonNumber: 1 / 3,
    lifetime: 1.67e-12, // in seconds
};

export const STRANGE_QUARK_PROPERTIES: ParticleProperties = {
    type: ParticleType.Quark,
    mass: 93, // in electron volts (eV)
    charge: -1 / 3, // in elementary charge units (e)
    spin: 1 / 2, // in units of h-bar (ħ)
    flavor: QuarkFlavor.Strange,
    isospin: Isospin.Down,
    baryonNumber: 1 / 3,
};

export const TOP_QUARK_PROPERTIES: ParticleProperties = {
    type: ParticleType.Quark,
    mass: 173100, // in electron volts (eV)
    charge: 2 / 3, // in elementary charge units (e)
    spin: 1 / 2, // in units of h-bar (ħ)
    flavor: QuarkFlavor.Top,
    isospin: undefined,
    baryonNumber: 1 / 3,
    lifetime: 5e-25, // in seconds
};

export const BOTTOM_QUARK_PROPERTIES: ParticleProperties = {
    type: ParticleType.Quark,
    mass: 4.18e+3, // in electron volts (eV)
    charge: -1 / 3, // in elementary charge units (e)
    spin: 1 / 2, // in units of h-bar (ħ)
    flavor: QuarkFlavor.Bottom,
    isospin: Isospin.Down,
    baryonNumber: 1 / 3,
}

export const GLUON_PROPERTIES: ParticleProperties = {
    type: ParticleType.GaugeBoson,
    mass: 0, // in electron volts (eV)
    charge: 0, // in elementary charge units (e)
    spin: 1, // in units of h-bar (ħ)
}

export const W_PLUS_PROPERTIES: Partial<ParticleProperties> = {
    type: ParticleType.GaugeBoson,
    mass: 80.379,
    charge: 1,
    spin: 1,
    isospin: Isospin.Up,
    weakHypercharge: 0,
    baryonNumber: 0,
    leptonNumber: 0,
    generation: Generation.First,
    lifetime: 3.11e-25,
    decayModes: [
        new DecayMode([ExistingParticles.UpQuark, ExistingAntiparticles.CharmAntiquark], 0.0035),
        new DecayMode([ExistingParticles.DownQuark, ExistingAntiparticles.StrangeAntiquark], 0.0015),
    ],
};

export const W_MINUS_PROPERTIES: Partial<ParticleProperties> = {
    type: ParticleType.GaugeBoson,
    mass: 80.379,
    charge: -1,
    spin: 1,
    isospin: Isospin.Down,
    weakHypercharge: 0,
    baryonNumber: 0,
    leptonNumber: 0,
    generation: Generation.First,
    lifetime: 3.11e-25,
    decayModes: [
        new DecayMode([ExistingParticles.DownQuark, ExistingAntiparticles.CharmAntiquark], 0.0035),
        new DecayMode([ExistingParticles.UpQuark, ExistingAntiparticles.StrangeAntiquark], 0.0015),
    ],
};

export const Z_BOSON_PROPERTIES: Partial<ParticleProperties> = {
    type: ParticleType.GaugeBoson,
    mass: 91.1876,
    charge: 0,
    spin: 1,
    weakHypercharge: 0,
    baryonNumber: 0,
    leptonNumber: 0,
    lifetime: 2.64e-25,
    decayModes: [
        new DecayMode([ExistingParticles.Electron, ExistingAntiparticles.Positron], 3.365),
        new DecayMode([ExistingParticles.Muon, ExistingAntiparticles.Antimuon], 3.366),
        new DecayMode([ExistingParticles.Tau, ExistingAntiparticles.TauAntineutrino], 3.370),
    ],
};

export const HIGGS_BOSON_PROPERTIES: Partial<ParticleProperties> = {
    type: ParticleType.ScalarBoson,
    mass: 125.10,
    charge: 0,
    spin: 0,
    weakHypercharge: 0.5,
    baryonNumber: 0,
    leptonNumber: 0,
    lifetime: 1.56e-22,
    decayModes: [
        new DecayMode([ExistingParticles.BottomQuark, ExistingAntiparticles.BottomAntiquark], 0.580),
        new DecayMode([ExistingParticles.Tau, ExistingAntiparticles.TauAntineutrino], 0.062),
        new DecayMode([ExistingParticles.WMinus, ExistingAntiparticles.WPlus], 0.217),
        new DecayMode([ExistingParticles.ZBoson, ExistingAntiparticles.ZBoson], 0.026),
        new DecayMode([ExistingParticles.Photon, ExistingAntiparticles.Photon], 0.002),
    ],
};
