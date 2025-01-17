import React, { useEffect } from "react";
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

const RegistroPonto: React.FC = () => {
  // const [registro, setRegistro] = useState<string>("");
  // const [opcao, setOpcao] = useState<string>("");

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log(`Registro: ${registro}, Opção: ${opcao}`);
  // };

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
      {/* Card */}
      <Card className="w-[887px] h-[500px] place-content-center rounded-[30px]">
        <CardHeader className="items-center">
          <CardTitle className="text-4xl">Registre o seu ponto</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full gap-4 justify-center">
              {/* Número de Registro */}
              <div className="flex flex-col space-y-1.5 w-[507px]">
                {/* <Label htmlFor="name"></Label> */}
                <Input
                  id="name"
                  placeholder="Número de Registro"
                  className={styles.input}
                />
              </div>

              {/* Evento */}
              <div className={styles.input}>
                {/* <Label htmlFor="framework">Framework</Label> */}
                <Select defaultValue="entrada-manha">
                  <SelectTrigger id="evento">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectGroup>
                      <SelectItem aria-selected="true" value="entrada-manha">
                        Entrada Manhã
                      </SelectItem>
                      <SelectItem value="saida-manha">Saída Manhã</SelectItem>
                      <SelectItem value="entrada-tarde">
                        Entrada Tarde
                      </SelectItem>
                      <SelectItem value="saida-tarde">Saída Tarde</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="bg-[#003c50]">Registrar</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegistroPonto;

// return (
//   <div className={styles.container}>
//     <div className={styles.header}>
//       <img src={logo} className={styles.logo} />
//     </div>
//     <div className={styles.card}>
//       <h2>Registre o seu ponto</h2>

//       <form onSubmit={handleSubmit}>
//         {/* Nº Registro */}
//         <div className={styles.formGroup}>
//           <input
//             type="text"
//             placeholder="Nº Registro"
//             value={registro}
//             onChange={e => setRegistro(e.target.value)}
//             className={styles.input}
//             required
//           />
//         </div>

//         {/* Evento */}
//         <div className={styles.formGroup}>
//           <select
//             value={opcao}
//             onChange={e => setOpcao(e.target.value)}
//             className={styles.input}
//             required
//           >
//             <option value="entrada-manha">Entrada Manhã</option>
//             <option value="saida-manha">Saída Manhã</option>
//             <option value="entrada-tarde">Entrada Tarde</option>
//             <option value="saida-tarde">Saída Tarde</option>
//           </select>
//         </div>

//         {/* Botão Registrar */}
//         <button type="submit" className={styles.button}>
//           Registrar
//         </button>
//       </form>
//     </div>
//   </div>
// )
