/*
  Warnings:

  - A unique constraint covering the columns `[rut]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "usuarios_rut_key" ON "usuarios"("rut");
