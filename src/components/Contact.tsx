import styles from './Contact.module.css'
import Arrow from './Arrow'

const links = [
  ['GitHub', 'https://github.com/'],
  ['LinkedIn', 'https://linkedin.com/'],
  ['Twitter', 'https://x.com/'],
  ['Mail', 'mailto:hello@example.com'],
  ['Resume', '#'],
]

const Contact = () => (
  <section className="content-section section-border" id="contact">
    <div className={styles.sectionHeading}><h2>Contact</h2></div>
    <div className={styles.contactGrid}>
      {links.map(([label, href]) => (
        <a key={label} className={styles.contactChip} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>
          <span className={`${styles.contactIcon} ${styles['icon' + label]}`}>{label === 'GitHub' ? '◔' : label === 'LinkedIn' ? 'in' : label === 'Twitter' ? '𝕏' : label === 'Mail' ? '✉' : '↗'}</span>
          <span>{label}</span>
          <Arrow />
        </a>
      ))}
    </div>
  </section>
)

export default Contact
