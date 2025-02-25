import { Module } from '@nestjs/common'
import { EnvConfigService } from './env-config.service'
import { ConfigModule } from '@nestjs/config'
import { join } from 'node:path'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(__dirname, `../../../../.env.${process.env.NODE_ENV}`),
      ],
    }),
  ],
  exports: [EnvConfigService],
  providers: [EnvConfigService],
})
// export class EnvConfigModule extends ConfigModule {
export class EnvConfigModule {
  // static forRoot(options: ConfigModuleOptions = {}): Promise<DynamicModule> {
  //   return super.forRoot({
  //     ...options,
  //     isGlobal: true,
  //     envFilePath: [join(__dirname, `../../../.env.${process.env.NODE_ENV}`)],
  //   })
  // }
}
