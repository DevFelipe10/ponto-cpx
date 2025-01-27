import { Injectable } from '@nestjs/common'
import { TokenInterface } from '../token-interface.interface'
import { Token } from 'src/shared/domain/entities/token'
// import { EnvConfigService } from '../../env-config/env-config.service'

@Injectable()
export class TokenApiFacePlusPlusService implements TokenInterface {
  // constructor(private readonly envConfigService: EnvConfigService) {}

  async autenticate(): Promise<Token> {
    return new Token()
    // const apiKey = this.envConfigService.getApiKey()
    // const apiSecret = this.envConfigService.getApiSecret()

    // return new Token(apiKey, apiSecret)
  }
}
