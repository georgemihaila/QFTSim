using System.Numerics;

namespace SimGround.Infra.Physics
{
    public interface IRelativisticProperties
    {
        double? RelativisticSpeed { get; set; } // dimensionless, calculated as v / c where c is the speed of light
        Vector3? RelativisticAcceleration { get; set; } // in meters per second squared (m/s^2), taking into account relativistic effects
        double? RelativisticMass { get; set; } // in electron volts (eV)
        double? Energy { get; set; } // in electron volts (eV)
    }

}
