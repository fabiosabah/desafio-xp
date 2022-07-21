import { Controller } from '@nestjs/common';
import { AtivosService } from './ativos.service';

@Controller('ativos')
export class AtivosController {
  constructor(private readonly ativosService: AtivosService) {}
}
