import { useState, useEffect } from "react"
import { PhysicsEngineSelector } from "./PhysicsEngineSelector"
import { SceneSelector } from "./SceneSelector"
import { Container, Group } from "@mantine/core"
import { CoobScene } from "../scenes"
import { ManyObjects } from "../scenes/ManyObjects"
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
                break;
            case 'many':
                setScene(<ManyObjects />)
                break;
            default:
                setScene(<></>)
                break;
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