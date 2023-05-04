using SimGround.Infra.Physics.Engines.Classical;

namespace SimGround.Infra
{
    public sealed class Block
    {
        public Block(BoundingBox boundingBox, IEnumerable<IClassicalObject> objects)
        {
            BoundingBox = boundingBox;
            Objects = objects;
        }

        public BoundingBox BoundingBox { get; set; }
        public IEnumerable<IClassicalObject> Objects { get; set; }

    }
}
