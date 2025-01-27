import { Module } from '@nestjs/common'
import { TokenApiFacePlusPlusService } from './face-plus-plus/token-api-face-plus-plus.service'

@Module({
  providers: [
    {
      provide: 'TokenApiInterface',
      useClass: TokenApiFacePlusPlusService,
    },
  ],
})
export class TokenApiModule {}
