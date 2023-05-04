using System.Numerics;

using SimGround.Infra.Physics.Engines.Classical.Interactions;

namespace SimGround.Infra.Physics.Engines.Classical
{
    public class ClassicalMechanicsEngine : IPhysicsEngine
    {
        private List<IClassicalObject> _classicalObjects = new();
        private readonly ClassicalObjectInteractor _interactor = new();
        public ClassicalMechanicsEngine() { }
        public ClassicalMechanicsEngine(List<IClassicalObject> IClassicalObjects)
        {
            _classicalObjects = IClassicalObjects;
        }

        public void AddObject(IClassicalObject IClassicalObject)
        {
            _classicalObjects.Add(IClassicalObject);
        }

        public static List<Block> CreateBlocks(Vector2 blockSize, IEnumerable<IClassicalObject> objects)
        {
            // Determine the maximum and minimum coordinates of the objects
            var minX = objects.Min(obj => obj.Position.X);
            var minY = objects.Min(obj => obj.Position.Y);
            var minZ = objects.Min(obj => obj.Position.Z);
            var maxX = objects.Max(obj => obj.Position.X);
            var maxY = objects.Max(obj => obj.Position.Y);
            var maxZ = objects.Max(obj => obj.Position.Z);

            // Calculate the number of blocks needed in each dimension
            var xBlocks = (int)Math.Ceiling((maxX - minX) / blockSize.X);
            var yBlocks = (int)Math.Ceiling((maxY - minY) / blockSize.Y);
            var zBlocks = (int)Math.Ceiling((maxZ - minZ) / blockSize.Y);

            // Create the blocks
            var blocks = new List<Block>();
            for (var x = 0; x < xBlocks; x++)
            {
                for (var y = 0; y < yBlocks; y++)
                {
                    for (var z = 0; z < zBlocks; z++)
                    {
                        var blockMinX = minX + x * blockSize.X;
                        var blockMinY = minY + y * blockSize.Y;
                        var blockMinZ = minZ + z * blockSize.Y;
                        var blockMaxX = Math.Min(maxX, blockMinX + blockSize.X);
                        var blockMaxY = Math.Min(maxY, blockMinY + blockSize.Y);
                        var blockMaxZ = Math.Min(maxZ, blockMinZ + blockSize.Y);
                        var blockBounds = new BoundingBox(new Vector3((float)blockMinX, (float)blockMinY, (float)blockMinZ), new Vector3((float)blockMaxX, (float)blockMaxY, (float)blockMaxZ));
                        var blockObjects = objects.Where(obj => blockBounds.Contains(obj.Position)).ToList();
                        blocks.Add(new Block(blockBounds, blockObjects));
                    }
                }
            }

            return blocks;
        }


        public async Task TickAsync(float dt, Vector2 blockSize, int magicThreadNumber = 2)
        {
            var blocks = CreateBlocks(blockSize, _classicalObjects);
            await Task.WhenAll(blocks
                    .Chunk(Environment.ProcessorCount / magicThreadNumber)
                    .Select(j => Task.Run(async () =>
                    {
                        await Task.WhenAll(j.Select(block => Task.Run(async () =>
                        {
                            for (int x = 0; x < block.Objects.Count(); x++)
                            {
                                var current = block.Objects.ElementAt(x);
                                await Task.WhenAll(block.Objects
                                                                       .TakeLast(block.Objects.Count() - x)
                                                                                                          .Chunk(Environment.ProcessorCount / magicThreadNumber)
                                                                                                                                             .Select(j => Task.Run(async () =>
                                                                                                                                             {
                                                                                                                                                 for (int i = 0; i < j.Length; i++)
                                                                                                                                                 {
                                                                                                                                                     (current, j[i]) = await _interactor.InteractAsync(current, j[i]);
                                                                                                                                                 }
                                                                                                                                             })));
                            }
                        })));
                    })));
        }

        public async Task TickAsync(float dt, int magicThreadNumber = 2)
        {
            for (int x = 0; x < _classicalObjects.Count; x++)
            {
                var current = _classicalObjects[x];

                await Task.WhenAll(_classicalObjects
                    .TakeLast(_classicalObjects.Count - x)
                    .Chunk(Environment.ProcessorCount / magicThreadNumber)
                    .Select(j => Task.Run(async () =>
                    {
                        for (int i = 0; i < j.Length; i++)
                        {
                            (current, j[i]) = await _interactor.InteractAsync(current, j[i]);
                        }
                    })));
            }
        }
    }
}
