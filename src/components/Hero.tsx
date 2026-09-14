import { useState, useEffect } from 'react'
import styles from './Hero.module.css'
import Img from './Img'

const Hero = () => {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const check = () => {
      setDark(document.documentElement.getAttribute('data-theme') === 'dark')
    }
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.hero}>
      <Img alt="Scenic pixel-art banner" src={dark ? '/banner2.gif' : '/banner.gif'} />
    </section>
  )
}

export default Hero
