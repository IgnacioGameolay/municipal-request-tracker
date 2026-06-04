-- CreateEnum
CREATE TYPE "RolUsuario" AS ENUM ('ciudadano', 'funcionario');

-- CreateEnum
CREATE TYPE "EstadoSolicitud" AS ENUM ('pendiente', 'en_revision', 'resuelta', 'rechazada');

-- CreateEnum
CREATE TYPE "PrioridadSolicitud" AS ENUM ('baja', 'media', 'alta');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "rut" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "comuna" TEXT NOT NULL,
    "rol" "RolUsuario" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitudes" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "funcionario_id" TEXT,
    "titulo" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "comuna" TEXT NOT NULL,
    "estado" "EstadoSolicitud" NOT NULL DEFAULT 'pendiente',
    "prioridad" "PrioridadSolicitud" NOT NULL DEFAULT 'media',
    "comentario_funcionario" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "solicitudes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos_solicitud" (
    "id" TEXT NOT NULL,
    "solicitud_id" TEXT NOT NULL,
    "subido_por_usuario_id" TEXT NOT NULL,
    "nombre_original" TEXT NOT NULL,
    "nombre_almacenado" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "size_bytes" INTEGER NOT NULL,
    "ruta" TEXT NOT NULL,
    "hash_archivo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documentos_solicitud_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notificaciones" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "solicitud_id" TEXT,
    "titulo" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "leida" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notificaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historial_solicitudes" (
    "id" TEXT NOT NULL,
    "solicitud_id" TEXT NOT NULL,
    "usuario_actor_id" TEXT NOT NULL,
    "accion" TEXT NOT NULL,
    "estado_anterior" "EstadoSolicitud",
    "estado_nuevo" "EstadoSolicitud",
    "comentario" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "historial_solicitudes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mensajes_solicitud" (
    "id" TEXT NOT NULL,
    "solicitud_id" TEXT NOT NULL,
    "emisor_id" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "leido" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mensajes_solicitud_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "solicitudes" ADD CONSTRAINT "solicitudes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitudes" ADD CONSTRAINT "solicitudes_funcionario_id_fkey" FOREIGN KEY ("funcionario_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_solicitud" ADD CONSTRAINT "documentos_solicitud_solicitud_id_fkey" FOREIGN KEY ("solicitud_id") REFERENCES "solicitudes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_solicitud" ADD CONSTRAINT "documentos_solicitud_subido_por_usuario_id_fkey" FOREIGN KEY ("subido_por_usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificaciones" ADD CONSTRAINT "notificaciones_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificaciones" ADD CONSTRAINT "notificaciones_solicitud_id_fkey" FOREIGN KEY ("solicitud_id") REFERENCES "solicitudes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historial_solicitudes" ADD CONSTRAINT "historial_solicitudes_solicitud_id_fkey" FOREIGN KEY ("solicitud_id") REFERENCES "solicitudes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historial_solicitudes" ADD CONSTRAINT "historial_solicitudes_usuario_actor_id_fkey" FOREIGN KEY ("usuario_actor_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensajes_solicitud" ADD CONSTRAINT "mensajes_solicitud_solicitud_id_fkey" FOREIGN KEY ("solicitud_id") REFERENCES "solicitudes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensajes_solicitud" ADD CONSTRAINT "mensajes_solicitud_emisor_id_fkey" FOREIGN KEY ("emisor_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
