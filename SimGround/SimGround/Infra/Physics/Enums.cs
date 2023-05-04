namespace SimGround.Infra.Physics
{
    public enum ParticleType
    {
        Quark,
        Lepton,
        GaugeBoson,
        ScalarBoson,
    }

    public enum ColorCharge
    {
        Red,
        Green,
        Blue,
        AntiRed,
        AntiGreen,
        AntiBlue,
    }

    public enum QuarkFlavor
    {
        Up,
        Down,
        Charm,
        Strange,
        Top,
        Bottom
    }

    public enum Isospin
    {
        Up,
        Down,
    }

    public enum Chirality
    {
        Left,
        Right,
    }

    public enum Parity
    {
        Positive,
        Negative,
    }

    public enum CP
    {
        Conservation,
        Violation,
    }

    public enum Generation
    {
        First,
        Second,
        Third,
    }
}
