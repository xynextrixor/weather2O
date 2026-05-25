import { weatherTheme } from './weather'

const IMG = (id, extra = '') =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1920&q=80${extra}`

export const BACKGROUNDS = {
  default: IMG('photo-1534088568595-a06644814087'),
  clearDay: IMG('photo-1501594907352-04cda38deba0'),
  clearNight: IMG('photo-1419539646773-32a0d66fe0b'),
  partlyDay: IMG('photo-1592210454359-9043f067919b'),
  partlyNight: IMG('photo-1475274047067-7bf1fd1e0132'),
  cloudy: IMG('photo-1535920858882-8d5d7f346025'),
  fog: IMG('photo-1487621167305-5d7632240458'),
  rain: IMG('photo-1428908728789-d2ab25da455d'),
  snow: IMG('photo-1491002056546-48159f360567'),
  storm: IMG('photo-1605727216801-27b762b37588'),
}

export function getBackgroundImage(code, isDay = 1) {
  const theme = code != null ? weatherTheme(code) : 'theme-default'
  const day = isDay === 1

  switch (theme) {
    case 'theme-clear':
      return day ? BACKGROUNDS.clearDay : BACKGROUNDS.clearNight
    case 'theme-partly':
      return day ? BACKGROUNDS.partlyDay : BACKGROUNDS.partlyNight
    case 'theme-cloudy':
      return BACKGROUNDS.cloudy
    case 'theme-fog':
      return BACKGROUNDS.fog
    case 'theme-rain':
      return BACKGROUNDS.rain
    case 'theme-snow':
      return BACKGROUNDS.snow
    case 'theme-storm':
      return BACKGROUNDS.storm
    default:
      return BACKGROUNDS.default
  }
}

export function getThemeOverlay(theme) {
  const overlays = {
    'theme-clear': 'linear-gradient(160deg, rgba(26,16,64,0.72) 0%, rgba(74,44,122,0.55) 40%, rgba(232,135,58,0.45) 100%)',
    'theme-partly': 'linear-gradient(160deg, rgba(12,25,41,0.78) 0%, rgba(30,58,95,0.62) 50%, rgba(124,111,160,0.5) 100%)',
    'theme-cloudy': 'linear-gradient(160deg, rgba(26,35,50,0.82) 0%, rgba(45,63,84,0.68) 100%)',
    'theme-fog': 'linear-gradient(160deg, rgba(30,36,51,0.85) 0%, rgba(107,114,128,0.55) 100%)',
    'theme-rain': 'linear-gradient(160deg, rgba(10,22,40,0.88) 0%, rgba(15,39,68,0.72) 50%, rgba(30,73,118,0.55) 100%)',
    'theme-snow': 'linear-gradient(160deg, rgba(26,39,68,0.75) 0%, rgba(45,74,110,0.6) 50%, rgba(126,184,218,0.45) 100%)',
    'theme-storm': 'linear-gradient(160deg, rgba(10,10,26,0.9) 0%, rgba(26,16,64,0.75) 50%, rgba(49,46,129,0.6) 100%)',
    'theme-default': 'linear-gradient(160deg, rgba(15,23,42,0.85) 0%, rgba(30,27,75,0.7) 50%, rgba(12,74,110,0.55) 100%)',
  }
  return overlays[theme] ?? overlays['theme-default']
}
