import GUI from 'lil-gui'
import { useEffect, useState } from 'react'
import { IWorldParameters } from '../../physics'
import { Dispatch, SetStateAction } from 'react'
import { useDebouncedState } from '@mantine/hooks'

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

const singleGUI = new GUI()
let result: IGUIConfiguration | undefined = undefined
let simplified: Partial<IGuiParams> | undefined = undefined

export const useGUI = () => {

    const gui = singleGUI
    useEffect(() => {
        const [gravitationalAcceleration, setGravitationalAcceleration] = useDebouncedState(defaultConfiguration?.gravitationalAcceleration ?? 9.81, 200)
        const [hasElectricField, setHasElectricField] = useState(defaultConfiguration?.hasElectricField ?? true)
        const [hasGravity, setHasGravity] = useState(defaultConfiguration?.hasGravity ?? true)
        const [timeScale, setTimeScale] = useDebouncedState(1, 500)
        const [autoscaleTime, setAutoscaleTime] = useState(true)
        const [autoscaleTimeTarget, setAutoscaleTimeTarget] = useDebouncedState(defaultConfiguration?.timeScale ?? 1e-1, 200)
        const [scene, setScene] = useState("Many objects")
        const generateSimpleConfiguration = () => {
            simplified = {
                scene
            }
        }
        const worldFolder = gui.addFolder('World')
        const ga = worldFolder
            .add(defaultConfiguration, 'gravitationalAcceleration', 0, (defaultConfiguration?.gravitationalAcceleration ?? 9.81) * 2, 0.1)
            .onChange((value: number) => { setGravitationalAcceleration(value) })

        worldFolder.add(defaultConfiguration, 'hasElectricField')
            .onChange((value: boolean) => { setHasElectricField(value) })
        worldFolder.add(defaultConfiguration, 'hasGravity')
            .onChange((value: boolean) => {
                setHasGravity(value)
                ga.enable(value)
            })

        const scenes = {
            scene: "Many objects",
            sceneName: 'Many objects'
        }
        const sceneFolder = gui.addFolder('Scene')
        sceneFolder
            .add(scenes, 'sceneName', ["Many objects", "Coob", "Conveyor", "Simple collision"]).onChange((value: string) => {
                setScene(value)
                generateSimpleConfiguration()
            })

        const simulationParamsFolder = gui.addFolder('Simulation parameters')
        const simulationParams = {
            timeScale: timeScale,
            autoscaleTime: autoscaleTime,
            autoscaleTimeTarget: autoscaleTimeTarget
        }
        const ts = simulationParamsFolder.add(simulationParams, 'timeScale', 0, 10, 0.1)
        ts.enable(false)

        const tt = simulationParamsFolder.add(simulationParams, 'autoscaleTimeTarget', 0.01, 1, 0.01).onChange((value: number) => { setAutoscaleTimeTarget(value) })
        simulationParamsFolder.add(simulationParams, 'autoscaleTime').onChange((value: boolean) => {
            if (value) {
                setTimeScale(1)
                ts.setValue(1)
            }
            ts.enable(!value)
            tt.enable(value)
        })
        if (!simplified) generateSimpleConfiguration()
        called = true
    }, [gui])
    return simplified
}