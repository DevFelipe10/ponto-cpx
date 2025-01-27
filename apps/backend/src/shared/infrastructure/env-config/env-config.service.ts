import { Injectable } from '@nestjs/common'
import { EnvConfig } from './env-config.interface'
import { ConfigService } from '@nestjs/config'
import { join } from 'path'

@Injectable()
export class EnvConfigService implements EnvConfig {
  constructor(private configService: ConfigService) {}

  getApiKey(): string {
    return this.configService.get<string>('API_KEY')
  }
  getApiSecret(): string {
    return this.configService.get<string>('API_SECRET')
  }
  getFaceListId(): string {
    return this.configService.get<string>('FACE_LIST_ID')
  }
  getApiFaceRecognition(): string {
    return this.configService.get<string>('API_FACE_RECOGNITION')
  }
  getAppPort(): number {
    return Number(this.configService.get<number>('PORT'))
  }
  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV')
  }
}
