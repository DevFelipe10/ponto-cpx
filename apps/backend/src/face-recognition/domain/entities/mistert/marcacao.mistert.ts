import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export type MarcacaoMisterTProps = {
  Versao: string
  MATRICULA: string
  DATA: string
  HORA: string
  FUSOHORAR: string
  IDEVENTO: number
  IPORIGEM: string
  LATITUDE: number
  LONGITUDE: number
  PRECISAO: number
  OBSREG: string
  IsFacialValid: boolean
}

export class MarcacaoMisterT {
  constructor(props: MarcacaoMisterTProps) {
    this.Versao = props.Versao
    this.MATRICULA = props.MATRICULA
    this.DATA = props.DATA
    this.HORA = props.HORA
    this.FUSOHORAR = props.FUSOHORAR
    this.IDEVENTO = props.IDEVENTO
    this.IPORIGEM = props.IPORIGEM
    this.LATITUDE = props.LATITUDE
    this.LONGITUDE = props.LONGITUDE
    this.PRECISAO = props.PRECISAO
    this.OBSREG = props.OBSREG
    this.IsFacialValid = props.IsFacialValid
  }

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

  @ApiPropertyOptional()
  OBSREG: string

  @ApiProperty()
  @IsNotEmpty()
  IsFacialValid: boolean
}
