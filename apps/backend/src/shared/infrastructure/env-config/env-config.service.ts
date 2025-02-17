import { Injectable } from '@nestjs/common'
import { EnvConfig } from './env-config.interface'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EnvConfigService implements EnvConfig {
  constructor(private configService: ConfigService) {}

  getAppPort(): number {
    return Number(this.configService.get<number>('PORT'))
  }
  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV')
  }

  // JWT
  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET')
  }
  getJwtExpiresIn(): string {
    return this.configService.get<string>('JWT_EXPIRES_IN')
  }

  // MISTER T
  getMisterTBaseUrl(): string {
    return this.configService.get<string>('MISTER_T_BASE_URL')
  }

  // FACE++
  getFaceppBaseUrl(): string {
    return this.configService.get<string>('FACEPP_BASE_URL')
  }
  getFaceppApiKey(): string {
    return this.configService.get<string>('FACEPP_API_KEY')
  }
  getFaceppApiSecret(): string {
    return this.configService.get<string>('FACEPP_API_SECRET')
  }
  getFaceppListId(): string {
    return this.configService.get<string>('FACEPP_FACE_LIST_ID')
  }

  // AZURE
  getAzureBaseUrl(): string {
    return this.configService.get<string>('AZURE_BASE_URL')
  }
  getAzureApiKey(): string {
    return this.configService.get<string>('AZURE_API_KEY')
  }

  // OPENCV
  getOpencvBaseUrl(): string {
    return this.configService.get<string>('OPENCV_BASE_URL')
  }
  getOpencvApiKey(): string {
    return this.configService.get<string>('OPENCV_API_KEY')
  }
}
