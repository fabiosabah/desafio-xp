import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContasService } from './contas.service';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';

@Controller('contas')
export class ContasController {
  constructor(private readonly contasService: ContasService) {}

  @Post()
  create(@Body() createContaDto: CreateContaDto) {
    return this.contasService.create(createContaDto);
  }

  @Get()
  findAll() {
    return this.contasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContaDto: UpdateContaDto) {
    return this.contasService.update(+id, updateContaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contasService.remove(+id);
  }
}
