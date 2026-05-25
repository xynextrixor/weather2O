export default function Forecast({ weather }) {
  const { daily } = weather

  return (
    <section className="card forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-list">
        {daily.time.map((date, i) => {
          const day = new Date(date + 'T12:00:00')
          const label =
            i === 0 ? 'Today' : day.toLocaleDateString(undefined, { weekday: 'short' })

          return (
            <div key={date} className="forecast-row">
              <span className="day-name">{label}</span>
              <img src={daily.icons[i]} alt="" className="day-icon" />
              <span className="day-condition">{daily.condition_text[i]}</span>
              <span className="day-temps">
                <span className="high">{Math.round(daily.temperature_2m_max[i])}°</span>
                <span className="low">{Math.round(daily.temperature_2m_min[i])}°</span>
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
