import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common'
import { MistertService } from './mistert.service'
import { FastifyReply } from 'fastify'
import { ResponseApi } from 'src/shared/domain/entities/response-api'
import {
  MarcacaoMisterT,
  ResultGetConfig,
  ResultPointRegister,
} from './interfaces'
import { Roles } from 'src/shared/domain/entities/roles/roles.decorator'
import { Role } from 'src/shared/domain/entities/roles/role.enum'
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger'

@Controller('mistert')
export class MistertController {
  constructor(private readonly mistertService: MistertService) {}

  @ApiExtraModels(ResponseApi, ResultGetConfig)
  @ApiOkResponse({
    description: 'Retorna as configurações do MisterT',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseApi) }, // Define o esquema base
        {
          properties: {
            data: { $ref: getSchemaPath(ResultGetConfig) }, // Define o tipo correto de `data`
          },
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    description: 'Parâmetros inválidos',
    type: ResponseApi,
  })
  @Get('config')
  @Roles(Role.REGISTRO_PONTO)
  async getconfig(@Res() res: FastifyReply) {
    try {
      const result = await this.mistertService.getConfig()

      if (result.Success === false) {
        throw result.ErrorMsg
      }

      res.status(HttpStatus.BAD_REQUEST).send(<ResponseApi>{
        status: HttpStatus.BAD_REQUEST,
        message: 'Error getting MisterT setup',
        error: 'teste',
      })
      // return res.status(HttpStatus.OK).send(<ResponseApi>{
      //   status: HttpStatus.OK,
      //   message: 'MisterT setup fetched successfully',
      //   data: result,
      // })
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send(<ResponseApi>{
        status: HttpStatus.BAD_REQUEST,
        message: 'Error getting MisterT setup',
        error: e.toString(),
      })
    }
  }

  @ApiExtraModels(ResponseApi, ResultPointRegister)
  @ApiOkResponse({
    description: 'Retorna o resultado do registro do ponto',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseApi) }, // Define o esquema base
        {
          properties: {
            data: { $ref: getSchemaPath(ResultPointRegister) }, // Define o tipo correto de `data`
          },
        },
      ],
    },
  })
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
