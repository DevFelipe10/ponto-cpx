import axios, { AxiosError, AxiosResponse } from 'axios'
import { ResponseApi } from './use-mistert'

export type FaceAuthenticateResponse = {
  confidence: number
  userid: string
}

export const useFaceAuthentication = () => {
  const env = import.meta.env

  const faceRegister = async (registrationId: string, imageSrc: string) => {
    const { data } = await axios.post<ResponseApi>(
      `${env.VITE_API_URL_FACE}/faceregister`,
      {
        userid: registrationId,
        image_base64: imageSrc,
      },
    )
    // .then((value: AxiosResponse<ResponseAddFace>) => value.data)
    // .catch(
    //   (err: AxiosError<ResponseAddFace>) =>
    //     err.response?.data as ResponseAddFace
    // );

    return data
  }

  const faceAuthenticate = async (userId: string, imageSrc: string) => {
    const res = await axios
      .post<ResponseApi<FaceAuthenticateResponse>>(
        `${env.VITE_API_URL_FACE}/faceauthenticate`,
        {
          userid: userId,
          image_base64: imageSrc,
        },
      )
      .then(
        (value: AxiosResponse<ResponseApi<FaceAuthenticateResponse>>) =>
          value.data,
      )
      .catch(
        (error: AxiosError<ResponseApi<FaceAuthenticateResponse>>) =>
          error.response?.data as ResponseApi<FaceAuthenticateResponse>,
      )

    return res
  }
  return { faceAuthenticate, faceRegister }
}
