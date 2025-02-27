import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import multipart from '@fastify/multipart'
import { ValidationPipe } from '@nestjs/common'
import fastifyCookie from '@fastify/cookie'
import swaggerConfig from './shared/infrastructure/config/swagger-config'

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

  // Initialize Swagger Doc
  swaggerConfig(app)

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
