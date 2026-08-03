import React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Education from './components/Education/Education'
import Experience from './components/Experience/Experience'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import Skills from './components/Skills/Skills'
import Work from './components/Work/Work'
import Certificates from './components/Certificates/Certificates'
import TerminalModal from './components/Terminal/TerminalModal'

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-[#050414] min-h-screen text-white selection:bg-[#8245ec] selection:text-white">
      {/* Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8245ec] via-purple-400 to-blue-500 origin-left z-50 shadow-md shadow-[#8245ec]/50"
        style={{ scaleX }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
      
      <Navbar />
      <div className="relative pt-16 sm:pt-20">
        <About />
        <Education />
        <Skills /> 
        <Work />
        <Certificates/>
        <Experience />
        <Contact />
        <Footer />
      </div>

      {/* Interactive Developer Terminal Modal */}
      <TerminalModal />
    </div>
  )
}

export default App
