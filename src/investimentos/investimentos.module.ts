import { Module } from '@nestjs/common';
import { InvestimentosService } from './investimentos.service';
import { InvestimentosController } from './investimentos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AtivosModule } from 'src/ativos/ativos.module';
import { ContasModule } from 'src/contas/contas.module';

@Module({
  controllers: [InvestimentosController],
  providers: [InvestimentosService],
  imports: [PrismaModule, AtivosModule, ContasModule],
})
export class InvestimentosModule {}
