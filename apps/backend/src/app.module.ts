import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { ApiService } from './shared/infrastructure/api-client/api.service'
import { HttpModule } from '@nestjs/axios'
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module'
import { FacePlusPlusModule } from './face-recognition/infrastructure/face-plus-plus/face-plus-plus.module'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'frontend', 'dist'),
    }),
    HttpModule,
    EnvConfigModule,
    FacePlusPlusModule,
  ],
  providers: [ApiService],
})
export class AppModule {}
