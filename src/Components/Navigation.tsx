import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ArrowLeft } from 'lucide-react'
import { navItems } from '../Data'

interface NavigationProps {
  focusedView: 'orbit' | 'laptop'
}

export default function Navigation({ focusedView }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate('/')
  }

  return (
    <header className="pointer-events-auto fixed top-0 left-0 right-0 p-3 md:p-4 flex justify-between items-center z-20">
      <div className="flex items-center gap-2">
        {focusedView === 'laptop' ? (
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors text-sm"
            aria-label="Go back to home"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Scene</span>
            <span className="sm:hidden">Back</span>
          </button>
        ) : (
          <Link 
            to="/"
            className="px-3 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
            aria-label="Go to home page"
          >
            <span className="text-white font-bold text-base md:text-lg">Kelvin</span>
            <span className="text-blue-400 ml-1">Dev</span>
          </Link>
        )}
      </div>

      <nav className="hidden md:flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full px-2 py-1" aria-label="Main navigation">
        {navItems.slice(0, 5).map((item) => {
          const isActive = location.pathname === (item.id === 'home' ? '/' : `/${item.id}`)
          return (
            <Link
              key={item.id}
              to={item.id === 'home' ? '/' : `/${item.id}`}
              className={`px-3 py-2 rounded-full text-sm transition-colors ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden p-2.5 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {menuOpen && (
        <div className="pointer-events-auto md:hidden absolute top-16 left-3 right-3 bg-gray-900/95 backdrop-blur-md rounded-xl p-3 border border-white/10 max-h-[60vh] overflow-y-auto">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const isActive = location.pathname === (item.id === 'home' ? '/' : `/${item.id}`)
              return (
                <Link
                  key={item.id}
                  to={item.id === 'home' ? '/' : `/${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors text-sm ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
