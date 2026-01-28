import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import * as THREE from 'three'

interface CameraRigProps {
  focusedView: 'orbit' | 'laptop'
}

// Camera positions for different views
const CAMERA_POSITIONS = {
  orbit: new THREE.Vector3(0, 2, 5),
  laptop: new THREE.Vector3(0, 0.5, 1.5)
}

const CAMERA_TARGETS = {
  orbit: new THREE.Vector3(0, 0, 0),
  laptop: new THREE.Vector3(0, 0.2, 0)
}

export default function CameraRig({ focusedView }: CameraRigProps) {
  const { camera } = useThree()
  const currentView = useRef(focusedView)

  useEffect(() => {
    if (currentView.current !== focusedView) {
      currentView.current = focusedView
      
      const targetPos = CAMERA_POSITIONS[focusedView]
      const lookAtTarget = CAMERA_TARGETS[focusedView]

      // Animate camera position
      gsap.to(camera.position, {
        x: targetPos.x,
        y: targetPos.y,
        z: targetPos.z,
        duration: 1.5,
        ease: 'power3.inOut',
        onUpdate: () => {
          camera.lookAt(lookAtTarget)
        }
      })
    }
  }, [focusedView, camera])

  return null
}
