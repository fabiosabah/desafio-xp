import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard.ts.guard';
import { ContasService } from './contas.service';
import { DepositDto, WithdrawDto } from './dto';

@Controller('conta')
@ApiTags('Contas')
@UseGuards(AuthGuard)
export class ContasController {
  constructor(private readonly contasService: ContasService) {}

  @Get(':cod')
  async findOne(@Param('cod', ParseIntPipe) cod: number) {
    return await this.contasService.findOne(cod, true);
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
