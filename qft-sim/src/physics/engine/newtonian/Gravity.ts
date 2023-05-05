import { Vector3 } from 'three'
import { worldProps } from '../../World'
import { Particle } from '../../particles'
import { GPU } from 'gpu.js'
import { GPUWrapper } from '..'

export const usePlanetaryGravity = (particles: Particle[]) => {
    for (const particle of particles) {
        if (!particle.properties.acceleration) {
            particle.properties.acceleration = new Vector3()
        }
        particle.properties.acceleration.y = -worldProps.gravitationalAcceleration
    }
}

export const useNewtonianGravity = (particles: Particle[]) => {
    const G = 6.6743e-11 // gravitational constant

    for (let i = 0; i < particles.length; i++) {
        const particle_i = particles[i]

        if (!particle_i.properties.position || !particle_i.properties.mass || particle_i.properties?.mass === 0) {
            continue
        }

        for (let j = i + 1; j < particles.length; j++) {
            const particle_j = particles[j]

            if (!particle_j.properties.position || !particle_j.properties.mass || particle_j.properties?.mass === 0) {
                continue
            }

            const distance = particle_j.properties.position.clone().sub(particle_i.properties.position) // distance vector between the two particles
            const r = Math.max(distance.length(), 0.001) // distance between the two particles
            const force = distance.normalize().multiplyScalar((G * particle_i.properties.mass * particle_j.properties.mass) / (r * r)) // gravitational force vector between the two particles

            particle_i.properties.acceleration?.add(force.clone().multiplyScalar(1 / particle_i.properties.mass)) // add acceleration to particle i
            particle_j.properties.acceleration?.add(force.clone().multiplyScalar(-1 / particle_j.properties.mass)) // add acceleration to particle j
        }
    }
}
let calledOnce = false

export const useNewtonianGravity_GPU = (particles: Particle[], gpu: GPU) => {
    /*
    if (calledOnce)
        return
    calledOnce = true*/



    const res: number[][] = GPUWrapper.applyNewtonianGravity(particles)
    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i]
        if (!particle.properties.acceleration) {
            particle.properties.acceleration = new Vector3()
        }
        if (!res[i] || res[i].length !== 3 || isNaN(res[i][0]) || isNaN(res[i][1]) || isNaN(res[i][2])) {
            continue
        }
        particle.properties.acceleration.set(res[i][0], res[i][1], res[i][2])
    }
    /*
    for (let i = 0; i < positions.length; i++) {
        particles[i].properties.position?.set(positions[i][0], positions[i][1], positions.[i][2])
    }*/
}



/*

*/