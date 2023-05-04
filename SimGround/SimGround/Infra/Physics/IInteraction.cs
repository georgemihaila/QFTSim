namespace SimGround.Infra.Physics
{
    public interface IInteraction { }

    public interface IInteraction<T> : IInteraction, IInteraction<T, T>
    {

    }

    public interface IInteraction<T, V>
    {
        Task<(T, V)> InteractAsync(T t, V v);
    }
}
