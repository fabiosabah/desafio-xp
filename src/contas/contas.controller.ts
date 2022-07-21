import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContasService } from './contas.service';
import { DepositDto, WithdrawDto } from './dto';

@Controller('conta')
@ApiTags('conta')
export class ContasController {
  constructor(private readonly contasService: ContasService) {}

  @Post('deposito')
  async deposit(@Body() depositDto: DepositDto) {
    return await this.contasService.deposit(depositDto);
  }

  @Post('saque')
  async withdraw(@Body() withdrawDto: WithdrawDto) {
    return await this.contasService.withdraw(withdrawDto);
  }

  @Get(':cod')
  async findOne(@Param('cod', ParseIntPipe) cod: number) {
    console.log('oii');
    console.log('typeof', typeof cod);
    return await this.contasService.findOne(cod);
  }
}
