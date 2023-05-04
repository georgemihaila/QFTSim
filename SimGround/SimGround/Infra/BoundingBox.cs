using System.Numerics;

namespace SimGround.Infra
{
    public sealed class BoundingBox
    {
        public BoundingBox(Vector3 start, Vector3 end)
        {
            Start = start;
            End = end;
        }
        public bool Contains(Vector3 point)
        {
            bool xInRange = point.X >= Start.X && point.X <= End.X;
            bool yInRange = point.Y >= Start.Y && point.Y <= End.Y;
            bool zInRange = point.Z >= Start.Z && point.Z <= End.Z;
            return xInRange && yInRange && zInRange;
        }

        public Vector3 Start { get; set; }
        public Vector3 End { get; set; }
    }
}
