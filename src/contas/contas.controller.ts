import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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

  @Get(':cod')
  async findOne(@Param('cod', ParseIntPipe) cod: number) {
    return await this.contasService.findOne(cod);
  }

  @Post('deposito')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deposit(@Body() depositDto: DepositDto) {
    return await this.contasService.deposit(depositDto);
  }

  @Post('saque')
  @HttpCode(HttpStatus.NO_CONTENT)
  async withdraw(@Body() withdrawDto: WithdrawDto) {
    return await this.contasService.withdraw(withdrawDto);
  }
}
