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
import { OpencvService } from './opencv.service'

@Injectable()
export class OpencvSearchService {
  private opencvBaseUrl: string
  private min_score: number

  constructor(
    private readonly envConfigService: EnvConfigService,
    private readonly httpService: OpencvHttpService,
    private readonly opencvService: OpencvService,
  ) {
    this.opencvBaseUrl = this.envConfigService.getOpencvBaseUrl()
    this.min_score = this.envConfigService.getMinimumScoreSearch()
  }

  async detect<R = SearchDetectOpencv[], E = ErrorResponseOpencv>(
    image: string,
  ) {
    const { data } = await this.httpService
      .post<R>(`${this.opencvBaseUrl}/detect`, {
        image: this.opencvService.wrapBase64(image),
      })
      .catch((e: AxiosError<E>) => {
        throw e.response.data
      })

    return data
  }

  // Busca um ou mais imagens da pessoa
  async searchFace<R = PersonOpencv[], E = ErrorResponseOpencv>(
    image: string,
    max_results: number = 2,
  ) {
    const request = <SearchPersonOpencv>{
      images: [this.opencvService.wrapBase64(image)],
      max_results: max_results,
      min_score: this.min_score,
    }

    const { data } = await this.httpService
      .post<R>(`${this.opencvBaseUrl}/search`, request)
      .catch((e: AxiosError<E>) => {
        throw e.response.data
      })

    return data
  }
}
