import { useState, useEffect } from 'react'
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

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <header className={styles.navbar}>
      <nav className={styles.nav} aria-label="Primary">
        <a href="#top" className={styles.active}>Home</a>
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
      </nav>
      <button className={styles.themeBtn} type="button" onClick={() => setDark(v => !v)} aria-label="Toggle theme">
        {dark ? '☼' : '☾'}
      </button>
    </header>
  )
}

export default Navbar
