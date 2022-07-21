import { IsNumber, Min } from 'class-validator';

export class DepositDto {
  @IsNumber()
  @Min(1)
  readonly CodCliente: number;

  @IsNumber()
  @Min(1)
  readonly Valor: number;
}
