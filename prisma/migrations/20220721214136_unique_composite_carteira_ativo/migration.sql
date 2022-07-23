/*
  Warnings:

  - A unique constraint covering the columns `[carteiraId,codAtivo]` on the table `CarteiraAtivo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CarteiraAtivo_carteiraId_codAtivo_key" ON "CarteiraAtivo"("carteiraId", "codAtivo");
