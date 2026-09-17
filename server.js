import 'dotenv/config'
import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// --- GitHub contributions cache ---
let cache = null
let cacheTime = 0
const CACHE_TTL = 1000 * 60 * 30 // 30 minutes
async function fetchContributions() {
  const now = Date.now()

  if (cache && now - cacheTime < CACHE_TTL) {
    return cache
  }

  const token = process.env.GITHUB_TOKEN

  if (!token) {
    throw new Error('GITHUB_TOKEN is not loaded')
  }

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
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'portfolio',
    },
    body: JSON.stringify({ query }),
  })

  const json = await res.json()


  if (!res.ok) {
    throw new Error(
      `GitHub HTTP error ${res.status}: ${
        json.message || JSON.stringify(json)
      }`
    )
  }

  if (json.errors) {
    throw new Error(
      `GitHub GraphQL error: ${JSON.stringify(json.errors)}`
    )
  }

  const calendar =
    json?.data?.user?.contributionsCollection?.contributionCalendar

  if (!calendar) {
    throw new Error('GitHub returned no contribution calendar')
  }

  cache = {
    totalContributions: calendar.totalContributions,
    weeks: calendar.weeks,
  }

  cacheTime = now

  return cache
}


// --- API endpoint ---
app.get('/api/github-contributions', async (req, res) => {
  try {
    const data = await fetchContributions()
    res.json(data)
  } catch (err) {
    console.error('GitHub contributions fetch failed:', err.message)
    res.status(502).json({ error: 'GitHub activity unavailable.' })
  }
})

// --- Serve static build in production ---
const distPath = join(__dirname, 'dist')
app.use(express.static(distPath))
app.get('/{*splat}', (req, res) => {
  res.sendFile(join(distPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
