using System.Numerics;

namespace SimGround.Infra.Physics.Engines.Classical
{
    public class ClassicalObject : IClassicalObject
    {
        public Vector3 Scale { get; set; }
        public Vector3 BoundingBoxSize { get; set; }
        public Vector3 Position { get; set; }
        public Vector3 Velocity { get; set; }
        public Vector3 Acceleration { get; set; }
        public Vector3 Rotation { get; set; }
        public Vector3 RotationSpeed { get; set; }
        public Vector3 RotationAcceleration { get; set; }
        public double Mass { get; set; }
    }
}
