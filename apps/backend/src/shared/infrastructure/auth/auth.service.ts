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
    const user = await this.usersService.findOne(username, password)

    if (user === undefined) {
      throw new NotFoundException('Usuário não encontrado')
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    }

    return await this.jwtService.signAsync(payload)
  }
}
