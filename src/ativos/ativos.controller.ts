import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard.ts.guard';
import { AtivosService } from './ativos.service';

@Controller('ativos')
@ApiTags('Ativos')
export class AtivosController {
  constructor(private readonly ativosService: AtivosService) {}

  @Get('/:cod')
  async findOne(@Param('cod', ParseIntPipe) cod) {
    return await this.ativosService.findOne(cod, true);
  }

  @Get('/cliente/:cod')
  @UseGuards(AuthGuard)
  async findAll(@Param('cod', ParseIntPipe) cod) {
    return await this.ativosService.findAll(cod);
  }
  @Get()
  async groupAtivos() {
    return await this.ativosService.groupAtivos();
  }
}
