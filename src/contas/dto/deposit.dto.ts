import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max } from 'class-validator';

export class DepositDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1)
  @ApiProperty()
  readonly CodCliente: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @Max(20_000_000)
  @ApiProperty()
  readonly Valor: number;
}
