import { isWeakMap } from 'util/types'

export interface IWorldParameters {
    hasGravity: boolean
    gravitationalAcceleration: number
    hasElectricField: boolean
    timeScale: number
    autoscaleTime: boolean
    autoscaleTimeTarget: number,
    autoscaleTimeTargetMax: 0.5,
    wallELoss: 0.0
}

export const worldProps = {
    hasGravity: true,
    gravitationalAcceleration: 9.81,
    hasElectricField: false,
    autoscaleTime: true,
    timeScale: 0.5,
    autoscaleTimeTarget: 1e-2,
    autoscaleTimeTargetMin: 1e-36,
    autoscaleTimeTargetMax: 5,
    wallELoss: 0.0
} 