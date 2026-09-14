import styles from './About.module.css'
import personal from '../data/personal.json'

const About = () => (
  <section className="content-section section-border" id="about">
    <div className="sectionHeading"><h2>About</h2></div>
    <div className={styles.aboutCopy}>
      {personal.about.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  </section>
)

export default About
