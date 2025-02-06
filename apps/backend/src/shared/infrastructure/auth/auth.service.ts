import { Injectable, NotFoundException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<string> {
    const user = await this.usersService.findOne(username)
    // const user = this.usersService.getUser()

    if (user === undefined) {
      throw new NotFoundException()
    }

    const payload = { sub: user.userId, username: user.username }

    return await this.jwtService.signAsync(payload)
  }
}
