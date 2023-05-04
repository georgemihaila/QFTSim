

using System.Numerics;

namespace SimGround.Infra.Physics
{
    public interface IParticleProperties : IRelativisticProperties
    {
        ParticleType Type { get; set; }
        double Mass { get; set; } // in electron volts (eV)
        double ChargeEV { get; set; } // in elementary charge units (e)
        double Spin { get; set; } // in units of h-bar (ħ)
        ColorCharge? ColorCharge { get; set; }
        QuarkFlavor? Flavor { get; set; }
        Isospin? Isospin { get; set; }
        double? WeakHypercharge { get; set; }
        Chirality? Chirality { get; set; }
        Parity? Parity { get; set; }
        CP? CP { get; set; }
        double? BaryonNumber { get; set; }
        double? LeptonNumber { get; set; }
        Generation? Generation { get; set; }
        double? Lifetime { get; set; } // in seconds
        DecayMode[]? DecayModes { get; set; }
        double? InteractionCrossSection { get; set; } // in square meters
        Vector3? MagneticMoment { get; set; } // in Bohr magnetons
        Vector3? ElectricDipoleMoment { get; set; } // in elementary charge units (e) * meter (m)
        double? MeanSquareRadius { get; set; } // in meters (m)
        double? ComptonWavelength { get; set; } // in meters (m)
        double? MagneticQuantumNumber { get; set; }
        double? ElectricQuantumNumber { get; set; }
        Vector3? Position { get; set; } // in meters (m)
        Vector3? Speed { get; set; } // in meters per second (m/s)
        Vector3? Rotation { get; set; } // in radians
        Vector3? RotationSpeed { get; set; } // in radians per second (rad/s)
        Vector3? Acceleration { get; set; } // in meters per second squared (m/s^2)
    }
}
