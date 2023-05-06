import { isWeakMap } from 'util/types'

export interface IWorldParameters {
    hasGravity: boolean
    gravitationalAcceleration: number
    hasEMField: boolean
    timeScale: number
    autoscaleTime: boolean
    autoscaleTimeTarget: number,
    autoscaleTimeTargetMax: 0.5,
    wallELoss: 0.0
}

export const maxNumberOfParticles = 50000

export const worldProps = {
    hasGravity: true,
    gravitationalAcceleration: 9.81,
    hasEMField: true,
    autoscaleTime: true,
    timeScale: 15,
    autoscaleTimeTarget: 0.3,
    autoscaleTimeTargetMin: 1e-36,
    autoscaleTimeTargetMax: Math.pow(maxNumberOfParticles, 0.6),
    wallELoss: 0.0,
    collisions: true,
    numberOfParticles: maxNumberOfParticles,
    baseParticleSize: 0.1,
    paused: true,
    calculateParticleSize: (mass?: number) => Math.log10(mass ?? 100) / 10 * worldProps.baseParticleSize
} 