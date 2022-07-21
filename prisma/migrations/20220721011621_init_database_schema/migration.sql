-- CreateTable
CREATE TABLE "TransacaoSaldo" (
    "id" SERIAL NOT NULL,
    "codCliente" INTEGER NOT NULL,
    "valor" DECIMAL(9,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "TransacaoSaldo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conta" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "codCliente" SERIAL NOT NULL,

    CONSTRAINT "Conta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carteira" (
    "id" SERIAL NOT NULL,
    "saldo" DECIMAL(9,2) NOT NULL DEFAULT 0,
    "codCliente" INTEGER NOT NULL,

    CONSTRAINT "Carteira_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarteiraAtivo" (
    "id" SERIAL NOT NULL,
    "carteiraId" INTEGER NOT NULL,
    "codAtivo" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "CarteiraAtivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ativo" (
    "id" SERIAL NOT NULL,
    "acao" TEXT NOT NULL,
    "codAtivo" TEXT NOT NULL,
    "qtdDisponivel" INTEGER NOT NULL,
    "valorAtivo" DECIMAL(9,2) NOT NULL,

    CONSTRAINT "Ativo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransacaoAtivo" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "codAtivo" TEXT NOT NULL,
    "carteiraId" INTEGER NOT NULL,
    "qtdTransacao" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TransacaoAtivo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TransacaoSaldo_codCliente_key" ON "TransacaoSaldo"("codCliente");

-- CreateIndex
CREATE UNIQUE INDEX "Conta_email_key" ON "Conta"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Conta_codCliente_key" ON "Conta"("codCliente");

-- CreateIndex
CREATE UNIQUE INDEX "Carteira_codCliente_key" ON "Carteira"("codCliente");

-- CreateIndex
CREATE UNIQUE INDEX "Ativo_codAtivo_key" ON "Ativo"("codAtivo");

-- AddForeignKey
ALTER TABLE "TransacaoSaldo" ADD CONSTRAINT "TransacaoSaldo_codCliente_fkey" FOREIGN KEY ("codCliente") REFERENCES "Conta"("codCliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carteira" ADD CONSTRAINT "Carteira_codCliente_fkey" FOREIGN KEY ("codCliente") REFERENCES "Conta"("codCliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarteiraAtivo" ADD CONSTRAINT "CarteiraAtivo_carteiraId_fkey" FOREIGN KEY ("carteiraId") REFERENCES "Carteira"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarteiraAtivo" ADD CONSTRAINT "CarteiraAtivo_codAtivo_fkey" FOREIGN KEY ("codAtivo") REFERENCES "Ativo"("codAtivo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransacaoAtivo" ADD CONSTRAINT "TransacaoAtivo_codAtivo_fkey" FOREIGN KEY ("codAtivo") REFERENCES "Ativo"("codAtivo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransacaoAtivo" ADD CONSTRAINT "TransacaoAtivo_carteiraId_fkey" FOREIGN KEY ("carteiraId") REFERENCES "Carteira"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
