import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import multipart from '@fastify/multipart'
import { ValidationPipe } from '@nestjs/common'
import fastifyCookie from '@fastify/cookie'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  app.register(fastifyCookie, {
    secret: 'supersecret',
  })

  app.useGlobalPipes(new ValidationPipe())

  app.setGlobalPrefix('/api')

  await app.register(multipart)

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
