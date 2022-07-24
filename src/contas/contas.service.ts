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

  async findOne(codCliente: number, decimal = false): Promise<any | Error> {
    const cliente = await this.findWallet(codCliente);
    return {
      CodCliente: cliente.codCliente,
      Saldo: decimal ? cliente.saldo / 100 : cliente.saldo,
    };
  }

  async findWallet(codCliente: number): Promise<CarteiraEntity> {
    const cliente = await this.prisma.carteira.findUnique({
      where: { codCliente },
    });
    if (!cliente) {
      throw new NotFoundException(`Client #${codCliente} not found`);
    }
    return cliente;
  }

  async deposit(depositDto: DepositDto): Promise<any | void | Error> {
    const { CodCliente } = depositDto;
    const valor = depositDto.Valor * 100;
    const client = await this.findOne(CodCliente);
    try {
      await this.prisma.carteira.update({
        where: { codCliente: CodCliente },
        select: {
          codCliente: true,
          saldo: true,
        },
        data: {
          saldo: client.Saldo + valor,
        },
      });
    } catch (er) {
      throw new UnprocessableEntityException('Transaction operation failed');
    }
  }

  async withdraw(withdrawDto: WithdrawDto): Promise<void | Error> {
    const { CodCliente } = withdrawDto;
    const valor = withdrawDto.Valor * 100;
    const client = await this.findOne(CodCliente);
    if (client.Saldo - valor < 0) {
      throw new BadRequestException('Insufficient funds');
    }
    try {
      await this.prisma.carteira.update({
        where: { codCliente: CodCliente },
        data: {
          saldo: client.Saldo - valor,
        },
      });
    } catch (err) {
      throw new UnprocessableEntityException('Transaction operation failed');
    }
  }
}
