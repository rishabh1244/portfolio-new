import styles from './About.module.css'

const About = () => (
  <section className="content-section section-border" id="about">
    <div className={styles.sectionHeading}><h2>About</h2></div>
    <div className={styles.aboutCopy}>
      <p>Hi! I'm Rishabh, a FullStack Developer passionate about building things at the intersection of systems, design and ideas.</p>
      <p>I love working on web apps, low level stuff, simulations and anything that lets me learn something new.</p>
    </div>
  </section>
)

export default About
