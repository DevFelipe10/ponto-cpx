import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  SetMetadata,
} from '@nestjs/common'
import { EnvConfigService } from '../env-config/env-config.service'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'
import { FastifyRequest } from 'fastify'

export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly envConfigService: EnvConfigService,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // use Public() em controllers que não precisam de autenticação
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest<FastifyRequest>()
    const token = this.extractTokenFromCookie(request)

    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.envConfigService.getJwtSecret(),
      })

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload
    } catch (e) {
      throw new UnauthorizedException(e.message)
    }
    return true
  }

  // private extractToken(request: FastifyRequest): string | undefined {
  //   const token = this.extractTokenFromHeader(request)
  //   return token === undefined ? this.extractTokenFromCookie(request) : token
  // }

  // private extractTokenFromHeader(request: FastifyRequest): string | undefined {
  //   const [token] =
  //     (request.headers.authorization &&
  //       request.headers.authorization.split(' ')) ??
  //     []

  //   return token
  // }

  private extractTokenFromCookie(request: FastifyRequest): string | undefined {
    const [token] =
      (request.cookies.token && request.cookies.token.split(' ')) ?? []

    return token
  }
}
