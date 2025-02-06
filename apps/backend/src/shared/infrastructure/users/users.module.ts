import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { EnvConfigModule } from '../env-config/env-config.module'

@Module({
  imports: [EnvConfigModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
