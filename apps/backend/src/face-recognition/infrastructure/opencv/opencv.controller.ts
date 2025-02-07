import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common'
import { OpencvPersonService } from './services/opencv.person.service'
import { OpencvSearchService } from './opencv.search.service'
import { PersonCreateOpencv } from './types/opencv.person.type'
import { FastifyReply } from 'fastify'
import { HttpStatusCode } from 'axios'
import { ResponseApi } from 'src/shared/domain/entities/response-api'

@Controller('opencv')
export class OpencvController {
  constructor(
    private readonly opencvPersonService: OpencvPersonService,
    private readonly opencvSearchService: OpencvSearchService,
  ) {}

  @Post('faceregister')
  async faceRegister(
    @Body('image_base64') imageBase64: string,
    @Body('userid') id: string,
    @Res() res: FastifyReply,
  ) {
    try {
      const detectResult = await this.opencvSearchService.detect(imageBase64)

      if (detectResult.length < 0) {
        throw 'Face not found in image'
      }

      await this.opencvPersonService.createPerson(imageBase64, id)

      return res.status(HttpStatus.CREATED).send(<ResponseApi>{
        status: HttpStatus.CREATED,
        message: 'Face registered successfully',
        // data: person,
      })
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send(<ResponseApi>{
        status: HttpStatus.BAD_REQUEST,
        error: error.message,
        message: 'Error registering face',
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
      const detectResult = await this.opencvSearchService.detect(imageBase64)

      if (detectResult.length < 0 || detectResult.length > 1) {
        throw 'Face not detected or multiple faces detected'
      }

      const searchResult =
        await this.opencvSearchService.searchFace(imageBase64)

      if (searchResult.length <= 0) {
        throw 'No equal face encountered'
      }

      // // Verifica o nível de "confiança" da imagem buscada
      // if (searchResult[0].score < 0.8) {
      //   throw 'The face was not confidence'
      // }

      // Caso userId seja passado no body faz a verificação com id da imagem
      if (userId != undefined && userId != '') {
        const isUseridEqual = userId === searchResult[0].id

        if (isUseridEqual === false) {
          throw `Userid not match Request: ${userId} - API: ${searchResult[0].id}`
        }
      } // return search

      return res.status(HttpStatus.OK).send(<ResponseApi>{
        message: 'Face authenticated successfully',
        data: {
          confidence: searchResult[0].score,
          userid: searchResult[0].id,
        },
        status: HttpStatus.OK,
      })
    } catch (error) {
      console.error(error)

      return res.status(HttpStatus.BAD_REQUEST).send(<ResponseApi>{
        message: error,
        status: HttpStatus.BAD_REQUEST,
      })
    }
  }
}
