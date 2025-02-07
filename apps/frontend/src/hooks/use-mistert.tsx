import axios, { AxiosError, HttpStatusCode } from 'axios'
import { useState } from 'react'
// import { useAuthentication } from "./use-authentication-api";

type EventoGetSetup = {
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

type FormatoRel = {
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

export type ResponseApi<T = undefined> = {
  status: HttpStatusCode
  message?: string
  error?: string
  data?: T
}

export type ResultGetConfig = {
  Success: boolean
  ErrorMsg: string
  Versao: string
  URL_Img_Logo: string
  FormatoRel: FormatoRel
  Eventos: EventoGetSetup[]
}

export type ResultPointRegister = {
  success: boolean
  errormsg: string
}

export type MarcacaoMisterT = {
  Versao: string
  MATRICULA?: string
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

export const useMisterT = () => {
  const env = import.meta.env

  // const { signIn } = useAuthentication();

  // TODO: Add progress state to track download progress and update it in the UI.
  const [progress, setProgress] = useState<number>(10)

  const getConfgiMisterT = async (): Promise<ResponseApi<ResultGetConfig>> => {
    // await signIn();

    const { data } = await axios
      .get<ResponseApi<ResultGetConfig>>(
        `${env.VITE_API_URL_MISTERT}/getconfig`,
        {
          onDownloadProgress: progressEvent => {
            if (progressEvent.total != undefined) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              )

              setProgress(percentCompleted)
            }
          },
        },
      )
      .catch(err => err)

    return data
  }

  const pointRegisterMisterT = async (
    body: MarcacaoMisterT,
  ): Promise<ResponseApi<ResultPointRegister>> => {
    const { data } = await axios
      .post<ResponseApi<ResultPointRegister>>(
        `${env.VITE_API_URL_MISTERT}/pointregister`,
        body,
        // {
        //   onDownloadProgress: (progressEvent) => {
        //     if (progressEvent.total != undefined) {
        //       const percentCompleted = Math.round(
        //         (progressEvent.loaded * 100) / progressEvent.total
        //       );

        //       setProgress(percentCompleted);
        //     }
        //   },
        // }
      )
      .catch((err: AxiosError<ResponseApi<ResultPointRegister>>) => {
        console.log('error: ' + err.response)
        return err.response!
      })

    console.log(data)

    return data
  }

  return { progress, pointRegisterMisterT, getConfgiMisterT }
}
