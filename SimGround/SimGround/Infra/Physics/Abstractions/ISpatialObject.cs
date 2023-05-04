using System.Numerics;

namespace SimGround.Infra.Physics.Abstractions
{
    public interface ISpatialObject
    {
        public Vector3 Position { get; set; }
        public Vector3 Velocity { get; set; }
        public Vector3 Acceleration { get; set; }
    }
}
