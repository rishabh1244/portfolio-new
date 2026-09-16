import React from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Profile from './components/Profile'
import About from './components/About'
import Contact from './components/Contact'
import Projects from './components/Projects'
import TechStack from './components/TechStack'
import Experience from './components/Experience'
import Activity from './components/Activity'
import Footer from './components/Footer'

function App() {
  return (
    <div className="site">
      <Navbar />
      <main id="top">
        <Hero />
        <Profile />

        <About />
        <Contact />
        <Activity />


        <TechStack />

        <Projects />

        <Experience />

      </main>
      <Footer />
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
