import Hero from './Hero.jsx'
import About from './About.jsx'
import Experience from './Experience.jsx'
import Projects from './Projects.jsx'
import Skills from './Skills.jsx'
import Contact from './Contact.jsx'

export default function Page() {
  return (
    <main className="page">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </main>
  )
}
