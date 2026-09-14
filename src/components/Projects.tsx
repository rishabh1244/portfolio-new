import styles from './Projects.module.css'
import Img from './Img'
import Arrow from './Arrow'

const Projects = () => (
  <section className="content-section section-border" id="projects">
    <div className={`${styles.sectionHeading} ${styles.withLink}`}>
      <h2>Projects</h2>
      <a href="#projects">View all <Arrow /></a>
    </div>
    <div className={styles.projectGrid}>
      <article className={styles.projectCard}>
        <Img alt="DevJournal screenshot" />
        <div className={styles.projectCopy}>
          <div className={styles.projectTitleRow}><h3>DevJournal</h3><Arrow /></div>
          <p>A minimal journaling app for developers.</p>
        </div>
      </article>
      <article className={styles.projectCard}>
        <Img alt="MetroSim screenshot" />
        <div className={styles.projectCopy}>
          <div className={styles.projectTitleRow}><h3>MetroSim</h3><Arrow /></div>
          <p>A city transit simulation game built in C++.</p>
        </div>
      </article>
    </div>
  </section>
)

export default Projects
