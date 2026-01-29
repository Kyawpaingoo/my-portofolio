import { Routes, Route, useLocation } from 'react-router-dom'
import { Suspense, lazy, useState, useEffect } from 'react'
import ThemeContext from './Context/ThemeContext.tsx'
import useTheme from './Hook/useTheme.tsx'
import Navigation from './Components/Navigation'
import SkipLink from './Components/SkipLink'
import { HomePage, AboutPage, SkillsPage, ExperiencePage, ContactPage, ProjectsPage } from './Pages'

// Lazy load the 3D scene for better Core Web Vitals
const Scene = lazy(() => import('./three/Scene'))

// Loading placeholder for 3D scene
function SceneLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
      <div className="text-white text-sm animate-pulse">Loading 3D Scene...</div>
    </div>
  )
}

const App: React.FC = () => {
  const themeValue = useTheme()
  const location = useLocation()
  const [focusedView, setFocusedView] = useState<'orbit' | 'laptop'>('orbit')

  // Sync focusedView with route
  useEffect(() => {
    if (location.pathname === '/projects') {
      setFocusedView('laptop')
    } else {
      setFocusedView('orbit')
    }
  }, [location.pathname])

  const handleLaptopClick = () => {
    // Navigation is now handled by router, but we keep this for 3D interaction
    window.history.pushState({}, '', '/projects')
    window.dispatchEvent(new PopStateEvent('popstate'))
  }


  return (
    <ThemeContext.Provider value={themeValue}>
      <SkipLink />
      <div id="main-content" className="relative w-full h-screen overflow-hidden bg-gray-900">
        {/* 3D Scene - Lazy loaded */}
        <Suspense fallback={<SceneLoader />}>
          <Scene 
            onLaptopClick={handleLaptopClick}
            focusedView={focusedView}
          />
        </Suspense>
        
        {/* Navigation - Always visible */}
        <Navigation focusedView={focusedView} />
        
        {/* Content Overlay */}
        <div className="fixed inset-0 pointer-events-none z-10">
          {/* Section Content Panels */}
          <Routes>
            <Route path="/" element={
              focusedView === 'orbit' ? <HomePage /> : null
            } />
            <Route path="/about" element={
              <ContentPanel>
                <AboutPage />
              </ContentPanel>
            } />
            <Route path="/skills" element={
              <ContentPanel>
                <SkillsPage />
              </ContentPanel>
            } />
            <Route path="/experience" element={
              <ContentPanel>
                <ExperiencePage />
              </ContentPanel>
            } />
            <Route path="/contact" element={
              <ContentPanel>
                <ContactPage />
              </ContentPanel>
            } />
            <Route path="/projects" element={
              <ProjectsPanel>
                <ProjectsPage />
              </ProjectsPanel>
            } />
          </Routes>

          {/* Instructions hint */}
          {focusedView === 'orbit' && location.pathname === '/' && (
            <div className="pointer-events-none absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/60 text-xs md:text-sm whitespace-nowrap">
                <span className="hidden sm:inline">Drag to rotate • Scroll to zoom • </span>
                <span>Click laptop for projects</span>
              </div>
            </div>
          )}

          {/* Skills Legend - Desktop only */}
          {focusedView === 'orbit' && location.pathname === '/' && (
            <div className="pointer-events-auto hidden lg:block absolute right-4 top-1/2 -translate-y-1/2">
              <div className="bg-gray-900/60 backdrop-blur-md rounded-xl p-3 border border-white/10">
                <h3 className="text-white text-xs font-medium mb-2">Tech Stack</h3>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span className="text-gray-400 text-xs">Frontend</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span className="text-gray-400 text-xs">Backend</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                    <span className="text-gray-400 text-xs">Database</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    <span className="text-gray-400 text-xs">DevOps</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

// Content Panel wrapper for non-projects pages
function ContentPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-auto absolute inset-x-3 md:left-8 md:right-auto bottom-4 md:bottom-auto md:top-1/2 md:-translate-y-1/2 max-w-lg max-h-[50vh] md:max-h-[70vh] overflow-y-auto">
      <div className="bg-gray-900/90 backdrop-blur-md rounded-xl p-4 md:p-6 border border-white/10 relative">
        {children}
      </div>
    </div>
  )
}

// Projects Panel wrapper
function ProjectsPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-auto md:hidden absolute inset-x-3 top-16 bottom-3 flex flex-col">
      <div className="flex-1 bg-gray-900/95 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  )
}

export default App