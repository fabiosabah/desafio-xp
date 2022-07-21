import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContasService {
  constructor(private prisma: PrismaService) {}

  async findOne(codCliente) {
    const cliente = await this.prisma.carteira.findUnique({
      where: { codCliente: parseFloat(codCliente) },
      select: {
        codCliente: true,
        saldo: true,
      },
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente #${codCliente} não encontrado`);
    }
    return {
      CodCliente: cliente.codCliente,
      Saldo: cliente.saldo,
    };
  }

  async deposit(depositDto) {
    //   const { codCliente, Valor } = depositDto;
    //   const client = await this.findOne(codCliente);
    //   console.log('-----------', client);
    //   // return await this.prisma.carteira.update({
    //   //   where: { codCliente: codCliente },
    //   //   data: {
    //   //     saldo: client.Saldo + Valor,
    //   //   },
    // });
  }
  async withdraw(withdrawDto) {}
  // const { codCliente, Valor } = withdrawDto;
  // const client = await this.findOne(codCliente);
  // if (client.Saldo - Valor < 0)
  //   throw new BadRequestException('Saldo insuficiente');

  // return await this.prisma.carteira.update({
  //   where: { codCliente },
  //   data: {
  //     saldo: client.Saldo - Valor,
  // },
  // });
  // }
}
