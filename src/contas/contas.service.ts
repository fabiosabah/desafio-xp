import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DepositDto, WithdrawDto } from './dto';

@Injectable()
export class ContasService {
  constructor(private prisma: PrismaService) {}

  async findOne(codCliente) {
    const cliente = await this.prisma.carteira.findUnique({
      where: { codCliente: +codCliente },
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
      Saldo: +cliente.saldo,
    };
  }

  async deposit(depositDto: DepositDto) {
    const { CodCliente, Valor } = depositDto;
    const client = await this.findOne(CodCliente);
    await this.prisma.carteira.update({
      where: { codCliente: CodCliente },
      data: {
        saldo: client.Saldo + Valor,
      },
    });
    return 'ok deposito';
  }
  async withdraw(withdrawDto: WithdrawDto) {
    const { CodCliente, Valor } = withdrawDto;
    const client = await this.findOne(CodCliente);
    if (client.Saldo - Valor < 0) {
      throw new BadRequestException('Saldo insuficiente');
    }
    await this.prisma.carteira.update({
      where: { codCliente: CodCliente },
      data: {
        saldo: client.Saldo - Valor,
      },
    });
    return 'ok saque';
  }
}
