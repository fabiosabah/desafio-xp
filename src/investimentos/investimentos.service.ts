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
    const { codCliente, codAtivo, qtdeAtivo } = investimentosDto;
    const { quantidade: qtdAtual, carteiraId } =
      await this.prisma.carteiraAtivo.findFirst({
        where: {
          codAtivo,
          carteira: {
            codCliente,
          },
        },
      });
    if (!qtdAtual || qtdAtual < qtdeAtivo) {
      throw new BadRequestException(
        'Portfolio does not have this amount of assets',
      );
    }
    const { QtdeAtivo: totalAssets, Valor } = await this.ativos.findOne(
      codAtivo,
    );
    const { saldo: balance } = await this.contas.findWallet(codCliente);
    const qtdDisponivel = qtdeAtivo + totalAssets;
    const quantidade = qtdAtual - qtdeAtivo;
    const valueTransaction = Valor * qtdeAtivo;
    const saldo = +balance + valueTransaction;

    try {
      await this.prisma.$transaction([
        this.prisma.carteiraAtivo.update({
          where: {
            carteiraId_codAtivo: {
              carteiraId,
              codAtivo,
            },
          },
          data: { quantidade },
        }),
        this.prisma.ativo.update({
          where: {
            codAtivo,
          },
          data: { qtdDisponivel },
        }),
        this.prisma.carteira.update({
          where: { codCliente },
          data: { saldo },
        }),
        this.prisma.transacaoAtivo.create({
          data: {
            tipo: 'VENDA',
            codAtivo,
            carteiraId,
            qtdTransacao: qtdeAtivo,
          },
        }),
      ]);
    } catch (error) {
      throw new UnprocessableEntityException('Transaction operation failed');
    }
  }
}
