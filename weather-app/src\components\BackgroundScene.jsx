import { useEffect, useState } from 'react'
import { BACKGROUNDS, getThemeOverlay } from '../api/backgrounds'

export default function BackgroundScene({ imageUrl, themeClass }) {
  const [shown, setShown] = useState(imageUrl)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (imageUrl === shown) return

    const img = new Image()
    img.onload = () => {
      setVisible(false)
      setTimeout(() => {
        setShown(imageUrl)
        setVisible(true)
      }, 350)
    }
    img.onerror = () => setShown(imageUrl)
    img.src = imageUrl
  }, [imageUrl, shown])

  const overlay = getThemeOverlay(themeClass)

  return (
    <div className="scene-root" aria-hidden="true">
      <div
        className={`scene-photo ${visible ? 'scene-photo--visible' : ''}`}
        style={{ backgroundImage: `url(${shown || BACKGROUNDS.default})` }}
      />
      <div className="scene-overlay" style={{ background: overlay }} />
      <div className="scene-vignette" />
    </div>
  )
}
