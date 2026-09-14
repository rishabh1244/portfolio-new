import { useState, useEffect } from 'react'
import styles from './Footer.module.css'
import quote from '../data/quote.json'

const getOrdinal = (n: number) => {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return s[(v - 20) % 10] || s[v] || s[0]
}

const formatNumber = (n: number) => n.toLocaleString()

const Footer = () => {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const key = 'visitor_count'
    const current = parseInt(localStorage.getItem(key) || '0', 10)
    const next = current + 1
    localStorage.setItem(key, String(next))
    setCount(next)
  }, [])

  return (
    <footer className={styles.footer}>
      <div className={styles.card}>
        <div className={styles.quoteSection}>
          <div className={styles.quoteRow}>
            <span className={styles.quoteIcon} aria-hidden="true">"</span>
            <div className={styles.quoteBody}>
              <p className={styles.quoteText}>{quote.quote}</p>
              <footer className={styles.quoteAuthor}>— {quote.author}</footer>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.visitorSection}>
          {count !== null ? (
            <p className={styles.visitorText}>
              You are the{' '}
              <span className={styles.visitorCount}>
                {formatNumber(count)}
                <sup>{getOrdinal(count)}</sup>
              </span>
              {' '}visitor
            </p>
          ) : (
            <p className={styles.visitorText}>&nbsp;</p>
          )}
        </div>
      </div>

      <div className={styles.bottom}>
        <span>Built with prompt's and patience </span>
        <span>© 2026 Rizzabh</span>
      </div>
    </footer>
  )
}

export default Footer
