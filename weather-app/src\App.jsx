import { useCallback, useEffect, useState } from 'react'
import { fetchWeather, weatherTheme } from './api/weather'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import './App.css'

const DEFAULT_CITY = 'Delhi'

export default function App() {
  const [location, setLocation] = useState(null)
  const [weather, setWeather] = useState(null)
  const [initialLoading, setInitialLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState(null)

  const loadWeather = useCallback(async (query) => {
    const isFirstLoad = !weather
    if (isFirstLoad) setInitialLoading(true)
    else setRefreshing(true)
    setError(null)

    try {
      const data = await fetchWeather(query)
      setLocation(data.location)
      setWeather(data)
    } catch (err) {
      setError(err.message ?? 'Could not load weather. Please try again.')
    } finally {
      setInitialLoading(false)
      setRefreshing(false)
    }
  }, [weather])

  useEffect(() => {
    function tryGeo() {
      if (!navigator.geolocation) {
        loadWeather(DEFAULT_CITY)
        return
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => loadWeather(`${pos.coords.latitude},${pos.coords.longitude}`),
        () => loadWeather(DEFAULT_CITY),
        { timeout: 8000, maximumAge: 300000 },
      )
    }
    tryGeo()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function handleSearch(query) {
    loadWeather(query)
  }

  function handleUseLocation() {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      return
    }
    setRefreshing(true)
    setError(null)
    navigator.geolocation.getCurrentPosition(
      (pos) => loadWeather(`${pos.coords.latitude},${pos.coords.longitude}`),
      () => {
        setError('Could not access your location. Try searching for a city.')
        setRefreshing(false)
      },
      { timeout: 8000 },
    )
  }

  const themeClass = weather
    ? weatherTheme(weather.current.weather_code)
    : 'theme-default'

  return (
    <div className={`app ${themeClass}`}>
      <header className="app-header">
        <h1 className="app-title">Weather</h1>
        <SearchBar
          onSearch={handleSearch}
          onLocate={handleUseLocation}
          disabled={initialLoading || refreshing}
        />
      </header>

      <main className="app-main">
        {initialLoading && (
          <div className="status-box">
            <div className="spinner" />
            <p>Loading weather...</p>
          </div>
        )}

        {!initialLoading && error && !weather && (
          <div className="status-box error" role="alert">
            <p>{error}</p>
            <button type="button" className="btn-secondary" onClick={() => loadWeather(DEFAULT_CITY)}>
              Show Delhi weather
            </button>
          </div>
        )}

        {!initialLoading && weather && location && (
          <div className={`content ${refreshing ? 'content--loading' : ''}`}>
            {error && (
              <div className="error-banner" role="alert">
                {error}
              </div>
            )}
            {refreshing && <div className="refresh-bar" aria-hidden="true" />}
            <CurrentWeather location={location} weather={weather} />
            <Forecast weather={weather} />
          </div>
        )}
      </main>

      <footer className="app-footer">
        Powered by{' '}
        <a href="https://www.weatherapi.com/" target="_blank" rel="noreferrer">
          WeatherAPI
        </a>
      </footer>
    </div>
  )
}
