import { extend, useFrame } from '@react-three/fiber'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Color, Matrix4, Object3D, Vector3 } from 'three'
import { IWorldParameters, Particle, worldProps } from '../physics'
import { SimulationSpace } from '../infra'
import { GenericParticle } from '../physics/particles/standard model/GenericParticle'
import { animated } from '@react-spring/three'
import { shaderMaterial } from '@react-three/drei'
import { useHotkeys } from '@mantine/hooks'

function range(start: number, end: number, step: number = 1): number[] {
    const result: number[] = []
    for (let i = start; i < end; i += step) {
        result.push(i)
    }
    return result
}

const generateRandomParticles = (particleCount: number, initialCuboidSize: number, maxMass: number, clusters: number) => {
    const particles = []
    const clusterRadius = initialCuboidSize / (2 * clusters)
    const translations = range(0, clusters).map((i) => Math.random() * (initialCuboidSize / clusters))
    for (let i = 0; i < particleCount; i++) {
        const clusterIndex = Math.floor(Math.random() * clusters)
        const clusterCenter = new Vector3(
            clusterRadius + clusterIndex * 2 * clusterRadius,
            initialCuboidSize / 2,
            initialCuboidSize / 2
        )

        const randomTheta = 2 * Math.PI * Math.random()
        const randomPhi = Math.acos(2 * Math.random() - 1)
        const randomRadius = clusterRadius * Math.cbrt(Math.random())

        const position = new Vector3(
            clusterCenter.x + randomRadius * Math.sin(randomPhi) * Math.cos(randomTheta),
            clusterCenter.y + randomRadius * Math.sin(randomPhi) * Math.sin(randomTheta),
            clusterCenter.z + randomRadius * Math.cos(randomPhi)
        )
        position.add(new Vector3(0, translations[clusterIndex], translations[clusterIndex]))

        particles.push(
            new GenericParticle(new Color(0xff0000), {
                position: position,
                speed: new Vector3(),
                acceleration: new Vector3(),
                mass: maxMass + Math.random(),
                chargeEV: -1
            })
        )
    }
    /*
        for (let i = 0; i < 10; i++) {
            particles.push(
                new GenericParticle(new Color(0x0000ff), {
                    position: new Vector3(initialCuboidSize * Math.random(), initialCuboidSize / 2, initialCuboidSize / 2),
                    speed: new Vector3(),
                    acceleration: new Vector3(),
                    mass: 5.972e4,
                    chargeEV: 0
                })
            )
        }
    */

    return particles
}

const MeshEdgesMaterial = shaderMaterial(
    {
        color: new Color('white'),
        size: new Vector3(1, 1, 1),
        thickness: 0.01,
        smoothness: 0.2
    },
    /*glsl*/ `varying vec3 vPosition;
    void main() {
      vPosition = position;
      gl_Position = projectionMatrix * viewMatrix * instanceMatrix * vec4(position, 1.0);
    }`,
    /*glsl*/ `varying vec3 vPosition;
    uniform vec3 size;
    uniform vec3 color;
    uniform float thickness;
    uniform float smoothness;
    void main() {
      vec3 d = abs(vPosition) - (size * 0.5);
      float a = smoothstep(thickness, thickness + smoothness, min(min(length(d.xy), length(d.yz)), length(d.xz)));
      gl_FragColor = vec4(color, 1.0 - a);
    }`
)
extend({ MeshEdgesMaterial })
const o = new Object3D()

export interface IManyParticlesParams {
    autoscaleTime: boolean
    particleCount: number
    initialCuboidSize: number
    particleSize: number
    particleColor: Color
    particleMaxMass: number
    clusters: number
}

export function ManyObjects({
    autoscaleTime = true,
    particleCount = worldProps.numberOfParticles,
    initialCuboidSize = 15,
    clusters = worldProps.clusters,
    particleSize = worldProps.baseParticleSize,
    particleColor = new Color(0xff0000),
    particleMaxMass = 1e5
}: Partial<IManyParticlesParams>) {
    const ref = useRef<any>()
    const [particles, setparticles] = useState<Particle[]>(generateRandomParticles(particleCount, initialCuboidSize, particleMaxMass, clusters))
    const simulationSpace = new SimulationSpace(new Vector3(-initialCuboidSize / 2, -0.5, -initialCuboidSize / 2), new Vector3(initialCuboidSize * 1, initialCuboidSize * 1, initialCuboidSize * 1), particles)

    useHotkeys([['R', () => {
        setparticles(generateRandomParticles(particleCount, initialCuboidSize, particleMaxMass, clusters))
    }]])

    useFrame(({ clock }) => {
        const a = clock.getElapsedTime()
        simulationSpace.update()
        render()
    })

    const render = useCallback(() => {
        for (let i = 0; i < particles.length; i++) {
            const particle = particles[i]
            o.rotation.set(Math.random(), Math.random(), Math.random())
            if (particle.properties.position)
                o.position.set(particle.properties.position.x, particle.properties.position.y, particle.properties.position.z)
            const s = worldProps.calculateParticleSize(particle.properties.mass)
            particle.scale.set(s, s, s)
            o.scale.set(s, s, s)
            o.updateMatrix()
            ref.current.setMatrixAt(i, o.matrix)
        }
        ref.current.instanceMatrix.needsUpdate = true
    }, [particles])
    return (
        <>
            <group >
                <instancedMesh ref={ref} args={[undefined, undefined, particles.length]}>
                    <sphereGeometry />
                    <meshNormalMaterial />
                </instancedMesh>
            </group>
        </>
    )
}