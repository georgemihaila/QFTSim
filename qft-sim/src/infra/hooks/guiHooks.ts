import GUI from 'lil-gui'
import { useEffect, useState } from 'react'
import { IWorldParameters } from '../../physics'
import { Dispatch, SetStateAction } from 'react'
import { useDebouncedState } from '@mantine/hooks'
import { worldProps } from '../../physics/World'

const defaultConfiguration = {
    gravitationalAcceleration: 9.81,
    hasElectricField: true,
    hasGravity: true,
} as Partial<IWorldParameters>

let called = false

export type Hook<S> = readonly [value: S, setter: Dispatch<SetStateAction<S>>]
export type FunctionHook<S> = readonly [value: S, setter: (value: S) => void]

export interface IGUIConfiguration {
    gravitationalAcceleration: FunctionHook<number>
    hasElectricField: Hook<Boolean>
    hasGravity: Hook<boolean>
    timeScale: FunctionHook<number>
    autoscaleTime: Hook<boolean>
    autoscaleTimeTarget: FunctionHook<number>
    scene: Hook<string>
}

export interface IGuiParams {
    gravitationalAcceleration: number
    hasElectricField: boolean
    hasGravity: boolean
    timeScale: number
    autoscaleTime: boolean
    autoscaleTimeTarget: number
    scene: string
}

export type Event<T> = (value: T) => void

export interface GUIConfigurationChangedEvents {
    sceneChanged: Event<string>
}

export let gui = new GUI()

export const useGUI = (props: Partial<GUIConfigurationChangedEvents>) => {
    //useEffect(() => {
    if (!called) {
        const worldFolder = gui.addFolder('World')
        const ga = worldFolder
            .add(defaultConfiguration, 'gravitationalAcceleration', 0, (defaultConfiguration?.gravitationalAcceleration ?? 9.81) * 2, 0.1)
            .onChange((value: number) => { worldProps.gravitationalAcceleration = value })
        ga.setValue(worldProps.gravitationalAcceleration)

        const ef = worldFolder.add(defaultConfiguration, 'hasElectricField')
            .onChange((value: boolean) => { worldProps.hasElectricField = value })
        ef.setValue(worldProps.hasElectricField)
        worldFolder.add(defaultConfiguration, 'hasGravity')
            .onChange((value: boolean) => {
                worldProps.hasGravity = value
                ga.enable(value)
            })
        const scenes = {
            scene: "many",
            sceneName: 'Many objects'
        }
        const sceneFolder = gui.addFolder('Scene')
        sceneFolder
            .add(scenes, 'sceneName', ["Fields", "Many objects", "Coob", "Conveyor", "Simple collision"]).onChange((value: string) => {
                if (props.sceneChanged) props.sceneChanged(value)
            })

        const simulationParamsFolder = gui.addFolder('Simulation parameters')
        const simulationParams = {
            timeScale: 1e-3,
            autoscaleTime: true,
            autoscaleTimeTarget: 1e-2,
            wallELoss: 0.2
        }
        const ts = simulationParamsFolder.add(simulationParams, 'timeScale', 0.00001, 0.01, 0.001)
        ts.enable(!worldProps.autoscaleTime)
        ts.onChange((value: number) => { worldProps.timeScale = value })

        const tt = simulationParamsFolder.add(simulationParams, 'autoscaleTimeTarget', worldProps.autoscaleTimeTargetMin, worldProps.autoscaleTimeTargetMax, 0.01,)
        tt.onChange((value: number) => { worldProps.autoscaleTimeTarget = value })
        const sp = simulationParamsFolder.add(simulationParams, 'autoscaleTime')
        sp.onChange((value: boolean) => {
            if (value) {
                ts.setValue(1)
            }
            ts.enable(!value)
            tt.enable(value)
            worldProps.autoscaleTime = value
        })
        const wallLoss = simulationParamsFolder.add(simulationParams, 'wallELoss', 0, 1, 0.1,).onChange((value: number) => { worldProps.wallELoss = value })
        wallLoss.setValue(worldProps.wallELoss)
        called = true
    }
}