using System.Numerics;

namespace SimGround.Infra.Physics.Engines.Classical.Interactions
{
    public sealed class GravitationalInteractor : IInteraction<IClassicalObject>
    {
        public Task<(IClassicalObject, IClassicalObject)> InteractAsync(IClassicalObject t, IClassicalObject v)
        {
            var res = t.Position - v.Position;
            var distance = res.Length();
            if (distance > float.Epsilon)
            {
                var force = PhysicalConstants.GRAVITATIONAL_CONSTANT * (t.Mass * v.Mass) / (distance * distance);
                var forceVector = Vector3.Normalize(res) * (float)force;
                t.Acceleration += forceVector / (float)t.Mass;
                v.Acceleration -= forceVector / (float)v.Mass;
            }
            return Task.FromResult((t, v));
        }
    }
}
