import { Injectable } from '@nestjs/common'
import { AxiosError } from 'axios'
import { EnvConfigService } from 'src/shared/infrastructure/env-config/env-config.service'
import { PersonOpencv } from './types/opencv.person.type'
import { ErrorResponseOpencv } from './types/opencv.type'
import { OpencvHttpService } from './opencv-http/opencv-http.service'
import {
  SearchDetectOpencv,
  SearchPersonOpencv,
} from './types/opencv.search.type'

@Injectable()
export class OpencvSearchService {
  private opencvBaseUrl: string
  private min_score = 0.8

  constructor(
    private readonly envConfigService: EnvConfigService,
    private readonly httpService: OpencvHttpService,
  ) {
    this.opencvBaseUrl = this.envConfigService.getOpencvBaseUrl()
  }

  async detect(image: string) {
    const { data } = await this.httpService
      .post<SearchDetectOpencv[]>(`${this.opencvBaseUrl}/detect`, { image })
      .catch((e: AxiosError<ErrorResponseOpencv>) => {
        throw e.response.data
      })

    return data
  }

  // Busca um ou mais imagens da pessoa
  async searchFace<R = PersonOpencv[], E = ErrorResponseOpencv>(
    images: string,
    max_results: number = 1,
  ) {
    const request = <SearchPersonOpencv>{
      images: [images],
      max_results: max_results,
      min_score: this.min_score,
    }

    const { data } = await this.httpService
      .post<R>(`${this.opencvBaseUrl}/search`, request)
      .catch((e: AxiosError<E>) => {
        throw e.response.data
      })

    console.log(data)

    return data
  }
}
