import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const conta1 = await prisma.conta.upsert({
    where: { codCliente: 1 },
    update: {},
    create: {
      username: 'Fábio',
      password: 'pass123',
      codCliente: 1,
    },
  });
  const conta2 = await prisma.conta.upsert({
    where: { codCliente: 2 },
    update: {},
    create: {
      username: 'Gaby',
      password: 'pass123',
      codCliente: 2,
    },
  });
  console.log(conta1, conta2);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit();
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
