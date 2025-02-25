import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import styles from './RegistroPonto.module.css'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SelectGroup } from '@radix-ui/react-select'
import Webcam from 'react-webcam'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import {
  MarcacaoMisterT,
  ResponseApi,
  ResultPointRegister,
  useMisterT,
} from '@/hooks/use-mistert'
import { CardRegistroPonto } from '@/components/card-registro-ponto/card-registro-ponto'
import { useGeolocation } from '@/hooks/use-geolocation'
import { HttpStatusCode } from 'axios'
import {
  FaceAuthenticateResponse,
  useFaceAuthentication,
} from '@/hooks/use-face-authentication'
import { Skeleton } from '@/components/ui/skeleton'
import { toast, Toaster } from 'sonner'
import { useConfig } from '@/hooks/use-config'

type FormData = { matricula: string; evento: string }

const RegistroPonto: React.FC = () => {
  const { faceAuthenticate } = useFaceAuthentication()
  const {
    getConfgiMisterT,
    getTokenRegistroPonto,
    loading,
    progress,
    configMisterT,
  } = useConfig()
  const { pointRegisterMisterT } = useMisterT()
  const { latitude, longitude, precisao, errorGeolocation, configGeolocation } =
    useGeolocation()

  const [submitted, setSubmitted] = useState<boolean>(false)
  const [loadingCaptureFace, setLoadingCaptureFace] = useState<boolean>(false)

  const [resultFaceAuthenticate, setResultFaceAuthenticate] =
    useState<ResponseApi<FaceAuthenticateResponse>>()
  const [resultPointRegister, setResultPointRegister] =
    useState<ResultPointRegister>()

  const [loadingToken, setLoadingToken] = useState<boolean>(true)

  const [formData, setFormData] = useState<FormData>({
    matricula: '',
    evento: '2',
  })

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (loadingToken) {
      setLoadingToken(false)

      getTokenRegistroPonto().then(() => {
        getConfgiMisterT().then(config => {
          if (config === undefined) {
            toast('Não autenticado, tente novamente mais tarde', {
              duration: 3000,
              position: 'bottom-right',
            })
          }
        })
      })
    }

    configGeolocation()
  }, [configGeolocation, getConfgiMisterT, getTokenRegistroPonto, loadingToken])

  const handleChangeNumeroRegistro = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = event.target
    setFormData(prevState => ({ ...prevState, matricula: value }))

    // Manter o foco no input após atualização do estado
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  // Manipulador para o Select
  const handleSelectChange = (value: string) => {
    console.log(formData)
    console.log(formData.evento)
    console.log(value)

    setFormData(prevState => ({ ...prevState, evento: value }))
    console.log(formData)

    // // Manter o foco no input após atualização do estado
    // setTimeout(() => inputRef.current?.focus(), 0)
  }

  function WebcamCapture() {
    const videoConstraints = {
      // width: 1280,
      // height: 720,
      facingMode: 'user',
    }

    const webcamRef: LegacyRef<Webcam> = React.useRef(null)

    const capture = React.useCallback(async () => {
      if (webcamRef.current === null) {
        // setLoadingCaptureFace(false);
        return
      }

      // console.log(
      //   webcamRef.current.getScreenshot({ height: 1080, width: 1920 }),
      // )

      setLoadingCaptureFace(true)

      const imageSrc = webcamRef.current.getScreenshot({
        height: 1080,
        width: 1920,
      })!

      // Autenticar a face da imagem
      const resFaceAuthenticate = await faceAuthenticate(
        formData.matricula,
        imageSrc,
      )

      if (
        resFaceAuthenticate.status === HttpStatusCode.Ok &&
        resFaceAuthenticate.data !== undefined
      ) {
        // caso status é 200 então o resFaceAuthenticate.data não é undefined
        // enviar o user_Id não vai fazer difrença nesse caso, visto que a face foi validada
        formData.matricula = resFaceAuthenticate.data?.userid
      }

      const dateMarcacao = new Date()

      const { ip } = await (
        await fetch('https://api.ipify.org?format=json')
      ).json()

      console.log(formData.evento)

      const bodyMarcacao: MarcacaoMisterT = {
        Versao: '1.0',
        MATRICULA: formData.matricula,
        DATA: dateMarcacao.toLocaleDateString(),
        HORA: dateMarcacao.toLocaleTimeString(),
        FUSOHORAR: `${(dateMarcacao.getTimezoneOffset() / -60).toString()}:00`,
        IDEVENTO: Number.parseInt(formData.evento),
        IPORIGEM: ip,
        LATITUDE: latitude,
        LONGITUDE: longitude,
        PRECISAO: precisao,
        OBSREG: '',
        IsFacialValid: resFaceAuthenticate.status === HttpStatusCode.Ok, // Verificação facial deu certo httpStatusCode = 200
      }

      const resPointRegister = await pointRegisterMisterT(bodyMarcacao)

      // Alterar os states
      if (resPointRegister.status === HttpStatusCode.Ok) {
        setResultPointRegister(resPointRegister.data)
        console.log(resultPointRegister?.success)
      }

      setResultFaceAuthenticate(resFaceAuthenticate)
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

  // function submitRegistrarPonto(event) {
  //   event.preventDefault()

  //   const { matricula, evento } = formData

  //   if (!matricula || !evento) {
  //     toast.error('Preencha todos os campos obrigatórios.')
  //     return
  //   }

  //   // TODO: verificar se o número de registro já está cadastrado no MT
  //   // if (isMatriculaCadastrada) {
  //   //   toast.error('Número de registro já cadastrado.')
  //   //   return
  //   // }

  //   // TODO: verificar se o evento existe no MT
  //   // if (!isEventoValido) {
  //   //   toast.error('Evento inválido.')
  //   //   return
  //   // }

  //   // TODO: verificar se a pessoa possui permissão para marcar esse evento
  //   // if (!possuiPermissao) {
  //   //   toast.error('Você não possui permissão para marcar esse evento.')
  // }

  function ContentRegistroPonto() {
    return (
      <div className="grid gap-4 justify-center">
        {/* Número de Registro */}
        {/* <div className="flex flex-col space-y-1.5 w-[507px]"> */}
        <div className="flex flex-col space-y-1.5 min-w-[300px] sm:w-[400px] lg:w-[500px]">
          <Input
            ref={inputRef}
            name="matricula"
            value={formData.matricula}
            onChange={handleChangeNumeroRegistro}
            required
            placeholder="Número de Registro"
            className={styles.input}
          />
        </div>

        {/* Evento */}
        {configMisterT!.Eventos.length <= 0 ? (
          <div></div>
        ) : (
          <div className={styles.input}>
            <Select
              value={formData.evento}
              onValueChange={handleSelectChange}
              required
            >
              <SelectTrigger id="evento">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectGroup>
                  {configMisterT?.Eventos.map(item => (
                    <SelectItem
                      key={item.ID}
                      aria-selected={
                        item.ID === configMisterT.Eventos[0].ID
                          ? 'true'
                          : 'false'
                      }
                      value={`${item.ID}`}
                    >
                      {item.DESCRICAO}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    )
  }

  function LoadingRegistroPonto() {
    return (
      <div className="flex justify-center">
        <Progress value={progress} className="w-[60%]" />
      </div>
    )
  }

  // function Clock() {
  //   // const dataSplited = configMisterT?.data.split("/");
  //   // const horaSplited = configMisterT?.hora.split(":");

  //   // console.log(dataSplited);
  //   // console.log(horaSplited);

  //   // const serverDate = new Date(
  //   //   Number.parseInt(dataSplited[2]),
  //   //   Number.parseInt((Number.parseInt(dataSplited[1]) - 1).toString()),
  //   //   Number.parseInt(dataSplited[0]),
  //   //   Number.parseInt(horaSplited[0]),
  //   //   Number.parseInt(horaSplited[1]),
  //   //   Number.parseInt(horaSplited[2])
  //   // );

  //   // const dateNow = new Date();

  //   // // setDataPonto(new Date());

  //   // console.log(dateNow.toLocaleDateString());
  //   // console.log(dateNow.toLocaleTimeString());

  //   // console.log(`serverDate: ${serverDate}`);
  //   // console.log(`dateNow: ${dateNow}`);

  //   return (
  //     <div>
  //       <h4>{dataPonto.toLocaleTimeString()}</h4>
  //     </div>
  //   );
  // }

  return (
    // <Layout>
    //   <div className={styles.divBody}>
    <div className="content-center place-items-center w-screen h-screen">
      <Toaster />
      <div className={styles.header}>
        {loading ? (
          <Skeleton className="h-16 w-28 m-2" />
        ) : (
          <img src={configMisterT?.URL_Img_Logo} className={styles.logo} />
        )}
      </div>
      {/* Card */}
      {configMisterT === undefined ||
      loading ||
      errorGeolocation != undefined ||
      latitude === 0.0 ? (
        <CardRegistroPonto cardContent={<LoadingRegistroPonto />} />
      ) : (
        // ? (
        //   <CardRegistroPonto
        //     cardTitle="Localização indisponível"
        //     cardContent={
        //       <h2>
        //         {errorGeolocation === undefined
        //           ? "Habilite a localização no navegador"
        //           : errorGeolocation.message}
        //       </h2>
        //     }
        //   />
        // ) :
        <CardRegistroPonto
          cardTitle="Registre o seu ponto"
          cardContent={<ContentRegistroPonto />}
          // cardFooter={<FooterRegistroPonto />}
          cardFooter={
            <Dialog>
              <DialogTrigger asChild>
                <Button>Registrar</Button>
              </DialogTrigger>
              {submitted ? (
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Informação</DialogTitle>
                  </DialogHeader>
                  <div className="py-4 text-center">
                    {resultFaceAuthenticate?.status === HttpStatusCode.Ok ? (
                      <h2>Registro de ponto realizado com sucesso!</h2>
                    ) : (
                      <div>
                        <h2>
                          Registro de ponto não realizado. Tente novamente!
                        </h2>
                        <h2>{resultFaceAuthenticate!.message}</h2>
                      </div>
                    )}
                    {/* <h2>
                      {resultFaceAuthenticate === undefined
                        ? errorFaceAuthenticate?.error
                        : resultFaceAuthenticate.message}
                    </h2> */}

                    <DialogFooter className="sm:justify-center">
                      <DialogClose
                        className="bg-primary mt-4"
                        onClick={() => {
                          setResultFaceAuthenticate(undefined)
                          setSubmitted(false)
                          setLoadingCaptureFace(false)
                        }}
                      >
                        {resultFaceAuthenticate === undefined
                          ? 'Tentar Novamente'
                          : 'Fechar'}
                      </DialogClose>
                    </DialogFooter>
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
          }
        />
      )}
    </div>
    //   </div>
    // </Layout>
  )
}

export default RegistroPonto
