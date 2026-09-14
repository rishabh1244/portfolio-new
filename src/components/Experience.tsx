import styles from './Experience.module.css'
import Arrow from './Arrow'

const experiences = [
  ['2024 - Present', 'SDE Intern @ Example', 'Working on cool stuff...'],
  ['2023 - 2024', 'Open Source Contributor', 'Contributions to XYZ, ABC...'],
  ['2022 - 2023', 'B.Tech CSE', 'Some University, India'],
]

const Experience = () => (
  <section className="content-section section-border" id="experience">
    <div className={`${styles.sectionHeading} ${styles.withLink}`}>
      <h2>Experience</h2>
      <a href="#experience">View all <Arrow /></a>
    </div>
    <div className={styles.timeline}>
      {experiences.map(([date, title, detail]) => (
        <div className={styles.timelineRow} key={date}>
          <div className={styles.timelineDot} />
          <div className={styles.timelineDate}>{date}</div>
          <div className={styles.timelineCopy}><strong>{title}</strong><span>{detail}</span></div>
        </div>
      ))}
    </div>
  </section>
)

export default Experience
