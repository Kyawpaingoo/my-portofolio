import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { skillCategories } from '../Data'

// Color mapping for different skill categories
const CATEGORY_COLORS: Record<string, string> = {
  'Frontend': '#3b82f6',   // blue
  'Backend': '#22c55e',    // green
  'Database': '#a855f7',   // purple
  'DevOps': '#f97316',     // orange
}

// Get all skills with their category colors
const getAllSkillsWithColors = () => {
  const skills: { name: string; color: string; category: string }[] = []
  
  skillCategories.forEach((category) => {
    category.skills.forEach((skill) => {
      skills.push({
        name: skill,
        color: CATEGORY_COLORS[category.title] || '#60a5fa',
        category: category.title
      })
    })
  })
  
  return skills
}

interface FloatingIconProps {
  skill: { name: string; color: string; category: string }
  position: [number, number, number]
}

function FloatingIcon({ skill, position }: FloatingIconProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  // Random speed variations for more organic movement
  const speed = useMemo(() => 0.8 + Math.random() * 0.7, [])
  const rotationSpeed = useMemo(() => 0.3 + Math.random() * 0.4, [])
  
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed
    }
  })

  return (
    <Float
      speed={speed}
      rotationIntensity={0.3}
      floatIntensity={0.8}
      floatingRange={[-0.1, 0.1]}
    >
      <group position={position}>
        {/* Glowing sphere behind text */}
        <Sphere args={[0.12, 16, 16]} ref={meshRef}>
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </Sphere>
        
        {/* Tech name */}
        <Text
          position={[0.25, 0, 0]}
          fontSize={0.12}
          color="white"
          anchorX="left"
          anchorY="middle"
        >
          {skill.name}
          <meshBasicMaterial 
            color="white" 
            transparent 
            opacity={0.9}
          />
        </Text>
      </group>
    </Float>
  )
}

export default function FloatingIcons() {
  const skills = useMemo(() => getAllSkillsWithColors(), [])
  
  // Generate positions in an orbital pattern around the laptop
  const positions = useMemo(() => {
    return skills.map((_, index) => {
      const total = skills.length
      const angle = (index / total) * Math.PI * 2
      const layer = Math.floor(index / 6) // Create multiple layers
      const radius = 2.5 + layer * 0.6 + (Math.random() * 0.4)
      const height = 0 + (Math.random() * 2) - layer * 0.15
      
      return [
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      ] as [number, number, number]
    })
  }, [skills])

  // Only render a subset for performance
  const visibleSkills = skills.slice(0, 18)

  return (
    <group>
      {visibleSkills.map((skill, index) => (
        <FloatingIcon
          key={`${skill.name}-${index}`}
          skill={skill}
          position={positions[index]}
        />
      ))}
    </group>
  )
}
