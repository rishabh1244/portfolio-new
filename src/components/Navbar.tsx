import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const Navbar = () => {
  const [active, setActive] = useState('#top')

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive('#' + entry.target.id)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className={styles.navbar}>
      <nav className={styles.nav} aria-label="Primary">
        <a href="#top" className={active === '#top' ? styles.active : ''}>Home</a>
        <a href="#projects" className={active === '#projects' ? styles.active : ''}>Projects</a>
        <a href="#experience" className={active === '#experience' ? styles.active : ''}>Experience</a>
      </nav>
    </header>
  )
}

export default Navbar
