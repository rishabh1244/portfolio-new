import { useState, useEffect, useCallback } from 'react'
import styles from './Navbar.module.css'

const Navbar = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme')
      if (saved) return saved === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  const [activeSection, setActiveSection] = useState('top')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id], main[id]')
    const navbarHeight = document.querySelector('header')?.getBoundingClientRect().height || 64

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: `-${navbarHeight}px 0px -40% 0px`,
        threshold: 0
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    setActiveSection(sectionId)
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <header className={styles.navbar}>
      <nav className={styles.nav} aria-label="Primary">
        <a
          href="#top"
          className={activeSection === 'top' ? styles.active : ''}
          onClick={(e) => handleNavClick(e, 'top')}
        >
          Home
        </a>
        <a
          href="#projects"
          className={activeSection === 'projects' ? styles.active : ''}
          onClick={(e) => handleNavClick(e, 'projects')}
        >
          Projects
        </a>
        <a
          href="#experience"
          className={activeSection === 'experience' ? styles.active : ''}
          onClick={(e) => handleNavClick(e, 'experience')}
        >
          Experience
        </a>
      </nav>
      <button className={styles.themeBtn} type="button" onClick={() => setDark(v => !v)} aria-label="Toggle theme">
        {dark ? '☼' : '☾'}
      </button>
    </header>
  )
}

export default Navbar
