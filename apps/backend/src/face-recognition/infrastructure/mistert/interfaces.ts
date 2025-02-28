import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export enum MisterTOperations {
  GET_SETUP = 'GetSetup',
  REGISTER_POINT = 'ExecutaMarcacao',
}

export class EventoGetSetup {
  @ApiProperty({ example: 2 })
  ID: number

  @ApiProperty({ example: 1 })
  IDDM: number

  @ApiProperty({ example: 2 })
  IDTIPOPON: number

  @ApiProperty({ example: 1 })
  SEQUENCIA: string

  @ApiProperty({ example: 'Entrada Manhã' })
  DESCRICAO: string

  @ApiProperty({ example: '' })
  OBSGER: string

  @ApiProperty({ example: 'S' })
  SEAPLICARP: string

  @ApiProperty({ example: 'S' })
  SEAPLICADF: string

  @ApiProperty({ example: 'S' })
  EXIBENOSRE: string

  @ApiProperty({ example: 'S' })
  PODEUSAR: string
}

export class FormatoRel {
  @ApiProperty({ example: 2 })
  ID: number

  @ApiProperty({ example: 1 })
  IDDM: number

  @ApiProperty({ example: '9999' })
  SEQUENCIA: string

  @ApiProperty({ example: 'Relógio Facial' })
  DESCRICAO: string

  @ApiProperty({ example: 'N' })
  EXDESCRI: string

  @ApiProperty({ example: 1 })
  IDFUSOHOR: number

  @ApiProperty({ example: 'N' })
  EXFUSOHOR: string

  @ApiProperty({ example: 'N' })
  EXHORVERAO: string

  @ApiProperty({ example: 1 })
  IDREGDIA: number

  @ApiProperty({ example: 'N' })
  EXREGDIA: string

  @ApiProperty({ example: 'N' })
  HSREGDIA: string

  @ApiProperty({ example: 2 })
  IDEVENTO: number

  @ApiProperty({ example: 'S' })
  EXEVENTO: string

  @ApiProperty({ example: 'N' })
  HSEVENTO: string

  @ApiProperty({ example: 1 })
  IDFATOR: number

  @ApiProperty({ example: 'N' })
  EXFATOR: string

  @ApiProperty({ example: 'N' })
  HSFATOR: string

  @ApiProperty({ example: 2 })
  IDORIGEM: number

  @ApiProperty({ example: 'N' })
  EXORIGEM: string

  @ApiProperty({ example: 'N' })
  HSORIGEM: string

  @ApiProperty({ example: 2 })
  IDIPORIGEM: number

  @ApiProperty({ example: 'N' })
  EXIPORIGEM: string

  @ApiProperty({ example: '594924290120251508202652355327' })
  CHAVE: string

  @ApiProperty({ example: '' })
  OBSGER: string

  @ApiProperty({ example: 'S' })
  PODEUSAR: string
}

export class ResultGetConfig {
  @ApiProperty({ example: true })
  Success: boolean

  @ApiProperty({ example: '' })
  ErrorMsg: string

  @ApiProperty({ example: 'v1.0.0' })
  Versao: string

  @ApiProperty({ example: 'https://example.com/logo.png' })
  URL_Img_Logo: string

  @ApiProperty({ type: FormatoRel })
  FormatoRel: FormatoRel

  @ApiProperty({ example: true })
  HasMatricula?: boolean

  @ApiProperty({ type: [EventoGetSetup] })
  Eventos: EventoGetSetup[]
}

export class ResultPointRegister {
  @ApiProperty()
  Success: boolean

  @ApiPropertyOptional()
  ErrorMsg: string
}

export class MarcacaoMisterT {
  @ApiProperty()
  @IsNotEmpty()
  Versao: string

  @ApiProperty()
  @IsNotEmpty()
  MATRICULA: string

  @ApiProperty()
  @IsNotEmpty()
  DATA: string

  @ApiProperty()
  @IsNotEmpty()
  HORA: string

  @ApiProperty()
  @IsNotEmpty()
  FUSOHORAR: string

  @ApiProperty()
  @IsNotEmpty()
  IDEVENTO: number

  @ApiProperty()
  @IsNotEmpty()
  IPORIGEM: string

  @ApiProperty()
  @IsNotEmpty()
  LATITUDE: number

  @ApiProperty()
  @IsNotEmpty()
  LONGITUDE: number

  @ApiProperty()
  @IsNotEmpty()
  PRECISAO: number

  @ApiProperty()
  @IsNotEmpty()
  OBSREG: string

  @ApiProperty()
  @IsNotEmpty()
  IsFacialValid: boolean
}

export type RequestMisterT = {
  Op: MisterTOperations
  Marcacao: MarcacaoMisterT
}
