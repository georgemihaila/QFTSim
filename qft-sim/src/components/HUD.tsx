import { useState, useEffect } from "react"
import { PhysicsEngineSelector } from "./PhysicsEngineSelector"
import { SceneSelector } from "./SceneSelector"
import { Container, Group } from "@mantine/core"
import { Conveyor, CoobScene } from "../scenes"
import { ManyObjects } from "../scenes/ManyObjects"
import { TwoObjectsCollision } from "../scenes"
export interface IHUDProps {
    children: React.ReactNode
    sceneChanged: (scene: React.ReactNode) => void
}
export function HUD(props: Partial<IHUDProps>) {
    const [scene, setScene] = useState<React.ReactNode>(<></>)
    useEffect(() => {
        if (props.sceneChanged && scene)
            props.sceneChanged(scene)
    }, [scene])

    const onSceneChanged = (scene: string) => {
        switch (scene) {
            case 'cube':
                setScene(<CoobScene />)
                break
            case 'many':
                setScene(<ManyObjects />)
                break
            case 'simple-collision':
                setScene(<TwoObjectsCollision />)
                break
            case 'conveyor':
                setScene(<Conveyor />)
                break
            default:
                setScene(<CoobScene />)
                break
        }
    }

    return <>
        <Container >
            <Group>
                <SceneSelector onSceneChanged={onSceneChanged} />
                <PhysicsEngineSelector />
                {props.children}
            </Group>
        </Container>
    </>
}