import { IsNumberString } from 'class-validator';

export class CodClienteDto {
  @IsNumberString()
  CodCliente: number;
}
