import styles from './Profile.module.css'
import Img from './Img'

const Profile = () => (
  <section className={`${styles.profile} section-border`}>
    <Img className={styles.avatar} alt="Ri profile" src="/pfp.jpg" />
    <div className={styles.profileCopy}>
      <div className={styles.statusDot} aria-hidden="true" />
      <h1>Rishabh Kumar</h1>
      <p className={styles.role}>FullStack Developer</p>
      <p className={styles.location}><span className={styles.pin}>⌖</span> India</p>
    </div>
    <div className={styles.views}>◉ 1023</div>
  </section>
)

export default Profile
