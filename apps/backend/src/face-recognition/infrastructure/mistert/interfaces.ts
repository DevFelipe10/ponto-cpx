export enum MisterTOperations {
  GET_SETUP = 'GetSetup',
  REGISTER_POINT = 'ExecutaMarcacao',
}

export type EventoGetSetup = {
  ID: number
  IDDM: number
  IDTIPOPON: number
  SEQUENCIA: string
  DESCRICAO: string
  OBSGER: string
  SEAPLICARP: string
  SEAPLICADF: string
  EXIBENOSRE: string
  PODEUSAR: string
}

export type FormatoRel = {
  ID: number
  IDDM: number
  SEQUENCIA: string
  DESCRICAO: string
  EXDESCRI: string
  IDFUSOHOR: number
  EXFUSOHOR: string
  EXHORVERAO: string
  IDREGDIA: number
  EXREGDIA: string
  HSREGDIA: string
  IDEVENTO: number
  EXEVENTO: string
  HSEVENTO: string
  IDFATOR: number
  EXFATOR: string
  HSFATOR: string
  IDORIGEM: number
  EXORIGEM: string
  HSORIGEM: string
  IDIPORIGEM: number
  EXIPORIGEM: string
  CHAVE: string
  OBSGER: string
  PODEUSAR: string
}

export type ResultGetConfig = {
  Success: boolean
  ErrorMsg: string
  Versao: string
  URL_Img_Logo: string
  FormatoRel: FormatoRel
  HasMatricula?: boolean
  Eventos: EventoGetSetup[]
}

export type ResultPointRegister = {
  Success: boolean
  ErrorMsg: string
}

export type MarcacaoMisterT = {
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

export type RequestMisterT = {
  Op: MisterTOperations
  Marcacao: MarcacaoMisterT
}
