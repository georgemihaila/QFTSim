import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Vector3 } from 'three';
import { Coob } from '../physics';
import { animated } from '@react-spring/three'
import { useTexture } from '@react-three/drei';
import { useHover } from "@mantine/hooks"
import { useDelayedHover } from '@mantine/core/lib/Floating';

export function CoobScene() {
    const [selected, setSelected] = useState(false)
    useEffect(() => {
        console.log(selected)
    }, [selected])
    const ref = useRef<any>();
    const [coob, setCoob] = useState(new Coob(new Vector3(0, 0.5, 0)))
    useFrame(() => {
        coob.tick()
        if (ref.current?.rotation) {
            ref.current.rotation.y = coob.rotation.y;
            ref.current.rotation.x = coob.rotation.x;
            ref.current.rotation.z = coob.rotation.z;
        }
    });
    const texture = useTexture('/terrazo.png')
    return (
        <animated.mesh position={coob.position} ref={ref} onClick={() => setSelected(!selected)}>
            <boxBufferGeometry />
            <meshStandardMaterial wireframe={selected} map={texture} roughness={0} metalness={0.8} />
        </animated.mesh>
    );
}
