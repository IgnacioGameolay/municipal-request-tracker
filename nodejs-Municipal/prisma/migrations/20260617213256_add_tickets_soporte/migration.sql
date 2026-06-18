-- CreateTable
CREATE TABLE "tickets_soporte" (
    "id" TEXT NOT NULL,
    "solicitud_id" TEXT,
    "usuario_id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "comentario" TEXT NOT NULL,
    "respuesta_funcionario" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'pendiente',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tickets_soporte_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tickets_soporte_usuario_id_idx" ON "tickets_soporte"("usuario_id");

-- CreateIndex
CREATE INDEX "tickets_soporte_solicitud_id_idx" ON "tickets_soporte"("solicitud_id");

-- CreateIndex
CREATE INDEX "tickets_soporte_estado_idx" ON "tickets_soporte"("estado");

-- AddForeignKey
ALTER TABLE "tickets_soporte" ADD CONSTRAINT "tickets_soporte_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets_soporte" ADD CONSTRAINT "tickets_soporte_solicitud_id_fkey" FOREIGN KEY ("solicitud_id") REFERENCES "solicitudes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
