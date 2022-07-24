import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DepositDto, WithdrawDto } from './dto';
import { CarteiraEntity } from './entities/carteira.entity';

@Injectable()
export class ContasService {
  constructor(private prisma: PrismaService) {}

  async findOne(codCliente: number): Promise<any | Error> {
    const cliente = await this.findWallet(codCliente);
    return {
      CodCliente: cliente.codCliente,
      Saldo: +cliente.saldo,
    };
  }

  async findWallet(codCliente): Promise<CarteiraEntity> {
    const cliente = await this.prisma.carteira.findUnique({
      where: { codCliente },
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente #${codCliente} não encontrado`);
    }
    return cliente;
  }

  async deposit(depositDto: DepositDto): Promise<any | void | Error> {
    const { CodCliente, Valor } = depositDto;
    console.log(typeof CodCliente);
    const client = await this.findOne(CodCliente);
    const result = await this.prisma.carteira.update({
      where: { codCliente: CodCliente },
      select: {
        codCliente: true,
        saldo: true,
      },
      data: {
        saldo: client.Saldo + Valor,
      },
    });
    console.log(result);
    return result;
    try {
      await this.prisma.carteira.update({
        where: { codCliente: CodCliente },
        select: {
          codCliente: true,
          saldo: true,
        },
        data: {
          saldo: client.Saldo + Valor,
        },
      });
    } catch (er) {
      throw new UnprocessableEntityException('Transaction operation failed');
    }
  }

  async withdraw(withdrawDto: WithdrawDto): Promise<void | Error> {
    const { CodCliente, Valor } = withdrawDto;
    const client = await this.findOne(CodCliente);
    if (+client.Saldo - Valor < 0) {
      throw new BadRequestException('Saldo insuficiente');
    }
    try {
      await this.prisma.carteira.update({
        where: { codCliente: CodCliente },
        data: {
          saldo: +client.Saldo - Valor,
        },
      });
    } catch (err) {
      throw new UnprocessableEntityException('Transaction operation failed');
    }
  }
}
