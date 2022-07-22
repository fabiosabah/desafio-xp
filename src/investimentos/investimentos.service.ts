import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AtivosService } from 'src/ativos/ativos.service';
import { ContasService } from 'src/contas/contas.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InvestimentosService {
  constructor(
    private prisma: PrismaService,
    private ativos: AtivosService,
    private contas: ContasService,
  ) {}

  async buy(body): Promise<void | Error> {
    const { codCliente, codAtivo, qtdeAtivo } = body;
    const { id } = await this.contas.findWallet(codCliente);
    const ativo = await this.ativos.findOne(codAtivo);

    if (qtdeAtivo > ativo.QtdeAtivo)
      throw new BadRequestException(
        'The amount of asset to be sold cannot be greater than the amount available in the portfolio.',
      );
    const { quantidade } = await this.prisma.carteiraAtivo.findFirst({
      where: { carteiraId: id, codAtivo: ativo.CodAtivo },
    });
    try {
      await this.prisma.$transaction([
        this.prisma.ativo.update({
          where: { codAtivo },
          data: { qtdDisponivel: ativo.QtdeAtivo - qtdeAtivo },
        }),
        this.prisma.carteiraAtivo.upsert({
          where: { carteiraId_codAtivo: { carteiraId: id, codAtivo } },
          update: {
            carteiraId: id,
            codAtivo,
            quantidade: qtdeAtivo + quantidade,
          },
          create: {
            carteiraId: id,
            codAtivo,
            quantidade: qtdeAtivo + quantidade,
          },
        }),
      ]);
    } catch (err) {
      throw new UnprocessableEntityException(
        'An operation failed because it depends on one or more records that were required',
      );
    }
  }

  async sell(body) {}
}
