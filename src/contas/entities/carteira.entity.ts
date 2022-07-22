import { Carteira, Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CarteiraEntity implements Carteira {
  id: number;

  codCliente: number;

  saldo: number | any; //Prisma.Decimal force any usage
}
