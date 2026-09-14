import styles from './Contact.module.css'
import personal from '../data/personal.json'

const Contact = () => (
  <section className="content-section section-border" id="contact">
    <div className={styles.contactGrid}>
      {personal.links.filter(link => link.label !== 'Resume').map((link) => (
        <a key={link.label} className={styles.contactChip} href={link.url} target={link.url.startsWith('http') ? '_blank' : undefined} rel={link.url.startsWith('http') ? 'noreferrer' : undefined}>
          <span
            className={styles.contactIcon}
            dangerouslySetInnerHTML={{ __html: link.icon }}
          />
        </a>
      ))}
    </div>
  </section>
)

export default Contact
