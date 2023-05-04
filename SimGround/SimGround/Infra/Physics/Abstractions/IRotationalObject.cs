using System.Numerics;

namespace SimGround.Infra.Physics.Abstractions
{
    public interface IRotationalObject
    {
        public Vector3 Rotation { get; set; }
        public Vector3 RotationSpeed { get; set; }
        public Vector3 RotationAcceleration { get; set; }
    }
}
