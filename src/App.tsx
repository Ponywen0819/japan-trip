import { useState, useEffect } from 'react'
import { trip, days, hotels, type Day } from './data'

function Timeline({ slots }: { slots: Day['slots'] }) {
  return (
    <div className="timeline">
      {slots.map((s, i) => (
        <div className={`tl-slot ${s.type}`} key={i}>
          <span className="tl-slot-time">
            {s.start}–{s.end}
          </span>
          <span className="tl-slot-text">{s.text}</span>
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

        <section className="card">
          <h2>🏨 住宿</h2>
          {hotels.map((h) => (
            <div className="hotel" key={h.name}>
              <div className="hotel-head">
                <strong>{h.name}</strong>
                <span className="nights">{h.nights}</span>
              </div>
              <p className="muted">{h.jp}・{h.area}</p>
              <p>{h.addr}</p>
              {h.tel && <p>☎ {h.tel}</p>}
              <p className="note">{h.note}</p>
              <a href={h.map} target="_blank" rel="noreferrer" className="map-link">
                📍 Google 地圖
              </a>
            </div>
          ))}
        </section>
      </main>

      <footer>祝研討會順利、旅途愉快！</footer>
    </div>
  )
}
