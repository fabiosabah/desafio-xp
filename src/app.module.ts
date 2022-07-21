import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ContasModule } from './contas/contas.module';
import { AtivosModule } from './ativos/ativos.module';

@Module({
  imports: [PrismaModule, ContasModule, AtivosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
