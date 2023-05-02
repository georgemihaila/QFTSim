import { Select, Text } from "@mantine/core"

export interface ISceneSelectorProps {
    children: React.ReactNode
    onSceneChanged: (scene: string) => void
}

export function SceneSelector(props: Partial<ISceneSelectorProps>) {
    return <>
        <Select
            label={<Text>Scene</Text>}
            defaultValue={'cube'}
            onChange={(event) => {
                if (props?.onSceneChanged && event)
                    props.onSceneChanged(event)

            }}
            data={[
                { value: 'cube', label: 'Coob' },
            ]}
        />
        {props.children}
    </>
}