import { Body, Controller, Get, Post, Request, Res } from '@nestjs/common'
import { Public } from './auth.guard'
import { AuthService } from './auth.service'
import { FastifyReply } from 'fastify'

type SignInDto = {
  username: string
  password: string
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @Res() res: FastifyReply) {
    const { username, password } = signInDto

    const token = await this.authService.signIn(username, password)

    return res
      .setCookie('token', token, {
        // expires: new Date(Date.now() + 3600000), // 1 hour
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
      })
      .send()
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
