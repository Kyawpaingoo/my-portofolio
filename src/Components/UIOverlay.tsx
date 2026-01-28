import { useState } from 'react'
import { Github, Linkedin, Mail, Menu, X, ArrowLeft, Briefcase, Code2, Calendar, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { navItems, skillCategories, experiences, projects, type SectionKey } from '../Data'

interface UIOverlayProps {
  focusedView: 'orbit' | 'laptop'
  onBackClick: () => void
  activeSection: SectionKey
  onSectionChange: (section: SectionKey) => void
}

export default function UIOverlay({ 
  focusedView, 
  onBackClick,
  activeSection,
  onSectionChange 
}: UIOverlayProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState(0)

  const handleNavClick = (section: SectionKey) => {
    if (activeSection === section) {
      onSectionChange('home')
    } else {
      onSectionChange(section)
    }
    setMenuOpen(false)
  }

  const handleNextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const handlePrevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const project = projects[currentProject]

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* Top Navigation Bar */}
      <header className="pointer-events-auto absolute top-0 left-0 right-0 p-3 md:p-4 flex justify-between items-center">
        {/* Logo / Name */}
        <div className="flex items-center gap-2">
          {focusedView === 'laptop' ? (
            <button
              onClick={onBackClick}
              className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Scene</span>
              <span className="sm:hidden">Back</span>
            </button>
          ) : (
            <button 
              onClick={() => onSectionChange('home')}
              className="px-3 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
            >
              <span className="text-white font-bold text-base md:text-lg">Kelvin</span>
              <span className="text-blue-400 ml-1">Dev</span>
            </button>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full px-2 py-1">
          {navItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-2 rounded-full text-sm transition-colors ${
                activeSection === item.id
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2.5 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="pointer-events-auto md:hidden absolute top-16 left-3 right-3 bg-gray-900/95 backdrop-blur-md rounded-xl p-3 border border-white/10 max-h-[60vh] overflow-y-auto">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors text-sm ${
                  activeSection === item.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Mobile Project Panel - Shows on mobile when viewing laptop/projects */}
      {focusedView === 'laptop' && (
        <div className="pointer-events-auto md:hidden absolute inset-x-3 top-16 bottom-3 flex flex-col">
          <div className="flex-1 bg-gray-900/95 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden flex flex-col">
            {/* Project Header */}
            <div className="flex items-center justify-between p-3 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-gray-400">
                {currentProject + 1} / {projects.length}
              </span>
            </div>

            {/* Project Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="text-lg font-bold text-blue-400 mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                {project.description}
              </p>
              
              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-2">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between p-3 border-t border-white/10 bg-gray-800/50">
              <button
                onClick={handlePrevProject}
                className="flex items-center gap-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </button>
              <div className="flex gap-1">
                {projects.slice(0, 5).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentProject(idx)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentProject === idx ? 'bg-blue-500' : 'bg-gray-600'
                    }`}
                  />
                ))}
                {projects.length > 5 && (
                  <span className="text-xs text-gray-500 ml-1">...</span>
                )}
              </div>
              <button
                onClick={handleNextProject}
                className="flex items-center gap-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-white transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section Content Panels - Mobile: bottom, Desktop: left side */}
      {activeSection !== 'home' && activeSection !== 'projects' && focusedView === 'orbit' && (
        <div className="pointer-events-auto absolute inset-x-3 md:left-8 md:right-auto bottom-4 md:bottom-auto md:top-1/2 md:-translate-y-1/2 max-w-lg max-h-[50vh] md:max-h-[70vh] overflow-y-auto">
          <div className="bg-gray-900/90 backdrop-blur-md rounded-xl p-4 md:p-6 border border-white/10 relative">
            {/* Close button */}
            <button
              onClick={() => onSectionChange('home')}
              className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* About Section */}
            {activeSection === 'about' && (
              <div className="text-white pr-8">
                <h2 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-blue-400" />
                  About Me
                </h2>
                <p className="text-gray-300 text-sm mb-3">
                  I'm a passionate Full Stack Developer from Myanmar with expertise in building 
                  scalable web applications. Currently working remotely while exploring the world 
                  as a digital nomad.
                </p>
                <p className="text-gray-300 text-sm mb-4">
                  With a strong foundation in both frontend and backend technologies, I specialize 
                  in React, Node.js, .NET, and cloud services.
                </p>
                <a
                  href="mailto:paingookyaw624@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-full text-sm transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Contact Me
                </a>
              </div>
            )}

            {/* Skills Section */}
            {activeSection === 'skills' && (
              <div className="text-white pr-8">
                <h2 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-blue-400" />
                  Skills
                </h2>
                <div className="space-y-3">
                  {skillCategories.map((category) => (
                    <div key={category.title}>
                      <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <category.icon className={`w-4 h-4 ${category.color}`} />
                        {category.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {category.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 text-xs bg-white/10 rounded-full text-gray-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience Section */}
            {activeSection === 'experience' && (
              <div className="text-white pr-8">
                <h2 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-400" />
                  Experience
                </h2>
                <div className="space-y-4">
                  {experiences.map((exp, index) => (
                    <div key={index} className="border-l-2 border-blue-500 pl-3">
                      <h3 className="text-sm font-semibold">{exp.title}</h3>
                      <p className="text-blue-400 text-xs">{exp.company}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mb-1">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </p>
                      <p className="text-gray-300 text-xs mb-2">{exp.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {exp.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-1.5 py-0.5 text-xs bg-blue-500/20 text-blue-300 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Section */}
            {activeSection === 'contact' && (
              <div className="text-white pr-8">
                <h2 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-400" />
                  Contact
                </h2>
                <p className="text-gray-300 text-sm mb-4">
                  Open to opportunities and collaborations!
                </p>
                <div className="space-y-2">
                  <a
                    href="mailto:paingookyaw624@gmail.com"
                    className="flex items-center gap-3 px-3 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <Mail className="w-4 h-4 text-blue-400" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-xs text-gray-400">paingookyaw624@gmail.com</p>
                    </div>
                  </a>
                  <a
                    href="https://github.com/Kyawpaingoo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <Github className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">GitHub</p>
                      <p className="text-xs text-gray-400">@Kyawpaingoo</p>
                    </div>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kyaw-paing-oo-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">LinkedIn</p>
                      <p className="text-xs text-gray-400">kyaw-paing-oo-dev</p>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Content - Mobile optimized */}
      {activeSection === 'home' && focusedView === 'orbit' && (
        <div className="pointer-events-auto absolute left-3 right-3 md:left-8 md:right-auto bottom-24 md:bottom-auto md:top-1/2 md:-translate-y-1/2 max-w-lg">
          <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-4 md:p-6 border border-white/10">
            <p className="text-blue-400 text-xs md:text-sm font-medium mb-1">Hello, I'm</p>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-1">
              Kyaw Paing Oo
            </h1>
            <h2 className="text-base md:text-xl text-gray-300 mb-3">
              Full Stack Developer
            </h2>
            <p className="text-gray-400 text-xs md:text-sm mb-4 hidden sm:block">
              Passionate Burmese developer crafting scalable web solutions.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-2 mb-3">
              <a
                href="mailto:paingookyaw624@gmail.com"
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Hire Me</span>
              </a>
              <a
                href="https://github.com/Kyawpaingoo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors text-sm"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              <a
                href="https://github.com/Kyawpaingoo"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/kyaw-paing-oo-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:paingookyaw624@gmail.com"
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Instructions hint - Mobile friendly */}
      {focusedView === 'orbit' && activeSection === 'home' && (
        <div className="pointer-events-none absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2">
          <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/60 text-xs md:text-sm whitespace-nowrap">
            <span className="hidden sm:inline">Drag to rotate • Scroll to zoom • </span>
            <span>Click laptop for projects</span>
          </div>
        </div>
      )}

      {/* Skills Legend - Desktop only */}
      {focusedView === 'orbit' && activeSection === 'home' && (
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
  )
}
