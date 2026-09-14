import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Profile from './components/Profile'
import About from './components/About'
import Contact from './components/Contact'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Footer from './components/Footer'

function App() {
  const [dark, setDark] = useState(false)

  return (
    <div className={dark ? 'site dark' : 'site'}>
      <div className="shell">
        <Navbar dark={dark} onToggleTheme={() => setDark(v => !v)} />
        <main id="top">
          <Hero />
          <Profile />
          <About />
          <Contact />
          <Projects />
          <Experience />
        </main>
        <Footer />
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
