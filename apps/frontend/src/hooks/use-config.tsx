import api from '@/api'
import { AxiosError } from 'axios'
import { ResponseApi, ResultGetConfig } from './use-mistert'
import { useApiAuth } from './use-api-auth'
import { useState } from 'react'

export const useConfig = () => {
  const env = import.meta.env

  const { getToken } = useApiAuth()

  const [progress, setProgress] = useState<number>(10)
  const [loading, setLoading] = useState<boolean>(true)
  const [configMisterT, setConfigMisterT] = useState<
    ResultGetConfig | undefined
  >(undefined)

  const getTokenRegistroPonto = async () => {
    try {
      return await getToken(env.VITE_API_USERNAME, env.VITE_API_PASSWORD)
    } catch (error) {
      return error as AxiosError
    }
  }
  const getConfgiMisterT = async () => {
    // Set loading como true
    setLoading(true)

    // Faz o request
    const { data } = await api
      .get<ResponseApi<ResultGetConfig>>(`${env.VITE_API_URL_MISTERT}/config`, {
        onDownloadProgress: progressEvent => {
          if (progressEvent.total != undefined) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            )

            setProgress(percentCompleted)
          }
        },
      })
      .then(res => res.data)
      .catch(
        (err: AxiosError<ResponseApi<ResultGetConfig>>) => err.response!.data,
      )

    // Set loading como false
    setLoading(false)
    setConfigMisterT(data)

    return data
  }

  return {
    getTokenRegistroPonto,
    getConfgiMisterT,
    progress,
    loading,
    setLoading,
    configMisterT,
  }
}
