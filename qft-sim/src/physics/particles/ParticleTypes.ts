
export enum Quark {
    Up,
    Down,
    Charm,
    Strange,
    Top,
    Bottom,
}

export enum Lepton {
    Electron,
    ElectronNeutrino,
    Muon,
    MuonNeutrino,
    Tau,
    TauNeutrino,
}

export enum GaugeBoson {
    Gluon,
    Photon,
    WPlus,
    WMinus,
    Z,
}

export enum ScalarBoson {
    Higgs,
}


export type KnownParticle = ExistingParticles | ExistingAntiparticles | TheorizedParticles | TheorizedAntiParticles;

export enum ExistingParticles {
    Electron = "Electron",
    ElectronNeutrino = "ElectronNeutrino",
    Muon = "Muon",
    MuonNeutrino = "MuonNeutrino",
    Tau = "Tau",
    TauNeutrino = "TauNeutrino",
    UpQuark = "UpQuark",
    DownQuark = "DownQuark",
    CharmQuark = "CharmQuark",
    StrangeQuark = "StrangeQuark",
    TopQuark = "TopQuark",
    BottomQuark = "BottomQuark",
    Gluon = "Gluon",
    Photon = "Photon",
    WPlus = "WPlus",
    WMinus = "WMinus",
    ZBoson = "ZBoson",
    HiggsBoson = "HiggsBoson",
}

export enum ExistingAntiparticles {
    Positron = "Positron",
    ElectronAntineutrino = "ElectronAntineutrino",
    Antimuon = "Antimuon",
    MuonAntineutrino = "MuonAntineutrino",
    TauPlus = "TauPlus",
    TauAntineutrino = "TauAntineutrino",
    UpAntiquark = "UpAntiquark",
    DownAntiquark = "DownAntiquark",
    CharmAntiquark = "CharmAntiquark",
    StrangeAntiquark = "StrangeAntiquark",
    TopAntiquark = "TopAntiquark",
    BottomAntiquark = "BottomAntiquark",
    Gluon = "Gluon",
    Photon = "Photon",
    WMinus = "WMinus",
    WPlus = "WPlus",
    ZBoson = "ZBoson",
    HiggsBoson = "HiggsBoson",
}

export enum TheorizedParticles {
    Axion = "Axion",
    DarkPhoton = "DarkPhoton",
    Graviton = "Graviton",
    HiggsBosonImaginary = "HiggsBosonImaginary",
    MagneticMonopole = "MagneticMonopole",
    Neutralino = "Neutralino",
    SterileNeutrino = "SterileNeutrino",
}

export enum TheorizedAntiParticles {
    AntiAxion = "AntiAxion",
    AntiDarkPhoton = "AntiDarkPhoton",
    AntiGraviton = "AntiGraviton",
    AntiHiggsBosonImaginary = "AntiHiggsBosonImaginary",
    AntiMagneticMonopole = "AntiMagneticMonopole",
    AntiNeutralino = "AntiNeutralino",
    AntiSterileNeutrino = "AntiSterileNeutrino",
}


export type FundamentalParticle = Quark | Lepton | GaugeBoson | ScalarBoson;