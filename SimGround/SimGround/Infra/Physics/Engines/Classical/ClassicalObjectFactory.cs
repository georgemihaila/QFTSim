using System.Numerics;

namespace SimGround.Infra.Physics.Engines.Classical
{
    public static class ClassicalObjectFactory
    {
        private static readonly Random random = new Random();

        public static IClassicalObject Create(Vector3 scale, Vector3 boundingBoxSize, Vector3 position, Vector3 velocity, Vector3 acceleration, Vector3 rotation, Vector3 rotationSpeed, Vector3 rotationAcceleration, double mass)
        {
            return new ClassicalObject
            {
                Scale = scale,
                BoundingBoxSize = boundingBoxSize,
                Position = position,
                Velocity = velocity,
                Acceleration = acceleration,
                Rotation = rotation,
                RotationSpeed = rotationSpeed,
                RotationAcceleration = rotationAcceleration,
                Mass = mass
            };
        }

        public static IClassicalObject CreateRandomObject(double minMass, double maxMass, double maxVelocity, double maxAcceleration)
        {
            var scale = new Vector3(random.Next(1, 10), random.Next(1, 10), random.Next(1, 10));
            var boundingBoxSize = new Vector3(random.Next(1, 10), random.Next(1, 10), random.Next(1, 10));
            var position = new Vector3(random.Next(-100, 100), random.Next(-100, 100), random.Next(-100, 100));
            var velocity = new Vector3(random.Next(-1, 1), random.Next(-1, 1), random.Next(-1, 1)) * new Vector3((float)maxVelocity);
            var acceleration = new Vector3(random.Next(-1, 1), random.Next(-1, 1), random.Next(-1, 1)) * new Vector3(value: (float)maxAcceleration);
            var rotation = new Vector3(random.Next(-360, 360), random.Next(-360, 360), random.Next(-360, 360));
            var rotationSpeed = new Vector3(random.Next(-10, 10), random.Next(-10, 10), random.Next(-10, 10));
            var rotationAcceleration = new Vector3(random.Next(-1, 1), random.Next(-1, 1), random.Next(-1, 1));
            var mass = random.NextDouble() * (maxMass - minMass) + minMass;

            return Create(scale, boundingBoxSize, position, velocity, acceleration, rotation, rotationSpeed, rotationAcceleration, mass);
        }

        public static List<ClassicalObject> CreateRandomObjects(int n, Vector3 boundingBoxSize) => CreateRandomObjects(n, boundingBoxSize, new Vector3(1), new Vector3(10), new Vector3(0), new Vector3(100), 1, 10);

        public static List<ClassicalObject> CreateRandomObjects(int n, Vector3 boundingBoxSize, Vector3 minScale, Vector3 maxScale, Vector3 minPosition, Vector3 maxPosition, float minMass, float maxMass)
        {
            List<ClassicalObject> objects = new List<ClassicalObject>();
            Random random = new Random();

            for (int i = 0; i < n; i++)
            {
                Vector3 scale = new Vector3(
                    (float)random.NextDouble() * (maxScale.X - minScale.X) + minScale.X,
                    (float)random.NextDouble() * (maxScale.Y - minScale.Y) + minScale.Y,
                    (float)random.NextDouble() * (maxScale.Z - minScale.Z) + minScale.Z);

                Vector3 position = new Vector3(
                    (float)random.NextDouble() * (maxPosition.X - minPosition.X) + minPosition.X,
                    (float)random.NextDouble() * (maxPosition.Y - minPosition.Y) + minPosition.Y,
                    (float)random.NextDouble() * (maxPosition.Z - minPosition.Z) + minPosition.Z);

                float mass = (float)random.NextDouble() * (maxMass - minMass) + minMass;

                ClassicalObject obj = new()
                {
                    Scale = scale,
                    BoundingBoxSize = boundingBoxSize,
                    Position = position,
                    Mass = mass,
                    Velocity = new Vector3((float)random.NextDouble(), (float)random.NextDouble(), (float)random.NextDouble()),
                    Acceleration = new Vector3((float)random.NextDouble(), (float)random.NextDouble(), (float)random.NextDouble())
                };

                objects.Add(obj);
            }

            return objects;
        }
    }
}
