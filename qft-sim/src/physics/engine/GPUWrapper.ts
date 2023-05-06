'use strict'
import { GPU } from 'gpu.js'
import { Vector3 } from 'three'
import { IParticleCollectionDescriptor, Particle, PhysicalConstants, vector3ToArray, worldProps } from '..'

export class GPUWrapper {
    public static gpu: GPU = new GPU({ mode: 'gpu' })
    private static newtonianGravityKernel?: any
    private static emFieldKernel?: any
    private static collisionKernel?: any

    constructor(
    ) {
    }

    public static applyNewtonianGravity =
        ({
            positions,
            accelerations,
            masses
        }: IParticleCollectionDescriptor) => {
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

            return GPUWrapper.newtonianGravityKernel(positions, accelerations, masses, positions.length, worldProps.gravitationalAcceleration)
        }

    public static applyEMField =
        ({
            positions,
            accelerations,
            masses,
            velocities
        }: IParticleCollectionDescriptor & {
            velocities: number[][]
        }) => {
            GPUWrapper.emFieldKernel ??= GPUWrapper.gpu.createKernel(function (
                positions: number[],
                accelerations: number[],
                velocities: number[],
                masses: number[],
                n: number,
                coulombConstant: number,
                magneticConstant: number
            ) {
                const i = this.thread.x

                let ax = accelerations[i * 3]
                let ay = accelerations[i * 3 + 1]
                let az = accelerations[i * 3 + 2]
                for (let j = 0; j < n; j++) {
                    if (i === j) {
                        continue
                    }

                    const distance = Math.sqrt(
                        (positions[i * 3] - positions[j * 3]) ** 2 +
                        (positions[i * 3 + 1] - positions[j * 3 + 1]) ** 2 +
                        (positions[i * 3 + 2] - positions[j * 3 + 2]) ** 2
                    )
                    const deltaAcceleration = (coulombConstant * masses[j]) / (distance ** 2)
                    // Update acceleration through normalization
                    const dx = positions[j * 3] - positions[i * 3]
                    const dy = positions[j * 3 + 1] - positions[i * 3 + 1]
                    const dz = positions[j * 3 + 2] - positions[i * 3 + 2]

                    // Electrostatic force
                    ax -= deltaAcceleration * dx / distance
                    ay -= deltaAcceleration * dy / distance
                    az -= deltaAcceleration * dz / distance
                    // Magnetic force
                    const crossProduct = [
                        velocities[i * 3 + 1] * dz - velocities[i * 3 + 2] * dy,
                        velocities[i * 3 + 2] * dx - velocities[i * 3] * dz,
                        velocities[i * 3] * dy - velocities[i * 3 + 1] * dx
                    ]
                    const magneticForce = (magneticConstant * masses[j]) / (distance ** 3)
                    ax += magneticForce * crossProduct[0]
                    ay += magneticForce * crossProduct[1]
                    az += magneticForce * crossProduct[2]

                }
                return [ax, ay, az]
            }).setOutput([masses.length])

            return GPUWrapper.emFieldKernel(
                positions.flat(),
                accelerations.flat(),
                velocities.flat(),
                masses,
                masses.length,
                PhysicalConstants.COULOMB_CONSTANT,
                PhysicalConstants.VACUUM_PERMEABILITY * (PhysicalConstants.COULOMB_CONSTANT ** 2))

        }

    public static doCollisions =
        ({
            positions,
            accelerations,
            masses,
            velocities
        }: IParticleCollectionDescriptor & {
            velocities: number[][]
        }) => {
            GPUWrapper.collisionKernel ??= GPUWrapper.gpu.createKernel(function (
                positions: number[][],
                accelerations: number[][],
                velocities: number[][],
                masses: number[],
                n: number,
                loss: number
            ) {

                const i = this.thread.x

                let ax = accelerations[i][0]
                let ay = accelerations[i][1]
                let az = accelerations[i][2]

                for (let j = 0; j < n; j++) {
                    if (i === j) {
                        continue
                    }
                    //TODO: We assume collisions don't happen too often; this means we can save operations by not calculating the distance
                    const dx = positions[j][0] - positions[i][0]
                    const dy = positions[j][1] - positions[i][1]
                    const dz = positions[j][2] - positions[i][2]

                    // Update acceleration through normalization
                    const distance = Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2)
                    const r1 = Math.log10(masses[i])
                    const r2 = Math.log10(masses[j])
                    if (distance < r1 + r2) {

                        const vix = velocities[i][0]
                        const viy = velocities[i][1]
                        const viz = velocities[i][2]

                        const vjx = velocities[j][0]
                        const vjy = velocities[j][1]
                        const vjz = velocities[j][2]

                        const vixf = (masses[i] * vix + masses[j] * vjx) / (masses[i] + masses[j])
                        const viyf = (masses[i] * viy + masses[j] * vjy) / (masses[i] + masses[j])
                        const vizf = (masses[i] * viz + masses[j] * vjz) / (masses[i] + masses[j])

                        const vjxf = (masses[i] * vix + masses[j] * vjx) / (masses[i] + masses[j])
                        const vjyf = (masses[i] * viy + masses[j] * vjy) / (masses[i] + masses[j])
                        const vjzf = (masses[i] * viz + masses[j] * vjz) / (masses[i] + masses[j])

                        velocities[i][0] = vixf
                        velocities[i][1] = viyf
                        velocities[i][2] = vizf

                        velocities[j][0] = vjxf
                        velocities[j][1] = vjyf
                        velocities[j][2] = vjzf

                        //Move the particles apart
                        positions[i][0] += dx * (r1 + r2 - distance) / distance
                        positions[i][1] += dy * (r1 + r2 - distance) / distance
                        positions[i][2] += dz * (r1 + r2 - distance) / distance

                        positions[j][0] -= dx * (r1 + r2 - distance) / distance
                        positions[j][1] -= dy * (r1 + r2 - distance) / distance
                        positions[j][2] -= dz * (r1 + r2 - distance) / distance
                    }

                }
                return [ax, ay, az]
            }).setOutput([masses.length])
            return GPUWrapper.collisionKernel(positions, accelerations, velocities, masses, masses.length, 0.1)
        }



    public static getDistances(positions: number[][]) {
        const distances: number[][] = []
        for (let i = 0; i < positions.length; i++) {
            distances.push([])
            for (let j = 0; j < positions.length; j++) {
                distances[i][j] = Math.sqrt((positions[j][0] - positions[i][0]) ** 2 + (positions[j][1] - positions[i][1]) ** 2 + (positions[j][2] - positions[i][2]) ** 2)
            }
        }
        return distances
    }
}