import { useState, useEffect } from 'react'
import { trip, days, hotels, type Day } from './data'

const PX_PER_MIN = 1.5 // 每分鐘像素 → 30 分 = 45px
const toMin = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}
const fmt = (min: number) =>
  `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`

function Timeline({ slots }: { slots: Day['slots'] }) {
  // 固定 30 分刻度的真實時間軸：往下取整到整點/半點，往上同理
  const base = Math.floor(Math.min(...slots.map((s) => toMin(s.start))) / 30) * 30
  const end = Math.ceil(Math.max(...slots.map((s) => toMin(s.end))) / 30) * 30

  const ticks: number[] = []
  for (let t = base; t <= end; t += 30) ticks.push(t)

  return (
    <div className="timeline" style={{ height: (end - base) * PX_PER_MIN }}>
      {ticks.map((t) => (
        <div
          key={t}
          className={t % 60 === 0 ? 'tl-tick hour' : 'tl-tick'}
          style={{ top: (t - base) * PX_PER_MIN }}
        >
          <span className="tl-tlabel">{fmt(t)}</span>
        </div>
      ))}
      {slots.map((s, i) => (
        <div
          key={i}
          className={`tl-slot ${s.type}`}
          style={{
            top: (toMin(s.start) - base) * PX_PER_MIN,
            height: (toMin(s.end) - toMin(s.start)) * PX_PER_MIN,
          }}
        >
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

      <div className="meals">
        <span>🍱 午餐：{day.meals.lunch}</span>
        <span>🍶 晚餐：{day.meals.dinner}</span>
      </div>

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
