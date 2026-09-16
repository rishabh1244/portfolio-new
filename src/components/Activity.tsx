import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import styles from './Activity.module.css'

const LANYARD_URL = 'https://api.lanyard.rest/v1/users/740083324332146790'
const POLL_INTERVAL = 12_000

interface SpotifyData {
  track_id: string | null
  song: string | null
  artist: string | null
  album: string | null
  album_art_url: string | null
  timestamps: { start: number; end: number } | null
}

interface ActivityAsset {
  large_image?: string
  large_text?: string
  small_image?: string
  small_text?: string
}

interface ActivityItem {
  name: string
  type: number
  state: string | null
  details: string | null
  timestamps: { start: number; end?: number } | null
  assets: ActivityAsset | null
}

interface LanyardData {
  spotify: SpotifyData | null
  activities: ActivityItem[]
  discord_status: string
}

function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000)
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }
  return `${m}:${String(s).padStart(2, '0')}`
}

const SpotifyIcon = () => (
  <svg className={styles.icon} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 7.5C14 11.0897 11.0903 14 7.5 14V15C11.6426 15 15 11.6419 15 7.5H14ZM7.5 14C3.90974 14 1 11.0897 1 7.5H0C0 11.6419 3.35739 15 7.5 15V14ZM1 7.5C1 3.91029 3.90974 1 7.5 1V0C3.35739 0 0 3.35806 0 7.5H1ZM7.5 1C11.0903 1 14 3.91029 14 7.5H15C15 3.35806 11.6426 0 7.5 0V1ZM3.6619 10.1162C4.64825 9.87576 5.86144 9.77072 7.05416 9.88791C8.25009 10.0054 9.38823 10.3424 10.2559 10.9525L10.8311 10.1345C9.77768 9.39382 8.45578 9.02081 7.15195 8.8927C5.84491 8.76428 4.51862 8.87807 3.42506 9.14466L3.6619 10.1162ZM3.32624 7.99237C6.772 7.38275 9.17433 7.69462 11.1649 9.12359L11.7481 8.31123C9.44985 6.66142 6.73182 6.37433 3.15202 7.00766L3.32624 7.99237ZM3.10135 5.84102C4.45435 5.36298 6.10442 5.1645 7.72549 5.29726C9.34836 5.43016 10.9042 5.8917 12.0886 6.69623L12.6505 5.86901C11.2863 4.94241 9.55125 4.44343 7.80712 4.30059C6.06118 4.15761 4.26817 4.36818 2.76821 4.89814L3.10135 5.84102Z" fill="currentColor"/>
  </svg>
)

const DiscordIcon = () => (
  <svg className={styles.icon} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.992 20.163c-1.511-0.099-2.699-1.349-2.699-2.877 0-0.051 0.001-0.102 0.004-0.153l-0 0.007c-0.003-0.048-0.005-0.104-0.005-0.161 0-1.525 1.19-2.771 2.692-2.862l0.008-0c1.509 0.082 2.701 1.325 2.701 2.847 0 0.062-0.002 0.123-0.006 0.184l0-0.008c0.003 0.050 0.005 0.109 0.005 0.168 0 1.523-1.191 2.768-2.693 2.854l-0.008 0zM11.026 20.163c-1.511-0.099-2.699-1.349-2.699-2.877 0-0.051 0.001-0.102 0.004-0.153l-0 0.007c-0.003-0.048-0.005-0.104-0.005-0.161 0-1.525 1.19-2.771 2.692-2.862l0.008-0c1.509 0.082 2.701 1.325 2.701 2.847 0 0.062-0.002 0.123-0.006 0.184l0-0.008c0.003 0.048 0.005 0.104 0.005 0.161 0 1.525-1.19 2.771-2.692 2.862l-0.008 0zM26.393 6.465c-1.763-0.832-3.811-1.49-5.955-1.871l-0.149-0.022c-0.005-0.001-0.011-0.002-0.017-0.002-0.035 0-0.065 0.019-0.081 0.047l-0 0c-0.234 0.411-0.488 0.924-0.717 1.45l-0.043 0.111c-1.030-0.165-2.218-0.259-3.428-0.259s-2.398 0.094-3.557 0.275l0.129-0.017c-0.27-0.63-0.528-1.142-0.813-1.638l0.041 0.077c-0.017-0.029-0.048-0.047-0.083-0.047-0.005 0-0.011 0-0.016 0.001l0.001-0c-2.293 0.403-4.342 1.060-6.256 1.957l0.151-0.064c-0.017 0.007-0.031 0.019-0.040 0.034l-0 0c-2.854 4.041-4.562 9.069-4.562 14.496 0 0.907 0.048 1.802 0.141 2.684l-0.009-0.11c0.003 0.029 0.018 0.053 0.039 0.070l0 0c2.14 1.601 4.628 2.891 7.313 3.738l0.176 0.048c0.008 0.003 0.018 0.004 0.028 0.004 0.032 0 0.060-0.015 0.077-0.038l0-0c0.535-0.72 1.044-1.536 1.485-2.392l0.047-0.1c0.006-0.012 0.010-0.027 0.010-0.043 0-0.041-0.026-0.075-0.062-0.089l-0.001-0c-0.912-0.352-1.683-0.727-2.417-1.157l0.077 0.042c-0.029-0.017-0.048-0.048-0.048-0.083 0-0.031 0.015-0.059 0.038-0.076l0-0c0.157-0.118 0.315-0.24 0.465-0.364 0.016-0.013 0.037-0.021 0.059-0.021 0.014 0 0.027 0.003 0.038 0.008l-0.001-0c2.208 1.061 4.8 1.681 7.536 1.681s5.329-0.62 7.643-1.727l-0.107 0.046c0.012-0.006 0.025-0.009 0.040-0.009 0.022 0 0.043 0.008 0.059 0.021l-0-0c0.15 0.124 0.307 0.248 0.466 0.365 0.023 0.018 0.038 0.046 0.038 0.077 0 0.035-0.019 0.065-0.046 0.082l-0 0c-0.661 0.395-1.432 0.769-2.235 1.078l-0.105 0.036c-0.036 0.014-0.062 0.049-0.062 0.089 0 0.016 0.004 0.031 0.011 0.044l-0-0.001c0.501 0.96 1.009 1.775 1.571 2.548l-0.040-0.057c0.017 0.024 0.046 0.040 0.077 0.040 0.010 0 0.020-0.002 0.029-0.004l-0.001 0c2.865-0.892 5.358-2.182 7.566-3.832l-0.065 0.047c0.022-0.016 0.036-0.041 0.039-0.069l0-0c0.087-0.784 0.136-1.694 0.136-2.615 0-5.415-1.712-10.43-4.623-14.534l0.052 0.078c-0.008-0.016-0.022-0.029-0.038-0.036l-0-0z" fill="currentColor"/>
  </svg>
)

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

function MarqueeText({ text, className }: { text: string; className?: string }) {
  const viewportRef = useRef<HTMLSpanElement>(null)
  const innerRef = useRef<HTMLSpanElement>(null)
  const [dist, setDist] = useState(0)

  const measure = useCallback(() => {
    const viewport = viewportRef.current
    const inner = innerRef.current
    if (!viewport || !inner) return
    const overflow = inner.scrollWidth - viewport.clientWidth
    setDist(overflow > 0 ? overflow + 10 : 0)
  }, [])

  useIsomorphicLayoutEffect(() => {
    measure()
  }, [text, measure])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const ro = new ResizeObserver(measure)
    ro.observe(viewport)
    return () => ro.disconnect()
  }, [measure])

  const animate = dist > 0
  const duration = Math.max(6, dist / 18)

  return (
    <span ref={viewportRef} className={`${styles.marqueeViewport} ${className ?? ''}`}>
      <span
        ref={innerRef}
        className={`${styles.marqueeInner} ${animate ? styles.isMarquee : ''}`}
        style={animate ? {
          '--marquee-dist': `-${dist}px`,
          '--marquee-duration': `${duration}s`,
        } as React.CSSProperties : undefined}
      >
        {text}
      </span>
    </span>
  )
}

const Activity = () => {
  const [data, setData] = useState<LanyardData | null>(null)
  const [now, setNow] = useState(Date.now())
  const mountedRef = useRef(true)

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(LANYARD_URL)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      if (mountedRef.current) setData(json.data)
    } catch {
      if (mountedRef.current) setData(null)
    }
  }, [])

  useEffect(() => {
    mountedRef.current = true
    fetchData()
    const poll = setInterval(fetchData, POLL_INTERVAL)
    const tick = setInterval(() => setNow(Date.now()), 1000)
    return () => {
      mountedRef.current = false
      clearInterval(poll)
      clearInterval(tick)
    }
  }, [fetchData])

  const spotify = data?.spotify
  const isPlaying = !!spotify?.song && !!spotify?.timestamps

  const activities = (data?.activities ?? []).filter(
    (a) => a.name.toLowerCase() !== 'spotify'
  )

  const discordAct = activities[0]
  const hasSpotify = isPlaying || (spotify && spotify.song)
  const hasDiscord = !!discordAct

  if (!hasSpotify && !hasDiscord) return null

  return (
    <div className={styles.strip}>
      {hasSpotify && (
        <div className={styles.statusItem}>
          <SpotifyIcon />
          <span className={styles.statusLabel}>Spotify</span>
          {isPlaying ? (
            <MarqueeText text={`${spotify!.song} — ${spotify!.artist}`} />
          ) : (
            <MarqueeText text={spotify!.song!} />
          )}
        </div>
      )}

      {hasDiscord && (
        <div className={styles.statusItem}>
          <DiscordIcon />
          <span className={styles.statusLabel}>Discord</span>
          <MarqueeText
            text={
              discordAct.timestamps?.start
                ? `${discordAct.name} · ${formatTime(now - discordAct.timestamps.start)}`
                : discordAct.name
            }
          />
        </div>
      )}
    </div>
  )
}

export default Activity
