import { Injectable } from '@nestjs/common'
import { AxiosHeaders } from 'axios'
import { EnvConfigService } from 'src/shared/infrastructure/env-config/env-config.service'

@Injectable()
export class OpencvService {
  // private apiKey: string
  // constructor(private readonly envConfigService: EnvConfigService) {
  //   this.apiKey = this.envConfigService.getOpencvApiKey()
  // }
  // headerApi(): AxiosHeaders {
  //   return new AxiosHeaders({
  //     'Content-Type': 'application/json',
  //     'X-API-KEY': this.apiKey,
  //   })
  // }

  wrapBase64(base64: Base64URLString) {
    return base64.split(',')[1] as Base64URLString
  }
}
