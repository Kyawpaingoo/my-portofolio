import { useState } from 'react'
import ThemeContext from './Context/ThemeContext.tsx'
import useTheme from './Hook/useTheme.tsx'
import Scene from './three/Scene'
import UIOverlay from './Components/UIOverlay'
import type { SectionKey } from './Data'

const App: React.FC = () => {
  const themeValue = useTheme()
  const [focusedView, setFocusedView] = useState<'orbit' | 'laptop'>('orbit')
  const [activeSection, setActiveSection] = useState<SectionKey>('home')

  const handleLaptopClick = () => {
    setFocusedView('laptop')
    setActiveSection('projects')
  }

  const handleBackClick = () => {
    setFocusedView('orbit')
    setActiveSection('home')
  }

  const handleSectionChange = (section: SectionKey) => {
    setActiveSection(section)
    // Zoom to laptop when Projects is clicked, otherwise zoom out
    if (section === 'projects') {
      setFocusedView('laptop')
    } else {
      setFocusedView('orbit')
    }
  }

  return (
    <ThemeContext.Provider value={themeValue}>
      <div className="relative w-full h-screen overflow-hidden bg-gray-900">
        {/* 3D Scene */}
        <Scene 
          onLaptopClick={handleLaptopClick}
          focusedView={focusedView}
        />
        
        {/* UI Overlay */}
        <UIOverlay 
          focusedView={focusedView}
          onBackClick={handleBackClick}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />
      </div>
    </ThemeContext.Provider>
  )
}

export default App