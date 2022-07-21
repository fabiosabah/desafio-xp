import { Module } from '@nestjs/common';
import { AtivosService } from './ativos.service';
import { AtivosController } from './ativos.controller';

@Module({
  controllers: [AtivosController],
  providers: [AtivosService]
})
export class AtivosModule {}
