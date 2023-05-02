import { useEffect, useRef } from "react"
import { Coob, Particle } from "../physics"

interface ParticleVisualizationProps {
    particle: Particle
}

export function ParticleVisualization(props: ParticleVisualizationProps) {
    const ref = useRef<any>()
    useEffect(() => {
        ref.current.position.x = props.particle.properties.position?.x
        ref.current.position.y = props.particle.properties.position?.y
    }, [props.particle.properties.position])
    return <>
        <mesh ref={ref}>
            <boxGeometry />
            <meshPhysicalMaterial clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.8} />
        </mesh>
    </>
}