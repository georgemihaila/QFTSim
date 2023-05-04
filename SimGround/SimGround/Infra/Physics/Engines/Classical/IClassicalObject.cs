using System.Numerics;

using SimGround.Infra.Physics.Abstractions;

namespace SimGround.Infra.Physics.Engines.Classical
{
    public interface IClassicalObject : IClassicalSpatialProperties
    {
        Vector3 Scale { get; set; }
        Vector3 BoundingBoxSize { get; set; }
    }
}
