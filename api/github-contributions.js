let cache = null
let cacheTime = 0
const CACHE_TTL = 1000 * 60 * 30

async function fetchContributions() {
  const now = Date.now()
  if (cache && now - cacheTime < CACHE_TTL) return cache

  const token = process.env.GITHUB_TOKEN
  if (!token) throw new Error('GITHUB_TOKEN is not set')

  const query = `
    query {
      user(login: "rishabh1244") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'portfolio',
    },
    body: JSON.stringify({ query }),
  })

  const json = await res.json()

  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status}: ${json.message || JSON.stringify(json)}`)
  }

  if (json.errors) {
    throw new Error(`GitHub GraphQL error: ${JSON.stringify(json.errors)}`)
  }

  const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar
  if (!calendar) throw new Error('GitHub returned no contribution calendar')

  cache = {
    totalContributions: calendar.totalContributions,
    weeks: calendar.weeks,
  }
  cacheTime = now
  return cache
}

export default async function handler(req, res) {
  try {
    const data = await fetchContributions()
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=1800')
    res.status(200).json(data)
  } catch (err) {
    console.error('GitHub contributions fetch failed:', err.message)
    res.status(502).json({ error: 'GitHub activity unavailable.' })
  }
}
