import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import multipart from '@fastify/multipart'
import { ValidationPipe } from '@nestjs/common'
import fastifyCookie from '@fastify/cookie'
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger'
import { AuthGuard } from './shared/infrastructure/auth/auth.guard'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  app.enableCors({
    origin: ['https://ponto-cpx-frontend.vercel.app', 'http://localhost:5173'], // Permite requisições do frontend local
    methods: 'GET,POST',
    credentials: true, // Se estiver usando cookies ou autenticação via headers
  })

  // Config cookies
  app.register(fastifyCookie, { secret: 'supersecret' })

  app.useGlobalPipes(new ValidationPipe())

  app.setGlobalPrefix('/api')

  await app.register(multipart)

  // Doc Swagger
  const config = new DocumentBuilder()
    .setTitle('API Registro de ponto')
    // .setDescription('The cats API description')
    .setVersion('1.0')
    .addCookieAuth('token')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  // // Define a autenticação como obrigatória em todas as rotas automaticamente
  // document.paths = Object.entries(document.paths).reduce(
  //   (acc, [path, methods]) => {
  //     acc[path] = Object.entries(methods).reduce(
  //       (methodsAcc, [method, details]) => {
  //         methodsAcc[method] = {
  //           ...details,
  //           security: [config.components.securitySchemes], // Define a segurança globalmente
  //         }
  //         return methodsAcc
  //       },
  //       {},
  //     )
  //     return acc
  //   },
  //   {},
  // )

  // console.log(document.paths['/api/auth/profile'].get.security)
  // console.log(config.components.securitySchemes.cookie)

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      withCredentials: true, // Envia cookies automaticamente

      // persistAuthorization: true, // Mantém o token ao recarregar a página
    },
  })

  // // Configuração do CORS
  // await app.register(cors, {
  //   origin: (origin, callback) => {
  //     const allowedOrigins = ['http://localhost:5173']

  //     if (!origin) {
  //       // Bloqueia requisições sem origem (Postman, cURL, etc.)
  //       return callback(new Error('CORS blocked: Missing origin'), false)
  //     }

  //     if (allowedOrigins.includes(origin)) {
  //       return callback(null, true)
  //     } else {
  //       return callback(new Error('CORS blocked: Origin not allowed'), false)
  //     }
  //   },
  //   methods: ['GET', 'POST'],
  //   allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
  //   credentials: true, // Se precisar enviar cookies
  // })

  // app.enableCors(<CorsOptions>{
  //   origin: 'http://compex.com.br', // URL da fonte de origem permitida
  //   methods: ['POST'],
  //   credentials: true, // Habilita o envio de cookies
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  // })

  // app.useStaticAssets({
  //   root: join(__dirname, '../..', 'public'),
  //   prefix: '/public/',
  // })
  // app.setViewEngine({
  //   engine: {
  //     handlebars: handlebars,
  //   },
  //   templates: join(__dirname, '../..', 'views'),
  // })

  await app.listen(3000)
}
bootstrap()
