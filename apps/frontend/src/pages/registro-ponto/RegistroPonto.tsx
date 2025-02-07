import React, { LegacyRef, useEffect, useState } from 'react'
import styles from './RegistroPonto.module.css'
// import logo from "./assets/logo.png";
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
  ResultGetConfig,
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

type FormData = {
  matricula: string
  event: string
}

const RegistroPonto: React.FC = () => {
  // const navigate = useNavigate();

  const { faceAuthenticate } = useFaceAuthentication()
  const { progress, pointRegisterMisterT, getConfgiMisterT } = useMisterT()
  const { latitude, longitude, precisao, errorGeolocation, configGeolocation } =
    useGeolocation()

  const [loading, setLoading] = useState<boolean>(true)
  const [configMisterT, setConfigMisterT] = useState<ResultGetConfig>()
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [loadingCaptureFace, setLoadingCaptureFace] = useState<boolean>(false)

  const [resultFaceAuthenticate, setResultFaceAuthenticate] =
    useState<ResponseApi<FaceAuthenticateResponse>>()
  const [resultPointRegister, setResultPointRegister] =
    useState<ResultPointRegister>()

  // const [dataPonto, setDataPonto] = useState(new Date());

  const [formData, setFormData] = useState<FormData>({
    matricula: '',
    event: '2',
  })

  // const [progress, setProgress] = React.useState(13);

  const handleChangeNumeroRegistro = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  // Manipulador para o Select
  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, event: value })
  }

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

      // const userIdMarcacao =
      //   (formData.user_id ?? resFaceAuthenticate.data === undefined)
      //     ? undefined
      //     : resFaceAuthenticate.data.userid;

      const dateMarcacao = new Date()

      const { ip } = await (
        await fetch('https://api.ipify.org?format=json')
      ).json()
      // .then((response) => response.json())
      // .catch((error) => console.error("Erro ao obter IP:", error));

      const bodyMarcacao: MarcacaoMisterT = {
        Versao: '1.0',
        MATRICULA: formData.matricula,
        DATA: dateMarcacao.toLocaleDateString(),
        HORA: dateMarcacao.toLocaleTimeString(),
        FUSOHORAR: `${(dateMarcacao.getTimezoneOffset() / -60).toString()}:00`,
        IDEVENTO: Number.parseInt(formData.event),
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

  function ContentRegistroPonto() {
    return (
      <div className="grid gap-4 justify-center">
        {/* Número de Registro */}
        <div className="flex flex-col space-y-1.5 w-[507px]">
          <Input
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
              // defaultValue="entrada-manha"
              defaultValue="2"
              value={formData.event}
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
                      value={`"${item.ID}"`}
                    >
                      {item.DESCRICAO}
                    </SelectItem>
                  ))}
                  <SelectItem aria-selected="true" value="2">
                    Entrada Manhã
                  </SelectItem>
                  {/* <SelectItem value="3">Saída Manhã</SelectItem>
                <SelectItem value="4">Entrada Tarde</SelectItem>
                <SelectItem value="5">Saída Tarde</SelectItem>
                <SelectItem value="6">Entrada Extra</SelectItem>
                <SelectItem value="7">Saída Extra</SelectItem> */}
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

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const fetchData = async () => {
      try {
        const resConfigMisterT = await getConfgiMisterT()
        setConfigMisterT(resConfigMisterT.data)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    configGeolocation()

    return () => {
      document.body.style.overflow = 'scroll'
      // setInterval(() => setDataPonto(new Date()), 1000);
    }
  }, [])

  return (
    // <Layout>
    //   <div className={styles.divBody}>
    <div className="place-items-center w-screen h-screen">
      <div className={styles.header}>
        <img src={configMisterT?.URL_Img_Logo} className={styles.logo} />
      </div>
      {/* Card */}
      {loading || errorGeolocation != undefined || latitude === 0.0 ? (
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
                <Button type="submit">Registrar</Button>
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
