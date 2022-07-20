import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ContasService } from './contas.service';
import { CarteiraEntity } from './entities/carteira.entity';

@Controller('conta')
@ApiTags('conta')
export class ContasController {
  constructor(private readonly contasService: ContasService) {}

  @Get(':codCliente')
  async findOne(@Param('codCliente') codCliente: string) {
    console.log(codCliente);
    return await this.contasService.findOne(+codCliente);
  }

  @Post('deposito')
  async deposit(@Body() body) {
    return this.contasService.deposit(body);
  }

  @Post('saque')
  async withdraw(@Body() body) {
    return await this.contasService.withdraw(body);
  }
}
