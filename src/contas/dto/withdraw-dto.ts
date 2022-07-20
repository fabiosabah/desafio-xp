import { IsNumber } from 'class-validator';
export class WithdrawDto {
  @IsNumber()
  readonly CodCliente: number;

  @IsNumber()
  readonly Valor: number;
}
