using System.Numerics;

namespace SimGround.Infra.Physics.Particles
{
    public class GenericParticle : IParticle
    {
        public ParticleType Type { get; set; }
        public double Mass { get; set; }
        public double ChargeEV { get; set; }
        public double Spin { get; set; }
        public ColorCharge? ColorCharge { get; set; }
        public QuarkFlavor? Flavor { get; set; }
        public Isospin? Isospin { get; set; }
        public double? WeakHypercharge { get; set; }
        public Chirality? Chirality { get; set; }
        public Parity? Parity { get; set; }
        public CP? CP { get; set; }
        public double? BaryonNumber { get; set; }
        public double? LeptonNumber { get; set; }
        public Generation? Generation { get; set; }
        public double? Lifetime { get; set; }
        public DecayMode[]? DecayModes { get; set; }
        public double? InteractionCrossSection { get; set; }
        public Vector3? MagneticMoment { get; set; } = Vector3.Zero;
        public Vector3? ElectricDipoleMoment { get; set; } = Vector3.Zero;
        public double? MeanSquareRadius { get; set; } = 0;
        public double? ComptonWavelength { get; set; } = 0;
        public double? MagneticQuantumNumber { get; set; } = 0;
        public double? ElectricQuantumNumber { get; set; } = 0;
        public Vector3? Position { get; set; } = Vector3.Zero;
        public Vector3? Speed { get; set; } = Vector3.Zero;
        public Vector3? Rotation { get; set; } = Vector3.Zero;
        public Vector3? RotationSpeed { get; set; } = Vector3.Zero;
        public Vector3? Acceleration { get; set; } = Vector3.Zero;
        public double? RelativisticSpeed { get; set; }
        public Vector3? RelativisticAcceleration { get; set; } = Vector3.Zero;
        public double? RelativisticMass { get; set; }
        public double? Energy { get; set; }
    }
}
