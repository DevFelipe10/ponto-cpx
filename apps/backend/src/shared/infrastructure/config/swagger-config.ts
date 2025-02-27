import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export default function swaggerConfig(app: NestFastifyApplication) {
  // Doc Swagger
  const config = new DocumentBuilder()
    .setTitle('API Registro de ponto')
    // .setDescription('The cats API description')
    .setVersion('1.0')
    // .addCookieAuth('token')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup(
    'api/docs',
    app,
    document,
    // {
    // swaggerOptions: {
    // withCredentials: true, // Envia cookies automaticamente
    // persistAuthorization: true, // Mantém o token ao recarregar a página
    // },
    // }
  )
}
