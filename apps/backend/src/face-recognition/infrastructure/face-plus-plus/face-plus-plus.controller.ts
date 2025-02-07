import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common'
import { FastifyReply } from 'fastify'
import { FacePlusPlusService } from './face-plus-plus.service'
import { ResponseApi } from 'src/shared/domain/entities/response-api'
import { HttpService } from '@nestjs/axios'
import { EnvConfigService } from 'src/shared/infrastructure/env-config/env-config.service'

@Controller('face-plus-plus')
export class FacePlusPlusController {
  constructor(
    private readonly facePlusPlusService: FacePlusPlusService,
    private readonly httpService: HttpService,
    private readonly envConfigService: EnvConfigService,
  ) {}

  // Cadastrar face no BD da API
  @Post('faceregister')
  async faceRegister(
    @Body('image_base64') imageBase64: string,
    @Body('userid') userid: string,
    @Res() res: FastifyReply,
  ) {
    try {
      // Detectar faces na imagem
      const detectResult =
        await this.facePlusPlusService.detectFace(imageBase64)

      if (detectResult.face_num !== 1) {
        throw 'Face not detected or multiple faces detected'
      }

      // Set id customizado a imagem - inserir o número de matricula
      await this.facePlusPlusService.setUserId(
        userid,
        detectResult.faces[0].face_token,
      )

      // Adicionar imagem a lista da faces na API
      const addFaceResult = await this.facePlusPlusService.addFace(
        detectResult.faces[0].face_token,
      )

      if (addFaceResult.face_added <= 0) {
        throw 'Error adding face'
      }

      return res.status(HttpStatus.OK).send(<ResponseApi>{
        message: 'Face registered successfully',
        status: HttpStatus.OK,
      })
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send(<ResponseApi>{
        message: error,
        status: HttpStatus.BAD_REQUEST,
      })
    }
  }

  @Post('faceauthenticate')
  async faceAuthenticate(
    @Res() res: FastifyReply,
    @Body('image_base64') imageBase64: string,
    @Body('userid') userId?: string | null,
  ) {
    try {
      // Detectar faces na imagem
      const detectResult =
        await this.facePlusPlusService.detectFace(imageBase64)

      if (detectResult.face_num !== 1) {
        throw 'Face not detected or multiple faces detected'
      }

      // Buscar imagem semelhante na API
      const searchResult = await this.facePlusPlusService.searchFace(
        detectResult.faces[0].face_token,
      )

      if (searchResult.results.length <= 0) {
        throw 'No face encountered'
      }

      // Verifica o nível de "confiança" da imagem buscada
      if (searchResult.isConfidence === false) {
        throw 'The face was not confidence'
      }

      // Caso userId seja passado no body faz a verificação com id da imagem
      if (userId != undefined && userId != '') {
        const isUseridEqual = searchResult.verifyUserId(userId)

        if (isUseridEqual === false) {
          throw `Userid not match Request: ${userId} - API: ${searchResult.results[0].user_id}`
        }
      }

      return res.status(HttpStatus.OK).send(<ResponseApi>{
        message: 'Face authenticated successfully',
        data: {
          confidence: searchResult.results[0].confidence,
          userid: searchResult.results[0].user_id,
        },
        status: HttpStatus.OK,
      })
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send(<ResponseApi>{
        message: error,
        status: HttpStatus.BAD_REQUEST,
      })
    }
  }
}
