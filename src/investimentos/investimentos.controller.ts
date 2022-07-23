import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { InvestimentosDto } from './dto/investimentos.dto';
import { InvestimentosService } from './investimentos.service';

@Controller('investimentos')
export class InvestimentosController {
  constructor(private readonly investimentosService: InvestimentosService) {}

  @Post('comprar')
  @HttpCode(HttpStatus.NO_CONTENT)
  async buy(@Body() investimentosDto: InvestimentosDto): Promise<void | Error> {
    return this.investimentosService.buy(investimentosDto);
  }

  @Post('vender')
  // @HttpCode(HttpStatus.NO_CONTENT)
  async sell(@Body() investimentosDto: InvestimentosDto) {
    return this.investimentosService.sell(investimentosDto);
  }
}
