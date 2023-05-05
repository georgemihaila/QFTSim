'use strict'
import { GPU } from 'gpu.js'
import { Vector3 } from 'three'
import { Particle, PhysicalConstants, vector3ToArray, worldProps } from '..'

export class GPUWrapper {
    public static gpu: GPU = new GPU({ mode: 'gpu' })
    private static newtonianGravityKernel?: any
    constructor(
    ) {
    }

    public static applyNewtonianGravity =
        (particles: Particle[]) => {
            const positions = particles.map(x => vector3ToArray(x.properties.position))
            const masses = particles.map(x => x.properties.mass ?? 0)
            const accelerations = particles.map(x => vector3ToArray(x.properties.acceleration))
            GPUWrapper.newtonianGravityKernel ??= GPUWrapper.gpu.createKernel(function (
                positions: number[][],
                accelerations: number[][],
                masses: number[],
                n: number,
                gravitationalAcceleration: number
            ) {

                const i = this.thread.x

                let ax = accelerations[i][0]
                let ay = accelerations[i][1]
                let az = accelerations[i][2]
                for (let j = 0; j < n; j++) {
                    if (i === j) {
                        continue
                    }
                    const distance = Math.sqrt(
                        (positions[i][0] - positions[j][0]) ** 2 +
                        (positions[i][1] - positions[j][1]) ** 2 +
                        (positions[i][2] - positions[j][2]) ** 2
                    )
                    const deltaAcceleration = (gravitationalAcceleration * masses[j]) / (distance ** 2)
                    // Update acceleration through normalization
                    ax += deltaAcceleration * (positions[j][0] - positions[i][0]) / distance
                    ay += deltaAcceleration * (positions[j][1] - positions[i][1]) / distance
                    az += deltaAcceleration * (positions[j][2] - positions[i][2]) / distance
                }
                return [ax, ay, az]
            }).setOutput([positions.length])
            return GPUWrapper.newtonianGravityKernel(positions, accelerations, masses, particles.length, worldProps.gravitationalAcceleration)
        }

}