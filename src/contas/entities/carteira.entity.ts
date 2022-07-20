import { Carteira } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CarteiraEntity implements Carteira {
  @ApiProperty()
  id: number;

  @ApiProperty()
  codCliente: number;

  @ApiProperty()
  saldo: number;
}
