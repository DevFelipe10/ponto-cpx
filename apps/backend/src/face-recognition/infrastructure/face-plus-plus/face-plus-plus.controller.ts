import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common'
import { FastifyReply } from 'fastify'
import { FacePlusPlusService } from './face-plus-plus.service'
import { SearchFaceResultEntity } from 'src/shared/domain/entities/face-recognition/search-face-result.entity'
import { ResponseApi } from 'src/shared/domain/entities/response-api'

@Controller('face-plus-plus')
export class FacePlusPlusController {
  constructor(private readonly facePlusPlusService: FacePlusPlusService) {}

  // Cadastrar face no BD da API
  @Post('registerface')
  async registerFace(
    @Body('image_base64') imageBase64: string,
    @Body('userid') userid: string,
    @Res() res: FastifyReply,
  ) {
    try {
      // Detectar faces na imagem
      const detectResult =
        await this.facePlusPlusService.detectFaces(imageBase64)

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
    @Body('image_base64') imageBase64: string,
    @Body('userid') userid: string,
    @Res() res: FastifyReply,
  ) {
    try {
      // Detectar faces na imagem
      const detectResult =
        await this.facePlusPlusService.detectFaces(imageBase64)

      if (detectResult.face_num !== 1) {
        throw 'Face not detected or multiple faces detected'
      }

      // Buscar imagem semelhante na API
      const searchResult: SearchFaceResultEntity =
        await this.facePlusPlusService.searchFace(
          detectResult.faces[0].face_token,
          // 'a3b58fd0079df1c0d436b87093e00c51',
        )

      if (searchResult.results.length <= 0) {
        throw 'No face encountered'
      }

      // Verifica o nível de "confiança" da imagem buscada
      if (searchResult.isConfidence === false) {
        throw 'The face was not confidence'
      }

      const isUseridEqual = searchResult.verifyUserId(userid)

      if (isUseridEqual === false) {
        throw `Userid not match Request: ${userid} - API: ${searchResult.results[0].user_id}`
      }

      return res.status(HttpStatus.OK).send(<ResponseApi>{
        message: 'Face authenticated successfully',
        data: {
          // face_token: searchResult.results[0].face_token,
          confidence: searchResult.results[0].confidence,
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
