import { IsNumber, Min } from 'class-validator';

export class WithdrawDto {
  @Min(0.1)
  @IsNumber({ maxDecimalPlaces: 2 })
  readonly CodCliente: number;

  @Min(0.1)
  @IsNumber({ maxDecimalPlaces: 2 })
  readonly Valor: number;
}
