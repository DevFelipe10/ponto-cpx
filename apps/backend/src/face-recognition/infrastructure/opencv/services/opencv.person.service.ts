import { Injectable } from '@nestjs/common'
import { AxiosError } from 'axios'
import { EnvConfigService } from 'src/shared/infrastructure/env-config/env-config.service'
import {
  PersonCreateOpencv,
  PersonOpencv,
  SearchPersonResultOpencv,
} from '../types/opencv.person.type'
import { ErrorResponseOpencv } from '../types/opencv.type'
import { OpencvHttpService } from '../opencv-http/opencv-http.service'
import { OpencvService } from '../opencv.service'
import { PageQuery } from 'src/shared/domain/entities/pagination/page-query'
import {
  ListSearchPerson,
  PersonPaginate,
  SearchPersonResult,
} from 'src/shared/domain/entities/pagination/list-search-person'

@Injectable()
export class OpencvPersonService {
  private apiUrl: string

  constructor(
    private readonly envConfigService: EnvConfigService,
    private readonly httpService: OpencvHttpService,
    private readonly opencvService: OpencvService,
  ) {
    this.apiUrl = this.envConfigService.getOpencvBaseUrl()
  }

  async getPersonById(personId: string): Promise<PersonOpencv | null> {
    const { data } = await this.httpService
      .get<PersonOpencv | null>(`${this.apiUrl}/person/${personId}`)
      .catch<Promise<null>>((e: AxiosError<ErrorResponseOpencv>) => {
        return null
      })
    console.log(data)

    return data
  }

  async getPersons(pageQueries: PageQuery): Promise<ListSearchPerson> {
    const { data } = await this.httpService
      .get<SearchPersonResultOpencv | null>(`${this.apiUrl}/persons`, {
        skip: pageQueries.skip,
        take: pageQueries.limit,
      })
      .catch<Promise<null>>((e: AxiosError<ErrorResponseOpencv>) => {
        return null
      })

    const searchPerson = new SearchPersonResult(
      data.count,
      data.persons.map(
        person =>
          new PersonPaginate(
            person.name,
            person.name,
            person.create_date,
            person.modified_date,
          ),
      ),
    )

    return new ListSearchPerson(searchPerson, pageQueries.limit)
  }

  // async createPerson(person: PersonCreateOpencv) {
  async createPerson(image_base64: string, id: string) {
    const { data } = await this.httpService
      .post<PersonOpencv>(`${this.apiUrl}/person`, <PersonCreateOpencv>{
        name: id,
        images: [this.opencvService.wrapBase64(image_base64)],
      })
      .catch((e: AxiosError<ErrorResponseOpencv>) => {
        throw e.response.data
      })

    return data
  }
}
