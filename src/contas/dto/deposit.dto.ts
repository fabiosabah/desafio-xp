import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class DepositDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.1)
  @ApiProperty()
  readonly CodCliente: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.1)
  @ApiProperty()
  readonly Valor: number;
}
