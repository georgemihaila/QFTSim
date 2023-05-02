import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { LUTPass, LUTCubeLoader } from 'three-stdlib'
import { useTexture } from '@react-three/drei';
import { Vector3 } from 'three';
import { Coob } from '../physics';

export function CoobScene() {
    const ref = useRef<any>()
    const coob = new Coob(new Vector3(0, 0.5, 0));
    coob.ref = ref.current
    useFrame(({ clock }) => {
        coob.tick()
    })

    const texture = useTexture('/terrazo.png')

    return (
        <>
            <mesh ref={ref}>
                <boxGeometry />
                <meshPhysicalMaterial map={texture} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.8} />
            </mesh>
        </>
    );
}
