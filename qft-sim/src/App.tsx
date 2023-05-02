import React from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber'
import { Stage, Grid, OrbitControls, Hud } from '@react-three/drei'
import { HUD } from './components/HUD';
import { CoobScene } from './components';

function App() {
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

  return (
    <div ref={ref} className="App">
      <HUD sceneChanged={(scene) => setScene(scene)} />
      <Canvas style={{
        width: width,
        height: height,
      }}
        gl={{ logarithmicDepthBuffer: false }} shadows camera={{ position: [-3, 5, 5], fov: 70 }}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.05}
          enableZoom
          enableDamping
          enableRotate
          enablePan
          makeDefault
          maxPolarAngle={Math.PI / 2} />
        <Hud renderPriority={2}>
          <fog attach="fog" args={['black', 50, 100]} />
          <Stage intensity={0.5} environment="dawn" shadows={{ type: 'accumulative', bias: -0.001 }} adjustCamera={false}>
            {scene ?? <CoobScene />}
          </Stage>
          <Grid renderOrder={-1} position={[0, -1.85, 0]} infiniteGrid cellSize={0.6} cellThickness={0.6} sectionSize={3.3} sectionThickness={1.5} fadeDistance={30} />
        </Hud>
      </Canvas>
    </div >
  );
}

export default App;
