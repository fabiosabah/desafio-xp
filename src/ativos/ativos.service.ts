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
    const response = ativos.map((ativo) => ({
      CodCliente: ativo.carteira.codCliente,
      CodAtivo: ativo.codAtivo,
      QtdAtivo: ativo.quantidade,
      Valor: +ativo.ativo.valorAtivo,
    }));

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
}
