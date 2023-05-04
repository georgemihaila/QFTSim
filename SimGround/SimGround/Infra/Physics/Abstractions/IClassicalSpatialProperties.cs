namespace SimGround.Infra.Physics.Abstractions
{
    public interface IClassicalSpatialProperties : ISpatialObject, IRotationalObject
    {
        public double Mass { get; set; }
    }
}
