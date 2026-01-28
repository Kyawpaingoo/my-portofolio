import { Stars, Environment as DreiEnv, ContactShadows } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

export default function Environment() {
  return (
    <>
      {/* Background */}
      <color attach="background" args={['#0a0a1a']} />
      <fog attach="fog" args={['#0a0a1a', 8, 25]} />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1} 
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#60a5fa" />
      <pointLight position={[5, 2, -3]} intensity={0.3} color="#a855f7" />
      
      {/* Stars background */}
      <Stars 
        radius={50} 
        depth={50} 
        count={1500} 
        factor={4} 
        saturation={0}
        fade
        speed={1}
      />
      
      {/* Ground shadow */}
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={4}
      />
      
      {/* Environment map for reflections */}
      <DreiEnv preset="night" />
      
      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom 
          intensity={0.3} 
          luminanceThreshold={0.8}
          luminanceSmoothing={0.9}
        />
        <Vignette offset={0.3} darkness={0.5} />
      </EffectComposer>
    </>
  )
}
