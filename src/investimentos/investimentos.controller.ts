import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InvestimentosDto } from './dto/investimentos.dto';
import { InvestimentosService } from './investimentos.service';

@Controller('investimentos')
@ApiTags('Investimentos')
export class InvestimentosController {
  constructor(private readonly investimentosService: InvestimentosService) {}

  @Post('comprar')
  @HttpCode(HttpStatus.NO_CONTENT)
  async buy(@Body() investimentosDto: InvestimentosDto): Promise<void | Error> {
    return this.investimentosService.buy(investimentosDto);
  }

  @Post('vender')
  // @HttpCode(HttpStatus.NO_CONTENT)
  async sell(
    @Body() investimentosDto: InvestimentosDto,
  ): Promise<void | Error> {
    return this.investimentosService.sell(investimentosDto);
  }
}
