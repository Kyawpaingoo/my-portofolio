import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Preload } from '@react-three/drei'
import Experience from './Experience'
import Loader from './Loader'

interface SceneProps {
  onLaptopClick?: () => void
  focusedView?: 'orbit' | 'laptop'
}

export default function Scene({ onLaptopClick, focusedView = 'orbit' }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 2, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ 
        antialias: true, 
        alpha: true,
        powerPreference: 'high-performance'
      }}
      style={{ position: 'fixed', inset: 0 }}
      shadows
    >
      <Suspense fallback={<Loader />}>
        <Experience 
          onLaptopClick={onLaptopClick} 
          focusedView={focusedView}
        />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
