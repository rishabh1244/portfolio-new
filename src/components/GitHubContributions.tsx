import { useState, useEffect, useMemo } from 'react'
import styles from './GitHubContributions.module.css'

interface ContributionDay {
  date: string
  contributionCount: number
  contributionLevel: string
}

interface ContributionWeek {
  contributionDays: ContributionDay[]
}

interface ContributionData {
  totalContributions: number
  weeks: ContributionWeek[]
}

const LEVEL_MAP: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

const DAY_LABEL_ROWS = [
  { index: 1, label: 'Mon' },
  { index: 3, label: 'Wed' },
  { index: 5, label: 'Fri' },
]

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function getMonthLabels(weeks: ContributionWeek[]): (string | null)[] {
  let lastMonth = -1
  return weeks.map((week) => {
    const firstDay = week.contributionDays[0]
    if (!firstDay) return null
    const d = new Date(firstDay.date + 'T00:00:00')
    const month = d.getMonth()
    if (month !== lastMonth) {
      lastMonth = month
      return d.toLocaleDateString('en-US', { month: 'short' })
    }
    return null
  })
}

const GitHubContributions = () => {
  const [data, setData] = useState<ContributionData | null>(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/github-contributions')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  const monthLabels = useMemo(() => (data ? getMonthLabels(data.weeks) : []), [data])

  return (
    <section className="content-section section-border" id="github">
      <div className="sectionHeading">
      </div>
      <div className={styles.container}>
        {loading && (
          <div className={styles.skeleton} aria-hidden="true">
            {Array.from({ length: 53 }).map((_, wi) => (
              <div className={styles.skeletonWeek} key={wi}>
                {Array.from({ length: 7 }).map((_, di) => (
                  <div
                    className={styles.skeletonCell}
                    key={di}
                    style={{ animationDelay: `${(wi * 7 + di) * 4}ms` }}
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        {error && <div className={styles.error}>GitHub activity unavailable.</div>}

        {data && (
          <>
            <div className={styles.total}>
              <strong>{data.totalContributions.toLocaleString()} </strong> GitHub contributions in the last year
            </div>
            <div className={styles.graphWrapper}>
              <div className={styles.graphInner}>
                <div className={styles.months}>
                  {monthLabels.map((label, wi) => (
                    <div className={styles.monthLabel} key={wi}>
                      {label && <span>{label}</span>}
                    </div>
                  ))}
                </div>
                <div className={styles.body}>
                  <div className={styles.dayLabels}>
                    {Array.from({ length: 7 }).map((_, di) => {
                      const match = DAY_LABEL_ROWS.find((r) => r.index === di)
                      return (
                        <div className={styles.dayLabel} key={di}>
                          {match?.label}
                        </div>
                      )
                    })}
                  </div>
                  <div className={styles.graph}>
                    {data.weeks.map((week, wi) => (
                      <div
                        className={styles.week}
                        key={wi}
                        style={{ animationDelay: `${wi * 8}ms` }}
                      >
                        {week.contributionDays.map((day) => {
                          const level = LEVEL_MAP[day.contributionLevel] ?? 0
                          return (
                            <div
                              className={`${styles.cell} ${styles[`level${level}`]}`}
                              key={day.date}
                              title={`${day.contributionCount} contributions \u2014 ${formatDate(day.date)}`}
                            />
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.legend}>
              <span>Less</span>
              <div className={`${styles.cell} ${styles.level0}`} />
              <div className={`${styles.cell} ${styles.level1}`} />
              <div className={`${styles.cell} ${styles.level2}`} />
              <div className={`${styles.cell} ${styles.level3}`} />
              <div className={`${styles.cell} ${styles.level4}`} />
              <span>More</span>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default GitHubContributions
