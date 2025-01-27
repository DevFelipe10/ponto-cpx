import React, { useEffect, useState } from "react";
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
// import { useNavigate } from "react-router-dom";

type FormData = {
  registration: string;
  password: string;
};

const RegistroPontoAdmin: React.FC = () => {
  // const navigate = useNavigate();

  const [formLogin, setLogin] = useState<FormData>({
    registration: "",
    password: "",
  });

  const changeRegistration = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setLogin({ ...formLogin, [name]: value });
  };

  const changePassword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setLogin({ ...formLogin, [name]: value });
  };

  function login() {
    // TODO: Chamar endpoint para login
    // axios
    //   .post(`${window.location.href}api/face-plus-plus/faceauthenticate`, {
    //     userid: formLogin.matricula,
    //   })
    //   .then((response: AxiosResponse<ResponseFaceAuthenticate>) => {
    //     // setResultFaceAuthenticate(response.data);
    //     console.log(`Response: ${JSON.stringify(response.data)}`);
    //   })
    //   .catch((error: AxiosError<ErrorFaceAuthenticate>) => {
    //     // setErrorFaceAuthenticate(error.response?.data);
    //     console.log(`Error: ${JSON.stringify(error.response?.data)}`);
    //   });
    // // .finally(() => setSubmitted(true));

    console.log("logado");
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  return (
    <div>
      <div className={styles.header}>
        <img src={logo} className={styles.logo} />
      </div>
      <Card className="w-[887px] h-[500px] place-content-center rounded-[30px]">
        <CardHeader className="items-center">
          <CardTitle className="text-4xl">Acesso Administrador</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 justify-center">
            {/* Número de Registro */}
            <div className="flex flex-col space-y-1.5 w-[507px]">
              <Input
                name="matricula"
                value={formLogin.registration}
                onChange={changeRegistration}
                required
                placeholder="Número de Registro"
                className={styles.input}
              />
            </div>

            {/* Senha */}
            <div className={styles.input}>
              <Input
                name="password"
                value={formLogin.password}
                onChange={changePassword}
                required
                placeholder="Senha"
                className={styles.input}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button type="submit" onClick={login}>
            Login
          </Button>
        </CardFooter>
      </Card>
      {/* )} */}
    </div>
  );
};

export default RegistroPontoAdmin;
