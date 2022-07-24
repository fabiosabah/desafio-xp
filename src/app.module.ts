import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ContasModule } from './contas/contas.module';
import { AtivosModule } from './ativos/ativos.module';
import { InvestimentosModule } from './investimentos/investimentos.module';
import { LoginsModule } from './logins/logins.module';

@Module({
  imports: [PrismaModule, ContasModule, AtivosModule, InvestimentosModule, LoginsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
