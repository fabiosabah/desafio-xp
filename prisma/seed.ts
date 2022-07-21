import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// fazer umas classes para nao escrever isso na mão

async function main() {
  await prisma.conta.upsert({
    where: { email: 'timbersaw@valve.com' },
    update: {},
    create: {
      email: 'timbersaw@valve.com',
      password: 'pass123456',
    },
  });
  await prisma.conta.upsert({
    where: { email: 'phantomlancer@valve.com' },
    update: {},
    create: {
      email: 'phantomlance@valve.com',
      password: 'pass123456',
    },
  });

  await prisma.conta.upsert({
    where: { email: 'meshuggah@metal.com' },
    update: {},
    create: {
      email: 'meshuggah@music.com',
      password: 'pass123456',
    },
  });

  await prisma.conta.upsert({
    where: { email: 'goldlink@music.com' },
    update: {},
    create: {
      email: 'goldlink@music.com',
      password: 'pass123456',
    },
  });

  await prisma.conta.upsert({
    where: { email: 'baianasystem@music.com' },
    update: {},
    create: {
      email: 'baianasystem@music.com',
      password: 'pass123456',
    },
  });

  await prisma.conta.upsert({
    where: { email: 'erykahbadu@music.com' },
    update: {},
    create: {
      email: 'erykahbadu@music.com',
      password: 'pass123456',
    },
  });

  await prisma.carteira.upsert({
    where: { codCliente: 1 },
    update: {},
    create: {
      codCliente: 1,
      saldo: 2000.0,
    },
  });

  await prisma.carteira.upsert({
    where: { codCliente: 2 },
    update: {},
    create: {
      codCliente: 2,
      saldo: 600.0,
    },
  });

  await prisma.carteira.upsert({
    where: { codCliente: 3 },
    update: {},
    create: {
      codCliente: 3,
      saldo: 7000.0,
    },
  });

  await prisma.carteira.upsert({
    where: { codCliente: 4 },
    update: {},
    create: {
      codCliente: 4,
      saldo: 622.42,
    },
  });

  await prisma.carteira.upsert({
    where: { codCliente: 5 },
    update: {},
    create: {
      codCliente: 5,
      saldo: 5000.0,
    },
  });

  await prisma.carteira.upsert({
    where: { codCliente: 6 },
    update: {},
    create: {
      codCliente: 6,
      saldo: 2174.25,
    },
  });

  await prisma.ativo.upsert({
    where: { codAtivo: 1 },
    update: {},
    create: {
      acao: 'CIEL3',
      codAtivo: 1,
      qtdDisponivel: 1144359228,
      valorAtivo: 4.06,
    },
  });

  await prisma.ativo.upsert({
    where: { codAtivo: 2 },
    update: {},
    create: {
      acao: 'COGN3',
      codAtivo: 2,
      qtdDisponivel: 34097800,
      valorAtivo: 2.06,
    },
  });
  await prisma.ativo.upsert({
    where: { codAtivo: 3 },
    update: {},
    create: {
      acao: 'RRRP3',
      codAtivo: 3,
      qtdDisponivel: 1563400,
      valorAtivo: 31.22,
    },
  });
  await prisma.ativo.upsert({
    where: { codAtivo: 4 },
    update: {},
    create: {
      acao: 'XP',
      codAtivo: 4,
      qtdDisponivel: 1042797,
      valorAtivo: 18.06,
    },
  });
  await prisma.ativo.upsert({
    where: { codAtivo: 5 },
    update: {},
    create: {
      acao: 'BRKM5',
      codAtivo: 5,
      qtdDisponivel: 579600,
      valorAtivo: 34.11,
    },
  });
  await prisma.ativo.upsert({
    where: { codAtivo: 6 },
    update: {},
    create: {
      acao: 'ALPA4',
      codAtivo: 6,
      qtdDisponivel: 2348200,
      valorAtivo: 21.46,
    },
  });
  await prisma.ativo.upsert({
    where: { codAtivo: 7 },
    update: {},
    create: {
      acao: 'ABEV3',
      codAtivo: 7,
      qtdDisponivel: 18915200,
      valorAtivo: 14.23,
    },
  });
  // carteira ativo

  await prisma.carteiraAtivo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      carteiraId: 1,
      codAtivo: 5,
      quantidade: 124,
    },
  });

  await prisma.carteiraAtivo.upsert({
    where: { id: 2 },
    update: {},
    create: {
      carteiraId: 1,
      codAtivo: 7,
      quantidade: 500,
    },
  });

  await prisma.carteiraAtivo.upsert({
    where: { id: 3 },
    update: {},
    create: {
      carteiraId: 2,
      codAtivo: 6,
      quantidade: 50,
    },
  });

  await prisma.carteiraAtivo.upsert({
    where: { id: 4 },
    update: {},
    create: {
      carteiraId: 2,
      codAtivo: 4,
      quantidade: 150,
    },
  });

  await prisma.carteiraAtivo.upsert({
    where: { id: 5 },
    update: {},
    create: {
      carteiraId: 3,
      codAtivo: 4,
      quantidade: 550,
    },
  });

  await prisma.carteiraAtivo.upsert({
    where: { id: 6 },
    update: {},
    create: {
      carteiraId: 3,
      codAtivo: 6,
      quantidade: 20,
    },
  });

  await prisma.carteiraAtivo.upsert({
    where: { id: 7 },
    update: {},
    create: {
      carteiraId: 5,
      codAtivo: 3,
      quantidade: 12,
    },
  });

  await prisma.carteiraAtivo.upsert({
    where: { id: 8 },
    update: {},
    create: {
      carteiraId: 5,
      codAtivo: 5,
      quantidade: 100,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
