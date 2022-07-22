import { Carteira } from '@prisma/client';

export class CarteiraEntity implements Carteira {
  id: number;

  codCliente: number;

  saldo: any; //Prisma.Decimal force any usage
}
