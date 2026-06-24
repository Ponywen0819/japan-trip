import { useState, useEffect } from 'react'
import { trip, days, type Day } from './data'

function Timeline({ slots }: { slots: Day['slots'] }) {
  return (
    <div className="timeline">
      {slots.map((s, i) => (
        <div className={`tl-slot ${s.type}`} key={i}>
          <span className="tl-slot-time">
            {s.start}–{s.end}
          </span>
          <span className="tl-slot-text">
            <span className="tl-title">
              {s.map ? (
                <a href={s.map} target="_blank" rel="noreferrer">
                  {s.text}
                </a>
              ) : (
                s.text
              )}
            </span>
            {s.note && <span className="tl-note">{s.note}</span>}
            {s.addr && <span className="tl-addr">{s.addr}</span>}
            {s.links && (
              <span className="tl-links">
                {s.links.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="tl-link">
                    {l.label}
                  </a>
                ))}
              </span>
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

      <ul className="tips">
        {day.tips.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
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
        <p className="axis">{trip.axis}</p>
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
