namespace SimGround.Infra.Physics.Engines.Classical.Interactions
{
    public sealed class ClassicalObjectInteractor : IInteraction<IClassicalObject>
    {
        private readonly GravitationalInteractor _gravitationalInteractor = new();
        public async Task<(IClassicalObject, IClassicalObject)> InteractAsync(IClassicalObject t, IClassicalObject v)
        {
            (t, v) = await _gravitationalInteractor.InteractAsync(t, v);
            return (t, v);
        }
    }
}
