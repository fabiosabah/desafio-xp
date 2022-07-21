import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ContasService } from './contas.service';
import { DepositDto, WithdrawDto, CodClienteDto } from './dto';

@Controller('conta')
@ApiTags('conta')
export class ContasController {
  constructor(private readonly contasService: ContasService) {}

  @Post('deposito')
  async deposit(@Body() depositDto: DepositDto) {
    return this.contasService.deposit(depositDto);
  }

  @Post('saque')
  async withdraw(@Body() withdrawDto: WithdrawDto) {
    return await this.contasService.withdraw(withdrawDto);
  }

  @Get(':codCliente')
  async findOne(@Param('codCliente') codCliente) {
    console.log('typeof', typeof codCliente);
    return await this.contasService.findOne(codCliente);
  }
}
