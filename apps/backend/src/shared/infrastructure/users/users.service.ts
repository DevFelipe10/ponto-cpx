import { Injectable } from '@nestjs/common'
import { EnvConfigService } from '../env-config/env-config.service'

export type User = {
  userId: number
  username: string
  password: string
}

@Injectable()
export class UsersService {
  private readonly user?: User

  constructor(private readonly envConfigService: EnvConfigService) {
    this.user = <User>{
      userId: 1,
      username: this.envConfigService.getAuthUsername(),
      password: this.envConfigService.getAuthPassword(),
    }
  }

  getUser() {
    return this.user
  }

  async findOne(username: string): Promise<User | undefined> {
    if (username === this.user.username) {
      return this.user
    }
  }
}
