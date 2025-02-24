import { Injectable, Logger } from '@nestjs/common'
import { FaceRecognitionInterface } from '../face-recognition.interface'
import { EnvConfigService } from 'src/shared/infrastructure/env-config/env-config.service'
import { HttpService } from '@nestjs/axios'
import { catchError, delay, firstValueFrom } from 'rxjs'
import { AxiosError } from 'axios'
import {
  DetectResultEntity,
  DetectResultEntityFactory,
} from 'src/shared/domain/entities/face-recognition/face-plus-plus/detect-result.entity'
import { ResultFaceRecognition } from 'src/shared/domain/entities/face-recognition/face-plus-plus/result-face-recognition.entity'
import {
  SearchFaceResultEntity,
  SearchFaceResultEntityFactory,
} from 'src/shared/domain/entities/face-recognition/face-plus-plus/search-face-result.entity'
import {
  SetUserIdResultEntity,
  SetUserIdResultFactory,
} from 'src/shared/domain/entities/face-recognition/face-plus-plus/set-user-id-result.entity'
import {
  AddFaceResultEntity,
  AddFaceResultEntityFactory,
} from 'src/shared/domain/entities/face-recognition/face-plus-plus/add-face-result.entity'

type ErrorFacePlusPlusService = {
  error_message: string
}

@Injectable()
export class FacePlusPlusService
  implements FaceRecognitionInterface<ResultFaceRecognition>
{
  private readonly logger = new Logger(FacePlusPlusService.name)

  constructor(
    // private readonly tokenApiService: TokenApiFacePlusPlusService,
    private readonly httpService: HttpService,
    private readonly envConfigService: EnvConfigService,
  ) {}

  // async detectFaces(imageData: string): Promise<DetectResultPlusPlusEntity> {
  async detectFace(imageData: string): Promise<DetectResultEntity> {
    const { data } = await firstValueFrom(
      this.httpService
        .post<DetectResultEntity>(
          `${this.envConfigService.getFaceppBaseUrl()}/detect`,
          {
            api_key: this.envConfigService.getFaceppApiKey(),
            api_secret: this.envConfigService.getFaceppApiSecret(),
            image_base64: imageData,
          },
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        )
        .pipe(
          delay(3000),
          catchError((error: AxiosError<ErrorFacePlusPlusService>) => {
            this.logger.error(error.response.data)
            throw error.response.data.error_message + ' - detectFaces'
            // throw 'An error happened when trying to detect the face'
          }),
        ),
    )

    return DetectResultEntityFactory.create(data)
  }

  async searchFace(faceId: string): Promise<SearchFaceResultEntity> {
    const { data } = await firstValueFrom(
      this.httpService
        .post<SearchFaceResultEntity>(
          `${this.envConfigService.getFaceppBaseUrl()}/search`,
          {
            api_key: this.envConfigService.getFaceppApiKey(),
            api_secret: this.envConfigService.getFaceppApiSecret(),
            outer_id: this.envConfigService.getFaceppListId(),
            face_token: faceId,
            return_result_count: 1,
          },
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        )
        .pipe(
          delay(3000),
          catchError((error: AxiosError<ErrorFacePlusPlusService>) => {
            this.logger.error(error.response.data)
            throw error.response.data.error_message + ' - searchFace'
            // throw 'An error happened when searching for the face'
          }),
        ),
    )

    return SearchFaceResultEntityFactory.create(data)
  }

  async setUserId(
    userId: string,
    faceId: string,
  ): Promise<SetUserIdResultEntity> {
    const { data } = await firstValueFrom(
      this.httpService
        .post<SetUserIdResultEntity>(
          `${this.envConfigService.getFaceppBaseUrl()}/face/setuserid`,
          {
            api_key: this.envConfigService.getFaceppApiKey(),
            api_secret: this.envConfigService.getFaceppApiSecret(),
            user_id: userId,
            face_token: faceId,
          },
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        )
        .pipe(
          delay(3000),
          catchError((error: AxiosError<ErrorFacePlusPlusService>) => {
            this.logger.error(error.response.data)
            // throw 'An error happened when setting the user ID'
            throw error.response.data.error_message + ' - setUserId'
          }),
        ),
    )

    return SetUserIdResultFactory.create(data)
  }

  async addFace(faceId: string): Promise<AddFaceResultEntity> {
    const { data } = await firstValueFrom(
      this.httpService
        .post<AddFaceResultEntity>(
          `${this.envConfigService.getFaceppBaseUrl()}/faceset/addface`,
          {
            api_key: this.envConfigService.getFaceppApiKey(),
            api_secret: this.envConfigService.getFaceppApiSecret(),
            outer_id: this.envConfigService.getFaceppListId(),
            face_tokens: faceId,
          },
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        )
        .pipe(
          delay(3000),
          catchError((error: AxiosError<ErrorFacePlusPlusService>) => {
            this.logger.error(error.response.data)
            // throw 'An error happened when adding the face to the face list'
            throw error.response.data.error_message + ' - addFace'
          }),
        ),
    )

    return AddFaceResultEntityFactory.create(data)
  }
}
