import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common'
import { MistertService } from './mistert.service'
import { FastifyReply } from 'fastify'
import { ResponseApi } from 'src/shared/domain/entities/response-api'
import { MarcacaoMisterT } from './interfaces'
import { Roles } from 'src/shared/domain/entities/roles/roles.decorator'
import { Role } from 'src/shared/domain/entities/roles/role.enum'

@Controller('mistert')
export class MistertController {
  constructor(private readonly mistertService: MistertService) {}

  @Get('getconfig')
  @Roles(Role.REGISTRO_PONTO)
  async getconfig(@Res() res: FastifyReply) {
    try {
      const result = await this.mistertService.getConfig()

      if (result.Success === false) {
        throw result.ErrorMsg
      }

      return res.status(HttpStatus.OK).send(<ResponseApi>{
        status: HttpStatus.OK,
        message: 'MisterT setup fetched successfully',
        data: result,
      })
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send(<ResponseApi>{
        status: HttpStatus.BAD_REQUEST,
        message: 'Error getting MisterT setup',
        error: e.toString(),
      })
    }
  }

  @Post('pointregister')
  @Roles(Role.REGISTRO_PONTO)
  async pointRegisterMisterT(
    @Body() marcacao: MarcacaoMisterT,
    @Res() res: FastifyReply,
  ) {
    try {
      // envio do JSON para registrar o ponto
      const result = await this.mistertService.pointRegisterMisterT(marcacao)

      if (result.Success === false) {
        throw result.ErrorMsg
      }

      return res.status(HttpStatus.OK).send(<ResponseApi>{
        status: HttpStatus.OK,
        message: 'MisterT point registered successfully',
        data: result,
      })
    } catch (e) {
      console.error(e)
      res.status(HttpStatus.BAD_REQUEST).send(<ResponseApi>{
        status: HttpStatus.BAD_REQUEST,
        message: 'Error registering point',
        error: e.toString(),
      })
    }
  }
}
