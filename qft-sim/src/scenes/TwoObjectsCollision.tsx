import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { LUTPass, LUTCubeLoader } from 'three-stdlib'
import { Point, Points, useTexture } from '@react-three/drei'
import { Color, Object3D, Vector3 } from 'three'
import { Particle } from '../physics'
import { SimulationSpace } from '../infra'
import { GenericParticle } from '../physics/particles/standard model/GenericParticle'
import { ParticleVisualization } from '../components'
import { animated } from '@react-spring/three'

function range(start: number, end: number, step: number = 1): number[] {
    const result: number[] = []
    for (let i = start; i < end; i += step) {
        result.push(i)
    }
    return result
}

const particleCount = 2
const initialCuboidSize = 0.1

const generateRandomParticles = () => {
    const position = new Vector3(Math.random() * initialCuboidSize, Math.random() * initialCuboidSize, Math.random() * initialCuboidSize)
    return [
        new GenericParticle(new Color(0xff0000), {
            position: position.clone().add(new Vector3(-0.05, 0, 0)),
            speed: new Vector3(0, 0, 0),
            acceleration: new Vector3(),
            mass: 9.1e-31,//Math.random() * 1e3,
            chargeEV: -1
        }),
        new GenericParticle(new Color(0xff0000), {
            position: position.clone().add(new Vector3(0.05, 0, 0)),
            speed: new Vector3(0, 0, 0),
            acceleration: new Vector3(),
            mass: Math.random() * 1e3,
            chargeEV: 1
        })
    ]
}

const red = new Color('red')

export function TwoObjectsCollision() {
    const ref = useRef<any>()

    const [particles, setparticles] = useState<Particle[]>(generateRandomParticles())
    const simulationSpace = new SimulationSpace(new Vector3(0, 0, 0), new Vector3(initialCuboidSize * 3, initialCuboidSize * 3, initialCuboidSize * 3), particles,)

    useFrame(({ clock }) => {
        const a = clock.getElapsedTime()
        simulationSpace.update()
    })

    const particleSize = initialCuboidSize / 100

    return (
        <>
            {particles.map((particle, i) => {
                particle.ref = useRef<any>()
                return <animated.mesh key={i} ref={particle.ref} scale={new Vector3(particleSize, particleSize, particleSize)} position={particle.properties.position} >
                    <sphereGeometry />
                    <meshNormalMaterial />
                </animated.mesh>
            })}
        </>
    )
}