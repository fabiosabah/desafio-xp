import { IsNumber, Max, Min } from 'class-validator';

export class WithdrawDto {
  @Min(1)
  @IsNumber({ maxDecimalPlaces: 2 })
  readonly CodCliente: number;

  @Min(0.01)
  @Max(1_000_000)
  @IsNumber({ maxDecimalPlaces: 2 })
  readonly Valor: number;
}
