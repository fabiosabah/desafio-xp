import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AtivosService } from 'src/ativos/ativos.service';
import { ContasService } from 'src/contas/contas.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { InvestimentosDto } from './dto/investimentos.dto';
import { queryBalance, queryLog, queryQtdAtivo, queryUpsert } from './utils';

@Injectable()
export class InvestimentosService {
  constructor(
    private prisma: PrismaService,
    private ativos: AtivosService,
    private contas: ContasService,
  ) {}

  async buy(investimentosDto: InvestimentosDto): Promise<void | Error> {
    const { codCliente, codAtivo, qtdeAtivo } = investimentosDto;
    const { id: carteiraId, saldo } = await this.contas.findWallet(codCliente);
    const ativo = await this.ativos.findOne(codAtivo);

    if (qtdeAtivo > ativo.QtdeAtivo)
      throw new BadRequestException(
        'The amount of asset to be sold cannot be greater than the amount available in the portfolio.',
      );

    const purchaseAmount = ativo.Valor * qtdeAtivo;

    if (purchaseAmount > saldo) {
      throw new BadRequestException(
        'Insufficient balance to make the purchase',
      );
    }

    const { quantidade } = await this.prisma.carteiraAtivo.upsert({
      where: { carteiraId_codAtivo: { carteiraId, codAtivo: ativo.CodAtivo } },
      update: {},
      create: {
        carteiraId,
        codAtivo: ativo.CodAtivo,
        quantidade: 0,
      },
    });

    const qtdUpsert = qtdeAtivo + quantidade;
    const queryAtivo = queryQtdAtivo(codAtivo, ativo, qtdeAtivo);
    const queryCarteiraAtivo = queryUpsert(carteiraId, codAtivo, qtdUpsert);
    const queryCarteira = queryBalance(carteiraId, saldo, purchaseAmount);
    const queryTransacao = queryLog(codAtivo, carteiraId, qtdeAtivo);

    await this.buyTransactions(
      queryAtivo,
      queryCarteira,
      queryCarteiraAtivo,
      queryTransacao,
    );
  }

  async buyTransactions(
    ativo,
    carteira,
    carteiraAtivo,
    log,
  ): Promise<void | Error> {
    try {
      await this.prisma.$transaction([
        this.prisma.ativo.update(ativo),
        this.prisma.carteira.update(carteira),
        this.prisma.carteiraAtivo.upsert(carteiraAtivo),
        this.prisma.transacaoAtivo.create(log),
      ]);
    } catch (err) {
      throw new UnprocessableEntityException('Transaction operation failed');
    }
  }

  async sell(investimentosDto: InvestimentosDto): Promise<void | Error> {
  }
}
