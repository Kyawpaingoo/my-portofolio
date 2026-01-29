import SEO from '../Components/SEO'
import { Mail, Github, Linkedin } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <SEO 
        canonical="/"
        description="Kyaw Paing Oo (Kelvin) - Full Stack Developer from Myanmar specializing in React, Node.js, .NET, and cloud services."
      />
      
      <div className="pointer-events-auto absolute left-3 right-3 md:left-8 md:right-auto bottom-24 md:bottom-auto md:top-1/2 md:-translate-y-1/2 max-w-lg">
        <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-4 md:p-6 border border-white/10">
          <p className="text-blue-400 text-xs md:text-sm font-medium mb-1">Hello, I'm</p>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-1">Kyaw Paing Oo</h1>
          <h2 className="text-base md:text-xl text-gray-300 mb-3">Full Stack Developer</h2>
          <p className="text-gray-400 text-xs md:text-sm mb-4 hidden sm:block">
            Passionate Burmese developer crafting scalable web solutions.
          </p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            <a href="mailto:paingookyaw624@gmail.com" className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors text-sm">
              <Mail className="w-4 h-4" /><span>Hire Me</span>
            </a>
            <a href="https://github.com/Kyawpaingoo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors text-sm">
              <Github className="w-4 h-4" /><span>GitHub</span>
            </a>
          </div>

          <div className="flex gap-2">
            <a href="https://github.com/Kyawpaingoo" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors" aria-label="Visit GitHub profile">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/kyaw-paing-oo-dev" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors" aria-label="Visit LinkedIn profile">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="mailto:paingookyaw624@gmail.com" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors" aria-label="Send email">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Kyaw Paing Oo",
          "alternateName": "Kelvin",
          "url": "https://kyawpaingoo.dev",
          "jobTitle": "Full Stack Developer",
          "sameAs": ["https://github.com/Kyawpaingoo", "https://www.linkedin.com/in/kyaw-paing-oo-dev"],
          "knowsAbout": ["React", "Node.js", ".NET", "TypeScript", "PostgreSQL", "AWS"]
        })
      }} />
    </>
  )
}
