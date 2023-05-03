import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Vector3 } from 'three';
import { Coob } from '../physics';
import { animated } from '@react-spring/three'
import { useTexture } from '@react-three/drei';

export function CoobScene() {
    const meshRef = useRef<THREE.Mesh>(null);
    const coob = new Coob(new Vector3(0, 0.5, 0));
    coob.ref = meshRef.current

    // Update the mesh rotation based on the spring value
    useFrame(() => {
        coob.tick()
        if (meshRef.current) {
            meshRef.current.rotation.y = coob.rotation.y;
            meshRef.current.rotation.x = coob.rotation.x;
            meshRef.current.rotation.z = coob.rotation.z;
        }
    });
    const texture = useTexture('/terrazo.png')
    return (
        <animated.mesh position={coob.position} ref={meshRef}>
            <boxBufferGeometry />
            <meshStandardMaterial map={texture} roughness={0} metalness={0.8} />
        </animated.mesh>
    );
}
