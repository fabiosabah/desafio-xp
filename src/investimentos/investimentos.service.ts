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
    await this.contas.findOne(codCliente);
    const ativo = await this.ativos.findOne(codAtivo);
    if (qtdeAtivo > ativo.QtdeAtivo)
      throw new BadRequestException(
        'A Quantidade de ativo a ser vendida não pode ser maior que a quantidade disponível na carteira',
      );
    const { id } = await this.prisma.carteira.findFirst({
      where: { codCliente },
    });
    await this.prisma.ativo.update({
      where: { codAtivo },
      data: { qtdDisponivel: ativo.QtdeAtivo - qtdeAtivo },
    });

    return ativo;
  }

  async sell(body) {}
}
