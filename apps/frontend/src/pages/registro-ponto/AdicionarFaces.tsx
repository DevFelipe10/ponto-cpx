import React, { LegacyRef, useEffect, useState } from 'react'
import styles from './RegistroPonto.module.css'
import logo from '@/assets/logo.png'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Webcam from 'react-webcam'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog'
import { HttpStatusCode } from 'axios'
import { useFaceAuthentication } from '@/hooks/use-face-authentication'
import { ResponseApi } from '@/hooks/use-mistert'

type FormData = {
  registrationId: string
  password: string
}

const AdicionarFaces: React.FC = () => {
  // const navigate = useNavigate();

  const { faceRegister } = useFaceAuthentication()

  const [formAddFace, setFormAddFace] = useState<FormData>({
    registrationId: '',
    password: '',
  })

  const [resultFaceAuthenticate, setResultFaceAuthenticate] =
    useState<ResponseApi>()
  const [submitted, setSubmitted] = useState(false)
  const [loadingCaptureFace, setLoadingCaptureFace] = useState(false)

  const changeRegistrationId = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    console.log(name)
    setFormAddFace({ ...formAddFace, [name]: value })
  }

  // const changePassword = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = event.target;
  //   setFormAddFace({ ...formAddFace, [name]: value });
  // };

  function WebcamCapture() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user',
    }

    const webcamRef: LegacyRef<Webcam> = React.useRef(null)

    const capture = React.useCallback(async () => {
      if (webcamRef.current === null) {
        // setLoadingCaptureFace(false);
        return
      }

      setLoadingCaptureFace(true)

      const imageSrc = webcamRef.current.getScreenshot()!

      setResultFaceAuthenticate(
        await faceRegister(formAddFace.registrationId, imageSrc),
      )

      setLoadingCaptureFace(false)
      setSubmitted(true)
    }, [webcamRef])

    return (
      <div>
        <Webcam
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
        />
        <div>
          <Button className="w-full rounded-t-none" onClick={capture}>
            Capturar
          </Button>
        </div>
      </div>
    )
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'scroll'
    }
  }, [])

  return (
    <div>
      <div className={styles.header}>
        <img src={logo} className={styles.logo} />
      </div>
      {/* Card */}
      <Card className="w-[887px] h-[500px] place-content-center rounded-[30px]">
        <CardHeader className="items-center">
          <CardTitle className="text-4xl">Cadastrar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 justify-center">
            {/* Número de Registro */}
            <div className="flex flex-col space-y-1.5 w-[507px]">
              <Input
                name="registrationId"
                value={formAddFace.registrationId}
                onChange={changeRegistrationId}
                required
                placeholder="Número de Registro"
                className={styles.input}
              />
            </div>

            {/* <div className={styles.input}>
              <Input
                name="password"
                value={formAddFace.password}
                onChange={changePassword}
                required
                placeholder="Senha"
                className={styles.input}
              />
            </div> */}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button type="submit">Cadastrar</Button>
            </DialogTrigger>
            {submitted ? (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Informação</DialogTitle>
                </DialogHeader>
                <div className="py-4 text-center">
                  {resultFaceAuthenticate?.status === HttpStatusCode.Ok ? (
                    <h2>{resultFaceAuthenticate.message}</h2>
                  ) : (
                    <h2>{resultFaceAuthenticate?.error}</h2>
                  )}

                  <DialogFooter className="sm:justify-center">
                    <DialogClose
                      className="bg-primary mt-4"
                      onClick={() => {
                        setLoadingCaptureFace(false)
                        setSubmitted(false)
                        setResultFaceAuthenticate(undefined)
                      }}
                    >
                      Fechar
                    </DialogClose>
                  </DialogFooter>

                  {/* <Button
                      onClick={() => {
                        setSubmitted(false);
                        setOpenDialog(false);
                        setResultFaceAuthenticate(undefined);
                        setErrorFaceAuthenticate(undefined);
                      }}
                    >
                      Tentar Novamente
                    </Button> */}
                </div>
              </DialogContent>
            ) : (
              <DialogContent className="px-0 pb-0 mb-0 -grid min-h-80">
                <DialogHeader className="px-4 mb-4">
                  <DialogTitle>Faça a captura do seu rosto</DialogTitle>
                </DialogHeader>
                <div className="gap-4 text-center flex justify-center center">
                  {loadingCaptureFace ? (
                    <div className="py-4">
                      <p>Aguarde a captura do rosto...</p>
                    </div>
                  ) : (
                    <WebcamCapture />
                  )}
                </div>
                <DialogFooter className="items-center"></DialogFooter>
              </DialogContent>
            )}
          </Dialog>
        </CardFooter>
      </Card>
      {/* )} */}
    </div>
  )
}

export default AdicionarFaces
