import styles from './Navbar.module.css'


const Navbar = () => (
  <header className={styles.navbar}>
    <nav className={styles.nav} aria-label="Primary">
      <a href="#top" className={styles.active}>Home</a>
      <a href="#projects">Projects</a>
      <a href="#experience">Experience</a>
   </nav>
  </header>
)

export default Navbar
