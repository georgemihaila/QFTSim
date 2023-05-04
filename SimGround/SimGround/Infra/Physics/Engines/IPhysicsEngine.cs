namespace SimGround.Infra.Physics.Engines
{
    public interface IPhysicsEngine
    {
        Task TickAsync(float dt, int magicThreadNumber);
    }
}
