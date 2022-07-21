import { IsNumber, Min } from 'class-validator';

export class WithdrawDto {
  @Min(1)
  @IsNumber()
  readonly CodCliente: number;

  @Min(1)
  @IsNumber()
  readonly Valor: number;
}
