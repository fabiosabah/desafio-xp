import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class AtivosService {
  constructor(private prisma: PrismaService) {}

  async findOne(codAtivo) {
    const ativo = await this.prisma.ativo.findFirst({
      where: { codAtivo },
    });
    const response = {
      CodAtivo: ativo.codAtivo,
      QtdeAtivo: ativo.qtdDisponivel,
      Valor: +ativo.valorAtivo,
    };
    return response;
  }

  async findAll(codCliente) {
    const ativos = await this.prisma.carteiraAtivo.findMany({
      where: {
        carteira: { codCliente },
      },
      include: {
        carteira: true,
        ativo: true,
      },
    });
    const response = ativos.map((ativo) => {
      return {
        CodCliente: ativo.carteira.codCliente,
        CodAtivo: ativo.codAtivo,
        QtdAtivo: ativo.quantidade,
        Valor: +ativo.ativo.valorAtivo,
      };
    });

    return response;
  }
}
