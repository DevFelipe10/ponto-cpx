import { Injectable } from '@nestjs/common'
import { AxiosError } from 'axios'
import { EnvConfigService } from 'src/shared/infrastructure/env-config/env-config.service'
import { PersonCreateOpencv, PersonOpencv } from '../types/opencv.person.type'
import { ErrorResponseOpencv } from '../types/opencv.type'
import { OpencvHttpService } from '../opencv-http/opencv-http.service'

@Injectable()
export class OpencvPersonService {
  private apiUrl: string

  constructor(
    private readonly envConfigService: EnvConfigService,
    private readonly httpService: OpencvHttpService,
  ) {
    this.apiUrl = this.envConfigService.getOpencvBaseUrl()
  }

  async getPersonId(personId: string) {
    const { data } = await this.httpService
      .get<PersonOpencv>(`${this.apiUrl}/person/${personId}`)
      .catch((e: AxiosError<ErrorResponseOpencv>) => {
        throw e.response.data
      })

    return data
  }

  // async createPerson(person: PersonCreateOpencv) {
  async createPerson(image_base64: string, id: string) {
    const { data } = await this.httpService
      .post<PersonOpencv>(`${this.apiUrl}/person`, <PersonCreateOpencv>{
        id,
        images: [image_base64],
      })
      .catch((e: AxiosError<ErrorResponseOpencv>) => {
        throw e.response.data
      })

    return data
  }
}
