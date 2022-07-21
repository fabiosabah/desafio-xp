import { IsNumber } from 'class-validator';

export class InvestimentosDto {
  @IsNumber()
  readonly codCliente: number;

  @IsNumber()
  readonly codAtivo: number;

  @IsNumber()
  readonly qtdeAtivo: number;
}
