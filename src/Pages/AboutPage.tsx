import SEO from '../Components/SEO'
import { Code2, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <>
      <SEO title="About" canonical="/about" description="Learn about Kyaw Paing Oo (Kelvin), a Full Stack Developer from Myanmar." />
      <div className="text-white pr-8">
        <h1 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-blue-400" />About Me
        </h1>
        <p className="text-gray-300 text-sm mb-3">
          I'm a passionate Full Stack Developer from Myanmar with expertise in building scalable web applications.
        </p>
        <p className="text-gray-300 text-sm mb-4">
          With a strong foundation in both frontend and backend technologies, I specialize in React, Node.js, .NET, and cloud services. Check out my{' '}
          <Link to="/projects" className="text-blue-400 hover:underline">projects</Link>.
        </p>
        <a href="mailto:paingookyaw624@gmail.com" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-full text-sm transition-colors">
          <Mail className="w-4 h-4" />Contact Me
        </a>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kyawpaingoo.dev/" },
            { "@type": "ListItem", "position": 2, "name": "About", "item": "https://kyawpaingoo.dev/about" }
          ]
        })
      }} />
    </>
  )
}
