import React, { useEffect, useLayoutEffect, useRef } from 'react'
import './App.css'
import { Canvas } from '@react-three/fiber'
import { Stage, Grid, OrbitControls } from '@react-three/drei'
import { Conveyor, CoobScene, Fields, ManyObjects, TwoObjectsCollision } from './scenes'
import { useGUI } from './infra/hooks'
import { IWorldParameters, worldProps } from './physics'
import { Vector3 } from 'three'
import { useHotkeys } from '@mantine/hooks'

function App() {
  useHotkeys([
    ['space', () => worldProps.paused = !worldProps.paused],
    ['c', () => worldProps.collisions = !worldProps.collisions],
    ['alt+mod+shift+X', () => console.log('Rick roll')],
  ])
  const ref = React.useRef<any>()
  const [width, setWidth] = React.useState(window.innerWidth)
  const [height, setHeight] = React.useState(window.innerHeight)
  React.useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const [scene, setScene] = React.useState<React.ReactNode | undefined>()
  const [sceneName, setSceneName] = React.useState<string>('Many objects')
  useGUI({
    sceneChanged: setSceneName
  })
  useLayoutEffect(() => {
    switch (sceneName.trim()) {
      case 'Coob':
        setScene(<CoobScene />)
        break
      case 'Many objects':
        setScene(<ManyObjects />)
        break
      case 'Simple collision':
        setScene(<TwoObjectsCollision />)
        break
      case 'Conveyor':
        setScene(<Conveyor />)
        break
      case 'Fields':
        setScene(<Fields />)
        break
      default:
        setScene(<ManyObjects />)
        break
    }
  }, [sceneName])

  return (
    <div ref={ref} className="App">
      <Canvas style={{
        width: width,
        height: height,
      }}
        gl={{ logarithmicDepthBuffer: true }} shadows camera={{
          position: [7.5, 7.5, 7.5],
          fov: 60,
          near: 0.0001,
          zoom: 1,
          far: 1500,
        }}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.0}
          enableZoom
          enableDamping
          enableRotate
          enablePan
          makeDefault
          maxPolarAngle={Math.PI / 2} />
        <Stage intensity={0.5} environment="dawn" shadows={{ type: 'accumulative', bias: -0.001 }} adjustCamera={false}>
          <scene>
            {scene}
          </scene>
        </Stage>
        <Grid renderOrder={-1} position={[0, -1, 0]} infiniteGrid cellSize={0.6} cellThickness={0.6} sectionSize={3.3} sectionThickness={1.5} fadeDistance={100} />
      </Canvas>
    </div >
  )
}

export default App
