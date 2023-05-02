import { Select, Text } from "@mantine/core"
import { useState } from "react"
import { PhysicsEngine } from "../physics/engine/PhysicsEngine"

export interface IPhysicsEngineSelectorProps {
    children: React.ReactNode
    onEngineChanged: (engine: string) => void
}

export function PhysicsEngineSelector(props: Partial<IPhysicsEngineSelectorProps>) {
    return <>
        <Select
            label={<Text>Physics Engine</Text>}
            defaultValue={'newtonian'}
            onChange={(event) => {
                if (props?.onEngineChanged && event)
                    props.onEngineChanged(event)

            }}
            data={[
                { value: 'newtonian', label: 'Newtonian' },
                { value: 'relativistic', label: 'Relativistic' },
            ]}
        />
        {props.children}
    </>
}