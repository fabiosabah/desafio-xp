import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AtivosService } from './ativos.service';

@Controller('ativos')
export class AtivosController {
  constructor(private readonly ativosService: AtivosService) {}

  @Get('/:cod')
  async findOne(@Param('cod', ParseIntPipe) cod) {
    return await this.ativosService.findOne(cod);
  }

  @Get('/cliente/:cod')
  async findAll(@Param('cod', ParseIntPipe) cod) {
    return await this.ativosService.findAll(cod);
  }
  @Get()
  async groupAtivos() {
    return await this.ativosService.groupAtivos();
  }
}
