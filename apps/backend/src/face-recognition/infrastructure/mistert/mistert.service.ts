import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { catchError, firstValueFrom } from 'rxjs'
import { EnvConfigService } from 'src/shared/infrastructure/env-config/env-config.service'
import iconv from 'iconv-lite'
import {
  MarcacaoMisterT,
  MisterTOperations,
  RequestMisterT,
  ResultGetConfig,
  ResultPointRegister,
} from './interfaces'
import { User } from 'src/shared/domain/entities/auth/user.auth'

@Injectable()
export class MistertService {
  constructor(
    private readonly httpService: HttpService,
    private readonly envConfigService: EnvConfigService,
  ) {}

  private parameterToJson(
    operation: MisterTOperations,
    marcacao?: MarcacaoMisterT,
  ): string {
    const parameterMT = <RequestMisterT>{
      Op: operation,
      Marcacao: marcacao,
    }

    return Buffer.from(JSON.stringify(parameterMT)).toString('base64')
  }

  // Chamar o endpoint de configuração do MisterT para o webponto
  async getConfig(): Promise<ResultGetConfig> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<string>(`${this.envConfigService.getMisterTBaseUrl()}`, {
          // Definir tipo binary e evita conversões incorretas
          responseType: 'arraybuffer',
          responseEncoding: 'utf-8',
          params: {
            SS: 'v3m4q8r2u9b7e3p7m5w9b4h2w5n2h7',
            NH: '-1',
            P: this.parameterToJson(MisterTOperations.GET_SETUP),
          },
        })
        .pipe(
          catchError(error => {
            console.log(error.response)
            throw 'An error happened when trying to get the webponto configuration'
          }),
        ),
    )

    let resultMisterT: ResultGetConfig = <ResultGetConfig>{}

    try {
      // Converter binary para latin1 removendo � da string
      const dataLatin1 = Buffer.from(data, 'binary')

      // Decode de latin1 to utf8 format
      const dataUtf8 = iconv.decode(dataLatin1, 'latin1')

      resultMisterT = JSON.parse(dataUtf8) as ResultGetConfig
    } catch (e) {
      throw 'An error happened when trying to parse the JSON - is not valid JSON - getConfigMisterT()'
    }

    return resultMisterT
  }

  async getUsersApi(): Promise<User[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<string>(`${this.envConfigService.getMisterTBaseUrl()}`, {
          // Definir tipo binary e evita conversões incorretas
          responseType: 'arraybuffer',
          responseEncoding: 'utf-8',
          params: {
            SS: 'c4z6h3x4s3b8p9k3t2x3s6g5q8g3t4',
            NH: '-1',
          },
        })
        .pipe(
          catchError(error => {
            console.log(error)
            console.log(error.response)
            throw 'An error happened when trying to getUsersApi()'
          }),
        ),
    )

    let resultMisterT: User[] = []

    try {
      // Converter binary para latin1 removendo � da string
      const dataLatin1 = Buffer.from(data, 'binary')

      // Decode de latin1 to utf8 format
      const dataUtf8 = iconv.decode(dataLatin1, 'latin1')

      resultMisterT = JSON.parse(dataUtf8) as User[]
    } catch (e) {
      throw 'An error happened when trying to parse the JSON - is not valid JSON - getUsersApi()'
    }

    return resultMisterT
  }

  async pointRegisterMisterT(
    marcacao: MarcacaoMisterT,
  ): Promise<ResultPointRegister> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<string>(`${this.envConfigService.getMisterTBaseUrl()}`, {
          // Definir tipo binary e evita conversões incorretas
          responseType: 'arraybuffer',
          responseEncoding: 'utf-8',
          params: {
            SS: 'v3m4q8r2u9b7e3p7m5w9b4h2w5n2h7',
            NH: '-1',
            P: this.parameterToJson(MisterTOperations.REGISTER_POINT, marcacao),
          },
        })
        .pipe(
          catchError(error => {
            console.log(error.response)
            throw 'An error happened when trying to register point'
          }),
        ),
    )

    let resultMisterT: ResultPointRegister = <ResultPointRegister>{}

    try {
      // Converter binary para latin1 removendo � da string
      const dataLatin1 = Buffer.from(data, 'binary')

      // Decode de latin1 to utf8 format
      const dataUtf8 = iconv.decode(dataLatin1, 'latin1')

      resultMisterT = JSON.parse(dataUtf8) as ResultPointRegister
    } catch (e) {
      throw 'An error happened when trying to parse the JSON - is not valid JSON - pointRegisterMisterT'
    }

    return resultMisterT
  }
}
