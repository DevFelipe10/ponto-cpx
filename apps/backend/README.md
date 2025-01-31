# API Reconhecimento Facial

API de Reconhecimento Facial

# Header

## Token: \#\#\#

| Parâmetros    | Valor                  | Descrição                                       |
| ------------- | ---------------------- | ----------------------------------------------- |
| URL           | https://{DOMINIO}/api/ | URL do servidor para API                        |
| Content-Type  | application/json       | Indentificar o conteúdo enviado para o servidor |
| Authorization | bearer {TOKEN}         | Bearer token                                    |

# MisterT

## # Obter Configuração do relógio de ponto

Este endpoint é utilizado para obter as configurações do relógio de ponto

### Endpoint

| Método |        URI        | Autorização  |
| :----: | :---------------: | :----------: |
|  GET   | mistert/getconfig | Bearer Token |

### Respostas Esperadas

### Sucesso

Code 200

```json
{
  "Success": true,
  "ErrorMsg": "",
  "Versao": "1.0",
  "URL_Img_Logo": "http://andregarcia73.ddns.net:8088/SuaEmpresa/Logotipo.gif",
  "FormatoRel": {
    "ID": 2,
    "IDDM": 1,
    "SEQUENCIA": "9999",
    "DESCRICAO": "Relógio Facial",
    "EXDESCRI": "N",
    "IDFUSOHOR": 1,
    "EXFUSOHOR": "N",
    "EXHORVERAO": "N",
    "IDREGDIA": 1,
    "EXREGDIA": "N",
    "HSREGDIA": "N",
    "IDEVENTO": 2,
    "EXEVENTO": "S",
    "HSEVENTO": "N",
    "IDFATOR": 1,
    "EXFATOR": "N",
    "HSFATOR": "N",
    "IDORIGEM": 2,
    "EXORIGEM": "N",
    "HSORIGEM": "N",
    "IDIPORIGEM": 2,
    "EXIPORIGEM": "N",
    "CHAVE": "594924290120251508202652355327",
    "OBSGER": "",
    "PODEUSAR": "S"
  },
  "Eventos": [
    {
      "ID": 2,
      "IDDM": 1,
      "IDTIPOPON": 2,
      "SEQUENCIA": "1",
      "DESCRICAO": "Entrada Manhã",
      "OBSGER": "",
      "SEAPLICARP": "S",
      "SEAPLICADF": "S",
      "EXIBENOSRE": "S",
      "PODEUSAR": "S"
    }
  ]
}
```

### Erro

```json
{
  "message": "Error getting MisterT setup",
  "error": "Parâmetro P não recebido no get",
  "status": 400
}
```

## # Registrar Ponto no MisterT

Este endpoint é utilizado para registrar ponto no MisterT

### Endpoint

| Método |          URI          | Autorização  |
| :----: | :-------------------: | :----------: |
|  POST  | mistert/pointregister | Bearer Token |

### Parâmetros de Requisição

```json
{
  "Versao": required|string,
  "MATRICULA": required|string,
  "DATA": required|string,
  "HORA": required|string,
  "FUSOHORAR": required|string,
  "IDEVENTO": required|number,
  "IPORIGEM": required|string,
  "LATITUDE": required|number,
  "LONGITUDE": required|number,
  "PRECISAO": required|number,
  "OBSREG": required|string,
  "IsFacialValid": required|boolean,
}

```

### Descrição dos campos

| Campos        | Descrição                                                                     |
| ------------- | ----------------------------------------------------------------------------- |
| Versao        | Versão do sistema. Deixe como 1.0                                             |
| MATRICULA     | Matricula do usuáiro a registrar ponto                                        |
| DATA          | Data do registro de ponto EX: 31/01/2025                                      |
| HORA          | Hora do registro de ponto EX: 15:13:00                                        |
| FUSOHORAR     | Fuso horário do registro de ponto EX: -03:00                                  |
| IDEVENTO      | Identificação do envento do registro de ponto. Vem da configuração do MisterT |
| IPORIGEM      | IP do cliente que está realizando o registro de ponto                         |
| LATITUDE      | Latitude da localização do cliente                                            |
| LONGITUDE     | Longitude da localização do cliente                                           |
| PRECISAO      | Precisão da localização do cliente                                            |
| OBSREG        | Alguma informação adicional                                                   |
| IsFacialValid | True/False se a facial é válida para o registro de ponto                      |

### Respostas Esperadas

### Sucesso

Code 200

```json
{
  "Success": true,
  "ErrorMsg": ""
}
```

### Erro

Code 400

```json
{
  "message": "Error registering point",
  "error": "Erro na Marcação: Biometria facial inválida",
  "status": 400
}
```
