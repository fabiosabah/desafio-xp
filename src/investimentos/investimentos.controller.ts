import { Controller } from '@nestjs/common';
import { InvestimentosService } from './investimentos.service';

@Controller('investimentos')
export class InvestimentosController {
  constructor(private readonly investimentosService: InvestimentosService) {}
}
