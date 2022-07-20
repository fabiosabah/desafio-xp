import { IsNumber } from 'class-validator';

export class DepositDto {
  @IsNumber()
  readonly CodCliente: number;

  @IsNumber()
  readonly Valor: number;
}
