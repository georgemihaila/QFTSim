import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { Object3D, Vector3 } from 'three'
import { Coob } from '../physics'
import { animated } from '@react-spring/three'
import { useTexture } from '@react-three/drei'
import { useHover } from "@mantine/hooks"
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber'


export function Conveyor() {
    const [selected, setSelected] = useState(false)
    useEffect(() => {
        console.log(selected)
    }, [selected])
    const ref = useRef<any>()
    const obj = useLoader(OBJLoader, '/conveyor.obj')
    obj.position.set(0, 0, 0)
    const texture = useTexture('/terrazo.png')
    return (
        <primitive object={obj} />
    )
}
