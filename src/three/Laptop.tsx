import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, RoundedBox, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { projects } from '../Data'

interface LaptopProps {
  position: [number, number, number]
  onClick?: () => void
  isFocused: boolean
}

export default function Laptop({ position, onClick, isFocused }: LaptopProps) {
  const laptopRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [currentProject, setCurrentProject] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Hide laptop on mobile when focused
  const shouldHide = isMobile && isFocused

  // Subtle floating animation
  useFrame((state) => {
    if (laptopRef.current && !isFocused) {
      laptopRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
      laptopRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.03
    }
  })

  const handleNextProject = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const handlePrevProject = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const project = projects[currentProject]

  return (
    <group 
      ref={laptopRef} 
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Laptop Base */}
      <RoundedBox
        args={[2.4, 0.08, 1.6]}
        radius={0.02}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial 
          color={hovered ? '#374151' : '#1f2937'} 
          metalness={0.8}
          roughness={0.2}
        />
      </RoundedBox>

      {/* Keyboard area background */}
      <RoundedBox
        args={[2.0, 0.02, 0.6]}
        radius={0.01}
        position={[0, 0.05, 0.1]}
      >
        <meshStandardMaterial 
          color="#0f0f0f" 
          metalness={0.3}
          roughness={0.8}
        />
      </RoundedBox>

      {/* Keyboard keys grid - 4 rows */}
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 12 }).map((_, col) => (
          <RoundedBox
            key={`key-${row}-${col}`}
            args={[0.13, 0.02, 0.1]}
            radius={0.01}
            position={[
              -0.85 + col * 0.15,
              0.07,
              -0.15 + row * 0.13
            ]}
          >
            <meshStandardMaterial 
              color="#1a1a1a"
              emissive="#3b82f6"
              emissiveIntensity={hovered ? 0.15 : 0.05}
              metalness={0.4}
              roughness={0.6}
            />
          </RoundedBox>
        ))
      )}

      {/* Spacebar row */}
      <RoundedBox
        args={[0.6, 0.02, 0.1]}
        radius={0.01}
        position={[0, 0.07, 0.38]}
      >
        <meshStandardMaterial 
          color="#1a1a1a"
          emissive="#3b82f6"
          emissiveIntensity={hovered ? 0.15 : 0.05}
          metalness={0.4}
          roughness={0.6}
        />
      </RoundedBox>

      {/* Trackpad - centered below keyboard */}
      <RoundedBox
        args={[0.5, 0.01, 0.3]}
        radius={0.02}
        position={[0, 0.05, 0.6]}
      >
        <meshStandardMaterial 
          color="#2a2a2a"
          metalness={0.6}
          roughness={0.3}
        />
      </RoundedBox>


      {/* Laptop Screen - connected at hinge */}
      <group position={[0, 0.75, -0.75]} rotation={[-0.3, 0, 0]}>
        {/* Screen frame */}
        <RoundedBox
          args={[2.4, 1.5, 0.05]}
          radius={0.02}
          castShadow
        >
          <meshStandardMaterial 
            color="#1f2937" 
            metalness={0.8}
            roughness={0.2}
          />
        </RoundedBox>

        {/* Screen display */}
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[2.2, 1.3]} />
          <MeshDistortMaterial
            color="#0ea5e9"
            emissive="#0284c7"
            emissiveIntensity={0.1}
            distort={0}
            speed={0}
          />
        </mesh>

        {/* Screen glow effect */}
        <pointLight 
          position={[0, 0, 0.5]} 
          intensity={hovered ? 0.8 : 0.3} 
          color="#60a5fa" 
          distance={3}
        />

        {/* HTML Content on Screen - Hidden on mobile when focused */}
        {!shouldHide && (
          <Html
            transform
            position={[0, 0, 0.04]}
            distanceFactor={1.2}
            occlude
            style={{
              width: '380px',
              height: '240px',
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              borderRadius: '8px',
            padding: '12px',
            overflow: 'hidden',
            pointerEvents: isFocused ? 'auto' : 'none',
            opacity: 1,
          }}
        >
          <div className="h-full flex flex-col text-white font-sans">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <span className="text-[10px] text-gray-400">
                {currentProject + 1} / {projects.length}
              </span>
            </div>

            {/* Project Content */}
            <div className="flex-1 overflow-hidden">
              <h3 className="text-sm font-bold text-blue-400 mb-1 truncate">
                {project.title}
              </h3>
              <p className="text-[10px] text-gray-300 mb-2 line-clamp-2 leading-relaxed">
                {project.description}
              </p>
              
              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1 mb-2">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span 
                    key={tech}
                    className="px-1.5 py-0.5 text-[9px] bg-blue-500/20 text-blue-300 rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-1.5 py-0.5 text-[9px] bg-gray-600/50 text-gray-400 rounded">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Navigation */}
            {isFocused && (
              <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                <button
                  onClick={handlePrevProject}
                  className="px-2 py-1 text-[10px] bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                >
                  ←
                </button>
                <div className="flex gap-1">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 text-[10px] bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      GitHub
                    </a>
                  )}
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 text-[10px] bg-blue-600 hover:bg-blue-500 rounded transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Live
                    </a>
                  )}
                </div>
                <button
                  onClick={handleNextProject}
                  className="px-2 py-1 text-[10px] bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </Html>
        )}
      </group>

      {/* Hover indicator */}
      {hovered && !isFocused && (
        <Html position={[0, 1.8, 0]} center>
          <div className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm whitespace-nowrap">
            Click to explore projects
          </div>
        </Html>
      )}
    </group>
  )
}
