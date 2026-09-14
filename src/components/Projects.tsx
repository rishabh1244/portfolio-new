import styles from './Projects.module.css'
import Img from './Img'
import Arrow from './Arrow'
import projects from '../data/projects.json'

const Projects = () => (
  <section className="content-section section-border" id="projects">
    <div className="sectionHeading">
      <h2>Projects</h2>
    </div>
    <div className={styles.projectGrid}>
      {projects.map((project) => (
        <article className={styles.projectCard} key={project.name}>
          <a href={project.github} target="_blank" rel="noreferrer">
            <Img alt={`${project.name} screenshot`} src={project.image} />
          </a>
          <div className={styles.projectCopy}>
            <div className={styles.projectTitleRow}>
              <h3>{project.name}</h3>
              <a href={project.github} target="_blank" rel="noreferrer"><Arrow /></a>
            </div>
            <p>{project.description}</p>
          </div>
        </article>
      ))}
    </div>
  </section>
)

export default Projects
