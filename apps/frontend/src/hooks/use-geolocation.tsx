import { useState } from 'react'
import { toast } from 'sonner'

export const useGeolocation = () => {
  // TODO: Add progress state to track download progress and update it in the UI.
  const [latitude, setLatitude] = useState<number>(0.0)
  const [longitude, setLongitude] = useState<number>(0.0)
  const [precisao, setPrecisao] = useState<number>(0.0)
  const [errorGeolocation, setErrorGeoLocation] =
    useState<GeolocationPositionError>()

  const configGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setErrorGeoLocation(undefined)
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
        setPrecisao(position.coords.accuracy)
      },
      error => {
        if (latitude === 0.0) {
          toast('Permita o acesso a notificação')
        }
        setErrorGeoLocation(error)
      },
    )
  }

  return {
    latitude,
    longitude,
    precisao,
    errorGeolocation,
    configGeolocation,
  }
}
