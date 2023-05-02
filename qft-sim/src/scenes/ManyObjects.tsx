import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { LUTPass, LUTCubeLoader } from 'three-stdlib'
import { Point, Points, useTexture } from '@react-three/drei';
import { Color, Object3D, Vector3 } from 'three';
import { Particle } from '../physics';
import { SimulationSpace } from '../infra';
import { GenericParticle } from '../physics/particles/standard model/GenericParticle';
import { ParticleVisualization } from '../components';

function range(start: number, end: number, step: number = 1): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i += step) {
        result.push(i);
    }
    return result;
}

const particleCount = 100
const generateRandomParticles = () => range(0, particleCount).map((i) => new GenericParticle(new Color(0xff0000), {
    position: new Vector3(Math.random() * 10, Math.random() * 10, Math.random() * 10),
    speed: new Vector3(1, 0.1, 0),
    acceleration: new Vector3(),
}))
const orange = new Color('orange')

export function ManyObjects() {
    const ref = useRef<any>()

    const [particles, setparticles] = useState<Particle[]>(generateRandomParticles())
    const simulationSpace = new SimulationSpace(new Vector3(0, 0, 0), new Vector3(10, 10, 10), particles)

    useFrame(({ clock }) => {
        const a = clock.getElapsedTime()
        simulationSpace.update()

        ref.current.needsUpdate = true
    })

    return (
        <>
            {particles.map((particle, i) => {
                return <ParticleVisualization key={i} particle={particle} />
            })}
            <Points
                ref={ref}
                limit={1000} // Optional: max amount of items (for calculating buffer size)
                range={1000} // Optional: draw-range
            >
                <pointsMaterial vertexColors />

            </Points>
        </>
    );
}