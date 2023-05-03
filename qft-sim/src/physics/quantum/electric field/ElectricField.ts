import { Particle, PhysicalConstants } from '../..'

export const useElectricFieldRepulsion = (particles: Particle[]) => {
    for (let i = 0; i < particles.length; i++) {
        const particle_i = particles[i]

        if (!particle_i.properties.position || !particle_i.properties.mass || particle_i.properties?.mass === 0 || !particle_i.properties.chargeEV || particle_i.properties?.chargeEV === 0) {
            continue
        }

        for (let j = i + 1; j < particles.length; j++) {
            const particle_j = particles[j]

            if (!particle_j.properties.position || !particle_j.properties.chargeEV || !particle_j.properties?.mass || particle_j.properties?.chargeEV === 0) {
                continue
            }

            const distance = particle_j.properties.position.clone().sub(particle_i.properties.position) // distance vector between the two particles
            const r = distance.length() // distance between the two particles
            const force = distance.normalize().multiplyScalar((PhysicalConstants.COULOMB_CONSTANT * particle_i.properties.chargeEV * particle_j.properties.chargeEV * PhysicalConstants.ELECTRON_VOLT * PhysicalConstants.ELECTRON_VOLT) / (r * r)) // electrostatic repulsion force vector between the two particles

            particle_i.properties.acceleration?.add(force.clone().multiplyScalar(1 / particle_i.properties.mass)) // add acceleration to particle i
            particle_j.properties.acceleration?.add(force.clone().multiplyScalar(-1 / particle_j.properties.mass)) // add acceleration to particle j
        }
    }
}