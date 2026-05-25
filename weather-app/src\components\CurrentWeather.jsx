import { formatLocation } from '../api/weather'

export default function CurrentWeather({ location, weather }) {
  const { current } = weather
  const localDate = location.localtime
    ? new Date(location.localtime.replace(' ', 'T'))
    : new Date()

  return (
    <section className="card current-weather">
      <div className="location-row">
        <svg className="pin-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
        </svg>
        <div>
          <h2>{formatLocation(location)}</h2>
          <p className="date-text">
            {localDate.toLocaleDateString(undefined, {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
          </p>
        </div>
      </div>

      <div className="weather-hero">
        <img src={current.icon} alt="" className="weather-icon" />
        <div>
          <p className="temp">{Math.round(current.temperature_2m)}°C</p>
          <p className="condition">{current.condition_text}</p>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat">
          <span className="stat-label">Feels like</span>
          <span className="stat-value">{Math.round(current.apparent_temperature)}°C</span>
        </div>
        <div className="stat">
          <span className="stat-label">Humidity</span>
          <span className="stat-value">{current.relative_humidity_2m}%</span>
        </div>
        <div className="stat">
          <span className="stat-label">Wind</span>
          <span className="stat-value">{Math.round(current.wind_speed_10m)} km/h</span>
        </div>
      </div>
    </section>
  )
}
