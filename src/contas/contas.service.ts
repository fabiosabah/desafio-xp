import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContasService {
  constructor(private prisma: PrismaService) {}

  async findOne(codCliente: number) {
    const cliente = await this.prisma.carteira.findUnique({
      where: { codCliente },
      select: {
        codCliente: true,
        saldo: true,
      },
    });
    if (!cliente) {
      throw new NotFoundException(`Client #${codCliente} not found`);
    }
    return {
      CodCliente: cliente.codCliente,
      Saldo: +cliente.saldo.toFixed(2),
    };
  }

  deposit(body) {
    return body;
  }
  withdraw(body) {
    return body;
  }
}
