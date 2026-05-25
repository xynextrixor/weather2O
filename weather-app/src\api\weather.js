const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.weatherapi.com/v1'

function ensureApiKey() {
  if (!API_KEY) {
    throw new Error(
      'API key is missing. Add VITE_WEATHER_API_KEY to your .env file.',
    )
  }
}

async function apiFetch(endpoint, params) {
  ensureApiKey()
  const search = new URLSearchParams({ key: API_KEY, ...params })
  const res = await fetch(`${BASE_URL}/${endpoint}?${search}`)

  let data
  try {
    data = await res.json()
  } catch {
    throw new Error('No response from server. Check your internet connection.')
  }

  if (data.error) throw new Error(data.error.message)
  if (!res.ok) throw new Error('Failed to fetch weather data.')
  return data
}

function toIconUrl(icon) {
  return icon?.startsWith('//') ? `https:${icon}` : icon
}

function normalize(data) {
  const days = data.forecast?.forecastday ?? []
  if (!days.length) throw new Error('Forecast data not available.')

  return {
    location: {
      name: data.location.name,
      region: data.location.region,
      country: data.location.country,
      lat: data.location.lat,
      lon: data.location.lon,
      localtime: data.location.localtime,
    },
    current: {
      temperature_2m: data.current.temp_c,
      apparent_temperature: data.current.feelslike_c,
      relative_humidity_2m: data.current.humidity,
      wind_speed_10m: data.current.wind_kph,
      weather_code: data.current.condition.code,
      condition_text: data.current.condition.text,
      icon: toIconUrl(data.current.condition.icon),
      is_day: data.current.is_day,
    },
    daily: {
      time: days.map((d) => d.date),
      temperature_2m_max: days.map((d) => d.day.maxtemp_c),
      temperature_2m_min: days.map((d) => d.day.mintemp_c),
      weather_code: days.map((d) => d.day.condition.code),
      condition_text: days.map((d) => d.day.condition.text),
      icons: days.map((d) => toIconUrl(d.day.condition.icon)),
    },
  }
}

/** @param {string} query City name or "lat,lon" */
export async function fetchWeather(query) {
  const trimmed = String(query).trim()
  if (!trimmed) throw new Error('Please enter a city name.')
  const data = await apiFetch('forecast.json', { q: trimmed, days: '5' })
  return normalize(data)
}

export function formatLocation(location) {
  if (!location) return 'Unknown'
  const parts = [location.name]
  if (location.region && location.region !== location.name) parts.push(location.region)
  if (location.country) parts.push(location.country)
  return parts.join(', ')
}

export function weatherTheme(code) {
  if (code === 1000) return 'theme-clear'
  if (code === 1003) return 'theme-partly'
  if (code === 1006 || code === 1009) return 'theme-cloudy'
  if (code === 1030 || code === 1135 || code === 1147) return 'theme-fog'
  if ((code >= 1063 && code <= 1207) || (code >= 1240 && code <= 1264)) return 'theme-rain'
  if (
    (code >= 1066 && code <= 1225 && code !== 1087) ||
    (code >= 1255 && code <= 1258) ||
    code === 1114 ||
    code === 1117
  ) return 'theme-snow'
  if (code === 1087 || code >= 1273) return 'theme-storm'
  return 'theme-default'
}
