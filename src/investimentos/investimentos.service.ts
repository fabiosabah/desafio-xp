import { BadRequestException, Injectable } from '@nestjs/common';
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

  async buy(body) {
    const { codCliente, codAtivo, qtdeAtivo } = body;
    const wallet = await this.contas.findWallet(codCliente);
    const ativo = await this.ativos.findOne(codAtivo);
    if (qtdeAtivo > ativo.QtdeAtivo)
      throw new BadRequestException(
        'A Quantidade de ativo a ser vendida não pode ser maior que a quantidade disponível na carteira',
      );

    // const data = await this.prisma.$transaction([
    //   this.prisma.ativo.update({
    //     where: { codAtivo },
    //     data: { qtdDisponivel: ativo.QtdeAtivo - qtdeAtivo },
    //   }),
    //   this.prisma.carteiraAtivo.upsert({
    //     where: { carteiraId_codAtivo: { carteiraId: id, codAtivo } },
    //     update: { carteiraId: id, codAtivo, quantidade: qtdeAtivo },
    //     create: { carteiraId: id, codAtivo, quantidade: qtdeAtivo },
    //   }),
    // ]);

    return wallet;
  }

  async sell(body) {}
}
