import { useState, useEffect } from 'react'
import { trip, days, hotels, reminders, checklistDefault, type Day } from './data'

type Checked = Record<string, boolean>

function Checklist() {
  // 互動：勾選狀態存 localStorage，重開瀏覽器還在
  const [checked, setChecked] = useState<Checked>(() => {
    try {
      return JSON.parse(localStorage.getItem('packing') || '{}') as Checked
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem('packing', JSON.stringify(checked))
  }, [checked])

  const done = checklistDefault.filter((i) => checked[i]).length

  return (
    <section className="card">
      <h2>🧳 行前待辦 / 行李清單</h2>
      <p className="muted">已完成 {done} / {checklistDefault.length}</p>
      <ul className="checklist">
        {checklistDefault.map((item) => (
          <li key={item}>
            <label className={checked[item] ? 'done' : ''}>
              <input
                type="checkbox"
                checked={!!checked[item]}
                onChange={(e) => setChecked((c) => ({ ...c, [item]: e.target.checked }))}
              />
              {item}
            </label>
          </li>
        ))}
      </ul>
      {done > 0 && (
        <button className="link-btn" onClick={() => setChecked({})}>
          清除全部勾選
        </button>
      )}
    </section>
  )
}

function DayView({ day }: { day: Day }) {
  return (
    <article className="card">
      <h2>
        Day {day.id}｜{day.date}（{day.dow}）
      </h2>
      <h3 className="day-title">{day.title}</h3>
      <p className="summary">{day.summary}</p>

      <div className="timeline">
        {day.schedule.map(([time, what], i) => (
          <div className="tl-item" key={i}>
            <div className="tl-time">{time}</div>
            <div className="tl-marker" aria-hidden="true">
              <span className="tl-dot" />
            </div>
            <div className="tl-card">{what}</div>
          </div>
        ))}
      </div>

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

        <Checklist />

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

        <section className="card">
          <h2>📌 整體提醒</h2>
          <ul className="tips">
            {reminders.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </section>
      </main>

      <footer>祝研討會順利、旅途愉快！</footer>
    </div>
  )
}
