using System.Numerics;

namespace SimGround.Infra.Physics.Quantum
{
    public interface IQuantumField<TParticle> where TParticle : IParticle
    {
        TParticle CreateParticle(Vector3 position, Vector3 momentum, double time);
        IEnumerable<TParticle> GetParticlesInRegion(Vector3 position, double radius);
        Vector3 ForceOnParticle(Vector3 position, Vector3 velocity);
        double GetVacuumExpectationValue(TParticle particle);
        void ApplyInteraction(IQuantumField<TParticle> otherField);
    }

}
