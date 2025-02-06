import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { MistertController } from './mistert.controller'
import { EnvConfigService } from 'src/shared/infrastructure/env-config/env-config.service'
import { MistertService } from './mistert.service'

@Module({
  imports: [HttpModule],
  controllers: [MistertController],
  providers: [EnvConfigService, MistertService],
})
export class MistertModule {}
