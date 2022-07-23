import { Module } from '@nestjs/common';
import { AtivosService } from './ativos.service';
import { AtivosController } from './ativos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AtivosController],
  providers: [AtivosService],
  exports: [AtivosService],
  imports: [PrismaModule],
})
export class AtivosModule {}
