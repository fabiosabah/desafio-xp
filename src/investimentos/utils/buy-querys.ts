export const queryUpsert = (
  carteiraId: number,
  codAtivo: number,
  quantidade: number,
) => ({
  where: { carteiraId_codAtivo: { carteiraId, codAtivo } },
  update: {
    carteiraId,
    codAtivo,
    quantidade,
  },
  create: {
    carteiraId,
    codAtivo,
    quantidade,
  },
});

export const queryBalance = (
  id: number,
  saldo: number,
  purchaseAmount: number,
) => ({
  where: { id },
  data: {
    saldo: saldo - purchaseAmount,
  },
});

export const queryQtdAtivo = (codAtivo, ativo, qtdeAtivo) => ({
  where: { codAtivo },
  data: { qtdDisponivel: ativo.QtdeAtivo - qtdeAtivo },
});

export const queryLog = (codAtivo, carteiraId, qtdeAtivo) => ({
  data: {
    tipo: 'COMPRA',
    codAtivo,
    carteiraId,
    qtdTransacao: qtdeAtivo,
  },
});
