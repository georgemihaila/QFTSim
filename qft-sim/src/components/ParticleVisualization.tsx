import { useEffect, useRef } from "react"
import { Coob, Particle } from "../physics"
import { animated } from "@react-spring/three"
import { Object3DNode, extend, useFrame } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import { Object3D } from "three"

interface ParticleVisualizationProps {
    particle: Particle
}

export function ParticleVisualization(props: ParticleVisualizationProps) {
    const ref = useRef<any>()
    useEffect(() => {
        ref.current.position.x = props.particle.properties.position?.x
        ref.current.position.y = props.particle.properties.position?.y
    }, [props.particle.properties.position, ref])
    useFrame(() => {
        if (ref.current?.rotation && props.particle.properties) {
            ref.current.rotation.y = props.particle.properties.rotation?.y
            ref.current.rotation.x = props.particle.properties.rotation?.x
            ref.current.rotation.z = props.particle.properties.rotation?.z
        }
    })
    const texture = useTexture('/terrazo.png')
    return <animated.mesh position={props.particle.properties.position} ref={ref}>
        <sphereGeometry />
        <meshPhysicalMaterial map={texture} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.8} />
    </animated.mesh>

}


extend({ ParticleVisualization })

declare module '@react-three/fiber' {
    interface ThreeElements {
        customElement: Object3DNode<typeof ParticleVisualization, typeof ParticleVisualization>
    }
}
