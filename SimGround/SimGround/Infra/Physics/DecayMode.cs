namespace SimGround.Infra.Physics
{
    using System.Collections.Generic;

    public class DecayMode
    {
        public readonly List<IParticle> products;
        public readonly double probability;

        public DecayMode(List<IParticle> products, double probability)
        {
            this.products = products;
            this.probability = probability;
        }
    }

}
