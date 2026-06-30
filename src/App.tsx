import { useState, useEffect } from 'react'
import { trip, days, type Day } from './data'

// 把現有的 Google 地圖連結轉成可 iframe 的 embed 網址
// ponytail: 用非官方的 output=embed（免 API key）。哪天 Google 擋了，再換 Maps Embed API + key。
function mapEmbed(url: string): string | null {
  try {
    const p = new URL(url).searchParams
    const o = p.get('origin')
    const d = p.get('destination')
    if (o && d)
      return `https://maps.google.com/maps?saddr=${encodeURIComponent(o)}&daddr=${encodeURIComponent(
        d,
      )}&dirflg=r&output=embed`
    const q = p.get('query')
    if (q) return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&output=embed`
  } catch {
    // 非標準網址就不內嵌
  }
  return null
}

function Timeline({ slots }: { slots: Day['slots'] }) {
  const [open, setOpen] = useState<Set<string>>(new Set())
  const toggle = (k: string) =>
    setOpen((s) => {
      const n = new Set(s)
      if (n.has(k)) n.delete(k)
      else n.add(k)
      return n
    })

  return (
    <div className="timeline">
      {slots.map((s, i) => (
        <div className={`tl-slot ${s.type}`} key={i}>
          <span className="tl-slot-time">
            {s.start}–{s.end}
          </span>
          <span className="tl-slot-text">
            <span className="tl-title">
              {s.map && mapEmbed(s.map) ? (
                <button type="button" className="tl-title-btn" onClick={() => toggle(`map:${i}`)}>
                  {s.text}
                </button>
              ) : s.map ? (
                <a href={s.map} target="_blank" rel="noreferrer">
                  {s.text}
                </a>
              ) : (
                s.text
              )}
            </span>
            {s.note && <span className="tl-note">{s.note}</span>}
            {s.addr && <span className="tl-addr">{s.addr}</span>}
            {(s.links || s.img) && (
              <span className="tl-links">
                {s.links?.map((l) => {
                  const embed = mapEmbed(l.url)
                  const key = `${i}:${l.url}`
                  return embed ? (
                    <button
                      key={l.url}
                      type="button"
                      className={`tl-link${open.has(key) ? ' open' : ''}`}
                      onClick={() => toggle(key)}
                    >
                      {l.label}
                    </button>
                  ) : (
                    <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="tl-link">
                      {l.label}
                    </a>
                  )
                })}
                {s.img && (
                  <button
                    type="button"
                    className={`tl-link${open.has(`img:${i}`) ? ' open' : ''}`}
                    onClick={() => toggle(`img:${i}`)}
                  >
                    🎬 動畫場景
                  </button>
                )}
              </span>
            )}
            {s.links?.map((l) => {
              const embed = mapEmbed(l.url)
              const key = `${i}:${l.url}`
              return embed && open.has(key) ? (
                <iframe key={`f${l.url}`} className="tl-map" src={embed} loading="lazy" title={l.label} />
              ) : null
            })}
            {s.img && open.has(`img:${i}`) && (
              <img className="tl-photo" src={s.img} alt={`${s.text} 動畫場景`} loading="lazy" />
            )}
            {s.map && open.has(`map:${i}`) && mapEmbed(s.map) && (
              <iframe className="tl-map" src={mapEmbed(s.map)!} loading="lazy" title={s.text} />
            )}
          </span>
        </div>
      ))}
    </div>
  )
}

function DayView({ day }: { day: Day }) {
  return (
    <article className="card">
      <Timeline slots={day.slots} />

      {day.tips.length > 0 && (
        <ul className="tips">
          {day.tips.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default function App() {
  const [active, setActive] = useState(1)
  const day = days.find((d) => d.id === active)!

  // 互動：深色模式，偏好存 localStorage
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <div className="app">
      <button className="theme-toggle" onClick={() => setDark((d) => !d)} aria-label="切換深色模式">
        {dark ? '☀️' : '🌙'}
      </button>
      <header className="hero">
        <h1>{trip.title}</h1>
        <p className="sub">{trip.subtitle}・7/13–7/18</p>
      </header>

      <nav className="tabs">
        {days.map((d) => (
          <button
            key={d.id}
            className={d.id === active ? 'tab active' : 'tab'}
            onClick={() => setActive(d.id)}
          >
            <span className="tab-day">Day {d.id}</span>
            <span className="tab-date">{d.date}</span>
          </button>
        ))}
      </nav>

      <main>
        <DayView day={day} />
      </main>

      <footer>祝研討會順利、旅途愉快！</footer>
    </div>
  )
}
