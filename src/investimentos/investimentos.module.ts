import { Module } from '@nestjs/common';
import { InvestimentosService } from './investimentos.service';
import { InvestimentosController } from './investimentos.controller';

@Module({
  controllers: [InvestimentosController],
  providers: [InvestimentosService]
})
export class InvestimentosModule {}
