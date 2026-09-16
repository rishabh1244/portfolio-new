import styles from './Profile.module.css'
import Img from './Img'
import personal from '../data/personal.json'
import Activity from './Activity'

const Profile = () => (
  <section className={styles.profileSection}>
    <div className={styles.profile}>
      <Img className={styles.avatar} alt="Ri profile" src="/pfp.jpg" />
      <div className={styles.profileCopy}>
        <div className={styles.nameRow}>
          <h1>{personal.name}</h1>
        </div>
        <p className={styles.role}>{personal.role}</p>
        <p className={styles.subtitle}>Cracked Autistic Delusional Retard</p>
        <div className={styles.info}>
          <span className={styles.location}>⌖ {personal.location}</span>
          <span className={styles.email}>✉ {personal.email}</span>
        </div>
      </div>
    </div>
    <Activity />
  </section>
)

export default Profile
