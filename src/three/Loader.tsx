import { Html, useProgress } from '@react-three/drei'

export default function Loader() {
  const { progress } = useProgress()
  
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-4 text-white text-sm font-medium">
          Loading... {progress.toFixed(0)}%
        </p>
      </div>
    </Html>
  )
}
