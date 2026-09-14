import styles from './Profile.module.css'
import Img from './Img'

const Profile = () => (
  <section className={`${styles.profile} section-border`}>
    <Img className={styles.avatar} alt="Ri profile" src="/pfp.jpg" />
    <div className={styles.profileCopy}>
      <h1>Rishabh Kumar</h1>
      <p className={styles.role}>FullStack Developer</p>
    </div>
  </section>
)

export default Profile
