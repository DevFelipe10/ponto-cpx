import { Injectable } from '@nestjs/common'
import * as turf from '@turf/turf'
import { PontoGeolocation } from 'src/face-recognition/domain/entities/mistert/ponto-geolocation.mistert'
import { MistertService } from 'src/face-recognition/infrastructure/mistert/mistert.service'

@Injectable()
export class GeofenceService {
  constructor(private readonly mistertService: MistertService) {}

  // isInsideGeofence(latitude: number, logitude: number): boolean {
  //   const point: [number, number] = [
  //     parseFloat(latitude.toString()),
  //     parseFloat(logitude.toString()),
  //   ]

  //   // TODO: Buscar o cadastro de geofence no MT

  //   // latitude, longitude
  //   const polygon: [number, number][][] = [
  //     [
  //       [-23.562401, -46.691161], // Ponto 1
  //       [-23.562032, -46.690592], // Ponto 2
  //       [-23.562307, -46.690415], // Ponto 3
  //       [-23.562701, -46.690952], // Ponto 4
  //       [-23.562401, -46.691161], // Fecha o polígono
  //     ],
  //   ]

  //   turf.point(point)

  //   const pt = turf.point(point)
  //   const poly = turf.polygon(polygon)

  //   return turf.booleanPointInPolygon(pt, poly)
  // }

  async isInsideCircle(latitude: number, longitude: number): Promise<boolean> {
    // Buscar os pontos de geolocalização no MT
    const geolocations = await this.mistertService.getPointGeolocation()

    const point: [number, number] = [latitude, longitude]

    const pontoGeolocation = geolocations.find(value => {
      const radius = value.raio
      const center = [value.latitude, value.longitude]

      const pt = turf.point(point)
      const circle = turf.circle(center, radius, { units: 'meters' })

      const res = turf.booleanPointInPolygon(pt, circle)

      if (res) {
        return value
      }
    })

    return pontoGeolocation === undefined ? false : true
  }
}
