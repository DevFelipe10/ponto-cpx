import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common'
import { MistertService } from './mistert.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ResponseApi } from 'src/shared/domain/entities/response-api'
import { MarcacaoMisterT } from './interfaces'
import { Public } from 'src/shared/infrastructure/auth/auth.guard'

@Controller('mistert')
export class MistertController {
  constructor(private readonly mistertService: MistertService) {}

  @Get('getconfig')
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
