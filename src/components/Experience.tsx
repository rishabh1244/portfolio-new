import styles from './Experience.module.css'
import experience from '../data/experience.json'

const Experience = () => (
  <section className="content-section section-border" id="experience">
    <div className="sectionHeading">
      <h2>Experience</h2>
    </div>
    <div className={styles.experienceList}>
      {experience.map((item, index) => (
        <div className={styles.experienceItem} key={item.date}>
          <div className={styles.experienceRow}>
            <span className={styles.marker}>{index === 0 ? '■' : '□'}</span>
            <span className={styles.date}>{item.date}</span>
            <div className={styles.details}>
              <span className={styles.title}>{item.title} @ {item.company}</span>
              <span className={styles.description}>{item.description}</span>
            </div>
          </div>
          {index < experience.length - 1 && <div className={styles.separator} />}
        </div>
      ))}
    </div>
  </section>
)

export default Experience
