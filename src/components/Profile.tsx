import styles from './Profile.module.css'
import Img from './Img'
import personal from '../data/personal.json'

const Profile = () => (
  <section className={styles.profile}>
    <Img className={styles.avatar} alt="Ri profile" src="/pfp.jpg" />
    <div className={styles.profileCopy}>
      <div className={styles.nameRow}>
        <h1>{personal.name}</h1>
        <a className={styles.resume} href={personal.links.find(l => l.label === 'Resume')?.url} target="_blank" rel="noreferrer">
          <span dangerouslySetInnerHTML={{ __html: personal.links.find(l => l.label === 'Resume')?.icon || '' }} />
          <span>Resume</span>
        </a>
      </div>
      <p className={styles.role}>{personal.role}</p>
      <p className={styles.subtitle}>Cracked Autistic Delusional Retard</p>
      <div className={styles.info}>
        <span className={styles.location}>⌖ {personal.location}</span>
        <span className={styles.email}>✉ {personal.email}</span>
      </div>
    </div>
  </section>
)

export default Profile
