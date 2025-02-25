import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Post,
  Req,
  Request,
  Res,
} from '@nestjs/common'
import { Public } from './auth.guard'
import { AuthService } from './auth.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger'
import { HttpStatusCode } from 'axios'
import { never } from 'rxjs'
import { Role } from 'src/shared/domain/entities/roles/role.enum'
import { Roles } from 'src/shared/domain/entities/roles/roles.decorator'
import { EnvConfigService } from '../env-config/env-config.service'

export class SignInDto {
  @ApiProperty()
  username: string
  @ApiProperty()
  password: string
}

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private envConfigService: EnvConfigService,
  ) {}

  @ApiNotFoundResponse({
    description: 'User not found',
    example: {
      message: 'Usuário não encontrado',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @ApiCreatedResponse({ description: 'User created successfully' })
  @Public()
  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @Res() res: FastifyReply) {
    const { username, password } = signInDto

    const token = await this.authService.signIn(username, password)

    return res
      .setCookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        // expires: new Date(new Date().getTime() + 84600),
        maxAge: 86400,
      })
      .send({ token: token })
  }

  @Roles(Role.REGISTRO_PONTO)
  @Get('logout')
  logout(@Res() res: FastifyReply) {
    return res
      .clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
      })
      .send({ message: 'Token removido' })
  }

  @ApiCookieAuth()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
