import { Body, Controller, Post } from '@nestjs/common';
import { InvestimentosDto } from './dto/investimentos.dto';
import { InvestimentosService } from './investimentos.service';

@Controller('investimentos')
export class InvestimentosController {
  constructor(private readonly investimentosService: InvestimentosService) {}

  @Post('comprar')
  async buy(@Body() investimentosDto: InvestimentosDto) {
    return this.investimentosService.buy(investimentosDto);
  }

  @Post('vender')
  async sell(@Body() investimentosDto: InvestimentosDto) {
    return this.investimentosService.sell(investimentosDto);
  }
}
