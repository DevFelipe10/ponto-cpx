import axios from "axios";

export type ResponseApi<T = undefined> = {
  message?: string;
  error?: string;
  data?: T;
  status: number;
};

export type FaceAuthenticateResponse = {
  face_token: string;
  confidence: number;
};

export class FaceDetectService {
  private env = import.meta.env;

  async faceRegister(registrationId: string, imageSrc: string) {
    const res = await axios.post<ResponseApi>(
      `${this.env.VITE_BASE_URL_API}/registerface`,
      {
        userid: registrationId,
        image_base64: imageSrc,
      }
    );
    // .then((value: AxiosResponse<ResponseAddFace>) => value.data)
    // .catch(
    //   (err: AxiosError<ResponseAddFace>) =>
    //     err.response?.data as ResponseAddFace
    // );

    return res.data;
  }

  async faceAuthenticate(userId: string, imageSrc: string) {
    const res = await axios.post<ResponseApi<FaceAuthenticateResponse>>(
      `${this.env.VITE_BASE_URL_API}/faceauthenticate`,
      {
        userid: userId,
        image_base64: imageSrc,
      }
    );
    // .then((value: AxiosResponse<ResponseAddFace>) => value.data)
    // .catch(
    //   (error: AxiosError<ResponseAddFace>) =>
    //     error.response?.data as ResponseAddFace
    // );

    return res.data;
  }
}
