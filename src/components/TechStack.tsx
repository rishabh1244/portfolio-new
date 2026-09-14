import styles from './TechStack.module.css'
import techStack from '../data/tech_stack.json'

const TechStack = () => (
  <section className="content-section section-border" id="techstack">
    <div className="sectionHeading">
      <h2>{techStack.title}</h2>
    </div>
    <div className={styles.grid}>
      {techStack.items.map((tech) => (
        <div className={styles.item} key={tech.name}>
          <span
            className={styles.icon}
            style={{ color: techStack.style.iconColor }}
            dangerouslySetInnerHTML={{ __html: tech.svg }}
          />
          <span className={styles.name}>{tech.name}</span>
        </div>
      ))}
    </div>
  </section>
)

export default TechStack
