import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PontoController } from './ponto/infrastructure/ponto.controller'
import { PontoService } from './ponto/infrastructure/ponto.service'

@Module({
  imports: [],
  controllers: [AppController, PontoController],
  providers: [AppService, PontoService],
})
export class AppModule {}
