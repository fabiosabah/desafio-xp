import { IsNumber, Min } from 'class-validator';

export class InvestimentosDto {
  @IsNumber()
  @Min(1)
  readonly codCliente: number;

  @IsNumber()
  @Min(1)
  readonly codAtivo: number;

  @IsNumber()
  @Min(1)
  readonly qtdeAtivo: number;
}
