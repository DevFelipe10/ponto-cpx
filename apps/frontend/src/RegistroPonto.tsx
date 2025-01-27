import React, { LegacyRef, useEffect, useState } from "react";
import styles from "./RegistroPonto.module.css";
import logo from "./assets/logo.png";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import Webcam from "react-webcam";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  FaceAuthenticateResponse,
  FaceDetectService,
  ResponseApi,
} from "./services/FaceDetectService";
// import { useNavigate } from "react-router-dom";
// import Layout from "./Layout";

type FormData = {
  user_id: string;
  event: string;
};

type ErrorFaceAuthenticate = {
  error: string;
};

const RegistroPonto: React.FC = () => {
  // const navigate = useNavigate();
  const faceDetectService = new FaceDetectService();

  const [formData, setFormData] = useState<FormData>({
    user_id: "",
    event: "entrada-manha",
  });

  const [errorFaceAuthenticate, setErrorFaceAuthenticate] =
    useState<ErrorFaceAuthenticate>();
  const [resultFaceAuthenticate, setResultFaceAuthenticate] =
    useState<ResponseApi<FaceAuthenticateResponse>>();

  const [submitted, setSubmitted] = useState(false);
  const [loadingCaptureFace, setLoadingCaptureFace] = useState(false);

  const handleChangeNumeroRegistro = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manipulador para o Select
  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, event: value });
  };

  function WebcamCapture() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user",
    };

    const webcamRef: LegacyRef<Webcam> = React.useRef(null);

    const capture = React.useCallback(async () => {
      if (webcamRef.current === null) {
        // setLoadingCaptureFace(false);
        return;
      }

      setLoadingCaptureFace(true);

      const imageSrc = webcamRef.current.getScreenshot()!;

      setResultFaceAuthenticate(
        await faceDetectService.faceAuthenticate(formData.user_id, imageSrc)
      );

      setLoadingCaptureFace(false);
      setSubmitted(true);
    }, [webcamRef]);

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
    );
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  return (
    <div>
      {/* <Layout> */}
      <div className={styles.header}>
        <img src={logo} className={styles.logo} />
      </div>
      {/* Card */}
      <Card className="w-[887px] h-[500px] place-content-center rounded-[30px]">
        <CardHeader className="items-center">
          <CardTitle className="text-4xl">Registre o seu ponto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 justify-center">
            {/* Número de Registro */}
            <div className="flex flex-col space-y-1.5 w-[507px]">
              <Input
                name="user_id"
                value={formData.user_id}
                onChange={handleChangeNumeroRegistro}
                required
                placeholder="Número de Registro"
                className={styles.input}
              />
            </div>

            {/* Evento */}
            <div className={styles.input}>
              <Select
                defaultValue="entrada-manha"
                value={formData.event}
                onValueChange={handleSelectChange}
                required
              >
                <SelectTrigger id="evento">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectGroup>
                    <SelectItem aria-selected="true" value="entrada-manha">
                      Entrada Manhã
                    </SelectItem>
                    <SelectItem value="saida-manha">Saída Manhã</SelectItem>
                    <SelectItem value="entrada-tarde">Entrada Tarde</SelectItem>
                    <SelectItem value="saida-tarde">Saída Tarde</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
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
                  {resultFaceAuthenticate === undefined ? (
                    <h2></h2>
                  ) : (
                    <h2>Registro de ponto realizado com sucesso!</h2>
                  )}
                  <h2>
                    {resultFaceAuthenticate === undefined
                      ? errorFaceAuthenticate?.error
                      : resultFaceAuthenticate.message}
                  </h2>

                  <DialogFooter className="sm:justify-center">
                    <DialogClose
                      className="bg-primary mt-4"
                      onClick={() => {
                        setLoadingCaptureFace(false);
                        setSubmitted(false);
                        setResultFaceAuthenticate(undefined);
                        setErrorFaceAuthenticate(undefined);
                      }}
                    >
                      {resultFaceAuthenticate === undefined
                        ? "Tentar Novamente"
                        : "Fechar"}
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
        </CardFooter>
      </Card>
      {/* </Layout> */}
    </div>
  );
};

export default RegistroPonto;
