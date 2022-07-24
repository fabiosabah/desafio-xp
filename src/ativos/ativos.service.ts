import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class AtivosService {
  constructor(private prisma: PrismaService) {}

  async findOne(codAtivo) {
    const ativo = await this.prisma.ativo.findFirst({
      where: { codAtivo },
    });
    if (!ativo) {
      throw new NotFoundException(`Ativo #${codAtivo} não encontrado`);
    }
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
    const response = ativos
      .map((ativo) => ({
        CodCliente: ativo.carteira.codCliente,
        CodAtivo: ativo.codAtivo,
        QtdAtivo: ativo.quantidade,
        Valor: +ativo.ativo.valorAtivo,
      }))
      .filter((item) => item.QtdAtivo != 0);
    return response;
  }

  async findCarteiraAtivo(carteiraId, codAtivo) {
    return await this.prisma.carteiraAtivo.findUnique({
      where: {
        carteiraId_codAtivo: {
          carteiraId,
          codAtivo,
        },
      },
    });
  }

  async groupAtivos() {
    const ativos = await this.prisma.ativo.findMany();
    const groupQtd = await this.groupQtd();
    return ativos.map((item) => {
      const QtdInvestida = groupQtd.find((i) => i.codAtivo === item.codAtivo);
      return {
        Acao: item.acao,
        CodAtivo: item.codAtivo,
        QtdeDisponivel: item.qtdDisponivel,
        QtdInvestida: QtdInvestida?._sum.quantidade || 0,
        Valor: +item.valorAtivo,
      };
    });
  }

  async groupQtd() {
    return await this.prisma.carteiraAtivo.groupBy({
      by: ['codAtivo'],
      _sum: {
        quantidade: true,
      },
    });
  }
}
