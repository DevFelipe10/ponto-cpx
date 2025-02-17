import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { MistertController } from './mistert.controller'
import { MistertService } from './mistert.service'
import { EnvConfigModule } from 'src/shared/infrastructure/env-config/env-config.module'

@Module({
  imports: [EnvConfigModule, HttpModule],
  controllers: [MistertController],
  providers: [MistertService],
  exports: [MistertService],
})
export class MistertModule {}
