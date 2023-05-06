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

const maxNumberOfParticles = 10 * 1000

export const worldProps = {
    hasGravity: true,
    gravitationalAcceleration: 9.81,
    hasEMField: false,
    autoscaleTime: true,
    timeScale: 0.5,
    autoscaleTimeTarget: 0.3,
    autoscaleTimeTargetMin: 1e-36,
    autoscaleTimeTargetMax: Math.pow(maxNumberOfParticles, 0.3),
    wallELoss: 0.0,
    collisions: true,
    numberOfParticles: maxNumberOfParticles,
    baseParticleSize: 0.1,
    paused: true,
    calculateParticleSize: (mass?: number) => Math.log10(mass ?? 100) / 10 * worldProps.baseParticleSize
} 