using System.Numerics;

using SimGround.Infra.Physics.Engines.Classical;

using Utility.CommandLine;

class Program
{
    [Argument('n', "particles", "Number of particles")]
    public static int NumberOfParticles { get; set; } = 100;

    [Argument('f', "frames", "Number of frames to render")]
    public static int NumberOfFrames { get; set; } = 1;

    static async Task Main(string[] args)
    {
        var stopwatch = System.Diagnostics.Stopwatch.StartNew();
        var objects = ClassicalObjectFactory.CreateRandomObjects(NumberOfParticles, new System.Numerics.Vector3(100, 100, 100));
        System.Console.WriteLine($"Created {NumberOfParticles} objects in {stopwatch.Elapsed.TotalMilliseconds}ms");
        stopwatch.Restart();
        var engine = new ClassicalMechanicsEngine(objects.Select(x => x as IClassicalObject).ToList());
        /*
        for (int i = 0; i < NumberOfFrames; i++)
        {
            await engine.TickAsync((float)1e-3, new System.Numerics.Vector2(2, 2));
        }
        System.Console.WriteLine($"Simulated {NumberOfFrames} frames in {stopwatch.Elapsed.TotalMilliseconds}ms");
        */
        if (true)
        {
            Console.WriteLine($"Benchmarking with {NumberOfParticles} particles...");
            var fastest = double.MaxValue;
            var slowest = double.MinValue;
            var random = new Random();

            var runCount = 0;
            while (true)
            {
                stopwatch.Restart();

                var n = (int)Math.Truncate(NumberOfParticles * Math.Pow(2, runCount++));
                objects = ClassicalObjectFactory.CreateRandomObjects(n, new System.Numerics.Vector3(100, 100, 100));
                var randomBlockSize = new Vector2(random.Next((int)Math.Sqrt(n), (int)Math.Sqrt(n)), random.Next(1, 25));
                var randomMagicNumber = random.Next(1, 12);

                await engine.TickAsync((float)1e-3, randomBlockSize, randomMagicNumber);
                var elapsed = stopwatch.Elapsed.TotalMilliseconds;
                if (elapsed < fastest)
                {
                    fastest = elapsed;
                    Console.WriteLine($"New fastest: {fastest}ms with {randomBlockSize.X}x{randomBlockSize.Y} chunk and a magic number of {randomMagicNumber} ({n} particles)");
                }
                if (elapsed > slowest)
                {
                    slowest = elapsed;
                    Console.WriteLine($"New slowest: {slowest}ms with {randomBlockSize.X}x{randomBlockSize.Y} chunk and a magic number of {randomMagicNumber} ({n} particles)");
                }
            }
        }
        else
        {
            Console.WriteLine($"Benchmarking with {NumberOfParticles} particles...");
            var fastest = double.MaxValue;
            var slowest = double.MinValue;
            var random = new Random();
            while (true)
            {
                stopwatch.Restart();
                var randomMagicNumber = random.Next(1, 12);

                await engine.TickAsync((float)1e-3, randomMagicNumber);
                var elapsed = stopwatch.Elapsed.TotalMilliseconds;
                if (elapsed < fastest)
                {
                    fastest = elapsed;
                    Console.WriteLine($"New fastest: {fastest}ms with a magic number of {randomMagicNumber}");
                }
                if (elapsed > slowest)
                {
                    slowest = elapsed;
                    Console.WriteLine($"New slowest: {slowest}ms with a magic number of {randomMagicNumber}");
                }
            }
        }
    }
}
