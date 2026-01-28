import { OrbitControls } from '@react-three/drei'
import Environment from './Environment'
import Laptop from './Laptop'
import FloatingIcons from './FloatingIcons'
import CameraRig from './CameraRig'

interface ExperienceProps {
  onLaptopClick?: () => void
  focusedView?: 'orbit' | 'laptop'
}

export default function Experience({ onLaptopClick, focusedView = 'orbit' }: ExperienceProps) {
  return (
    <>
      <CameraRig focusedView={focusedView} />
      <Environment />
      <Laptop 
        position={[0, -0.5, 0]} 
        onClick={onLaptopClick}
        isFocused={focusedView === 'laptop'}
      />
      <FloatingIcons />
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
        minDistance={3}
        maxDistance={12}
        zoomSpeed={0.5}
        enabled={focusedView === 'orbit'}
        makeDefault
      />
    </>
  )
}
