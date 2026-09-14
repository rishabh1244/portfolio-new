import styles from './Hero.module.css'
import Img from './Img'

const Hero = () => (
  <section className={styles.hero}>
    <Img alt="Scenic pixel-art banner" src="/banner.png" />
    <div className={styles.heroOverlay}>
      <span>Better</span>
      <span>Systems</span>
      <span>Brighter</span>
      <span>Days_</span>
    </div>
  </section>
)

export default Hero
