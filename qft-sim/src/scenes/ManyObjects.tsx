import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { Color, Vector3 } from 'three'
import { Particle } from '../physics'
import { SimulationSpace } from '../infra'
import { GenericParticle } from '../physics/particles/standard model/GenericParticle'
import { animated } from '@react-spring/three'

function range(start: number, end: number, step: number = 1): number[] {
    const result: number[] = []
    for (let i = start; i < end; i += step) {
        result.push(i)
    }
    return result
}

const particleCount = 500
const initialCuboidSize = .1
const particleSize = initialCuboidSize / 75

const generateRandomParticles = () => range(0, particleCount).map((i) => new GenericParticle(new Color(0xff0000), {
    position: new Vector3(Math.random() * initialCuboidSize / 3, Math.random() * initialCuboidSize / 5, Math.random() * initialCuboidSize / 3),
    speed: new Vector3(),
    acceleration: new Vector3(),
    mass: 9.6e-31,//Math.random() * 1e3,
    chargeEV: -1
}))

const orange = new Color('orange')

export function ManyObjects() {
    const ref = useRef<any>()
    const ref2 = useRef<any>()
    const [particles, setparticles] = useState<Particle[]>(generateRandomParticles())
    const simulationSpace = new SimulationSpace(new Vector3(0, 0, 0), new Vector3(initialCuboidSize * 1, initialCuboidSize * 1, initialCuboidSize * 1), particles)

    useFrame(({ clock }) => {
        const a = clock.getElapsedTime()
        simulationSpace.update()
    })
    particles.forEach((particle, i) => {
        particle.ref = ref
    })
    return (
        <>

            <instancedMesh ref={ref} args={[undefined, undefined, particleCount]}>
                <animated.mesh ref={ref2} >
                    <sphereGeometry />
                    <meshNormalMaterial />
                </animated.mesh>
            </instancedMesh>
        </>
    )
}