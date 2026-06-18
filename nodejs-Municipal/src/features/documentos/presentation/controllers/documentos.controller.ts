import type { Prisma } from "@prisma/client";
import { Response } from "express";
import fs from "node:fs";
import path from "node:path";
import { prisma } from "../../../../core/config/prisma.js";
import {
  MAX_DOCUMENTOS_POR_SOLICITUD,
} from "../../domain/entities/documento.model.js";
import { AuthRequest } from "../../../../core/middleware/auth.middleware.js";
import { successResponse, errorResponse } from "../../../../core/utils/apiResponse.js";

function obtenerParametroId(
  valor: string | string[] | undefined,
): string | null {
  if (typeof valor === "string" && valor.trim() !== "") {
    return valor;
  }

  if (Array.isArray(valor) && typeof valor[0] === "string") {
    return valor[0];
  }

  return null;
}

function eliminarArchivoSiExiste(rutaArchivo?: string) {
  if (!rutaArchivo) {
    return;
  }

  try {
    if (fs.existsSync(rutaArchivo)) {
      fs.unlinkSync(rutaArchivo);
    }
  } catch (error) {
    console.error("No se pudo eliminar archivo:", rutaArchivo, error);
  }
}

async function obtenerSolicitudValida(req: AuthRequest, res: Response) {
  if (!req.user) {
    errorResponse(res, 401, "Debes iniciar sesión", [
      { code: "missing_user" },
    ]);
    return null;
  }

  const solicitudId = obtenerParametroId(req.params.id);

  if (!solicitudId) {
    errorResponse(res, 400, "ID de solicitud inválido", [
      { field: "id", code: "invalid_param" },
    ]);
    return null;
  }

  const solicitud = await prisma.solicitud.findUnique({
    where: { id: solicitudId },
  });

  if (!solicitud) {
    errorResponse(res, 404, "Solicitud no encontrada", [
      { field: "id", code: "not_found" },
    ]);
    return null;
  }

  if (req.user.rol !== "funcionario" && solicitud.usuarioId !== req.user.id) {
    errorResponse(res, 403, "No tienes permisos para acceder a esta solicitud", [
      { code: "forbidden" },
    ]);
    return null;
  }

  return solicitud;
}

export async function listarDocumentosSolicitud(
  req: AuthRequest,
  res: Response,
) {
  const solicitud = await obtenerSolicitudValida(req, res);

  if (!solicitud) {
    return;
  }

  const documentos = await prisma.documentoSolicitud.findMany({
    where: {
      solicitudId: solicitud.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return successResponse(
    res,
    200,
    "Documentos obtenidos correctamente",
    documentos,
  );
}

export async function subirDocumentoSolicitud(
  req: AuthRequest,
  res: Response,
) {
  const solicitud = await obtenerSolicitudValida(req, res);

  if (!solicitud) {
    eliminarArchivoSiExiste(req.file?.path);
    return;
  }

  if (!req.user) {
    eliminarArchivoSiExiste(req.file?.path);

    return errorResponse(res, 401, "Debes iniciar sesión", [
      { code: "missing_user" },
    ]);
  }

  if (!req.file) {
    return errorResponse(res, 400, "Debes adjuntar un archivo", [
      { field: "documento", code: "required" },
    ]);
  }

  const totalDocumentos = await prisma.documentoSolicitud.count({
    where: {
      solicitudId: solicitud.id,
    },
  });

  if (totalDocumentos >= MAX_DOCUMENTOS_POR_SOLICITUD) {
    eliminarArchivoSiExiste(req.file.path);

    return errorResponse(
      res,
      400,
      `No se pueden adjuntar más de ${MAX_DOCUMENTOS_POR_SOLICITUD} documentos por solicitud`,
      [{ field: "documento", code: "max_documents" }],
    );
  }

  const nuevoDocumento = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const documento = await tx.documentoSolicitud.create({
      data: {
        solicitudId: solicitud.id,
        subidoPorUsuarioId: req.user!.id,
        nombreOriginal: req.file!.originalname,
        nombreAlmacenado: req.file!.filename,
        mimeType: req.file!.mimetype,
        sizeBytes: req.file!.size,
        ruta: req.file!.path,
      },
    });

    await tx.historialSolicitud.create({
      data: {
        solicitudId: solicitud.id,
        usuarioActorId: req.user!.id,
        accion: "subida_documento",
        estadoAnterior: solicitud.estado,
        estadoNuevo: solicitud.estado,
        comentario: `Documento incorporado al expediente: ${req.file!.originalname}`,
      },
    });

    // [Paso 5] - Notificar al funcionario cuando el solicitante sube lo que se le pidió
    if (req.user!.rol !== "funcionario" && solicitud.funcionarioId) {
      await tx.notificacion.create({
        data: {
          usuarioId: solicitud.funcionarioId,
          solicitudId: solicitud.id,
          titulo: "Solicitud modificada",
          mensaje: `El solicitante ha subido el documento requerido (${req.file!.originalname}) a la solicitud "${solicitud.titulo}".`,
          leida: false,
        },
      });
    }

    return documento;
  });

  return successResponse(
    res,
    201,
    "Documento incorporado correctamente al expediente de la solicitud",
    nuevoDocumento,
  );
}

export async function descargarDocumentoSolicitud(
  req: AuthRequest,
  res: Response,
) {
  const solicitud = await obtenerSolicitudValida(req, res);

  if (!solicitud) {
    return;
  }

  const documentoId = obtenerParametroId(req.params.documentoId);

  if (!documentoId) {
    return errorResponse(res, 400, "ID de documento inválido", [
      { field: "documentoId", code: "invalid_param" },
    ]);
  }

  const documento = await prisma.documentoSolicitud.findFirst({
    where: {
      id: documentoId,
      solicitudId: solicitud.id,
    },
  });

  if (!documento) {
    return errorResponse(res, 404, "Documento no encontrado", [
      { field: "documentoId", code: "not_found" },
    ]);
  }

  const rutaAbsoluta = path.resolve(documento.ruta);

  if (!fs.existsSync(rutaAbsoluta)) {
    return errorResponse(res, 404, "El archivo físico no existe en el servidor", [
      { field: "documentoId", code: "file_missing" },
    ]);
  }

  return res.download(rutaAbsoluta, documento.nombreOriginal);
}

export async function eliminarDocumentoSolicitud(
  req: AuthRequest,
  res: Response,
) {
  const solicitud = await obtenerSolicitudValida(req, res);

  if (!solicitud) {
    return;
  }

  if (!req.user) {
    return errorResponse(res, 401, "Debes iniciar sesión", [
      { code: "missing_user" },
    ]);
  }

  const documentoId = obtenerParametroId(req.params.documentoId);

  if (!documentoId) {
    return errorResponse(res, 400, "ID de documento inválido", [
      { field: "documentoId", code: "invalid_param" },
    ]);
  }

  const documento = await prisma.documentoSolicitud.findFirst({
    where: {
      id: documentoId,
      solicitudId: solicitud.id,
    },
  });

  if (!documento) {
    return errorResponse(res, 404, "Documento no encontrado", [
      { field: "documentoId", code: "not_found" },
    ]);
  }

  if (
    req.user.rol !== "funcionario" &&
    documento.subidoPorUsuarioId !== req.user.id
  ) {
    return errorResponse(res, 403, "No tienes permisos para eliminar este documento", [
      { code: "forbidden" },
    ]);
  }

  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    await tx.historialSolicitud.create({
      data: {
        solicitudId: solicitud.id,
        usuarioActorId: req.user!.id,
        accion: "eliminacion_documento",
        estadoAnterior: solicitud.estado,
        estadoNuevo: solicitud.estado,
        comentario: `Documento eliminado del expediente: ${documento.nombreOriginal}`,
      },
    });

    await tx.documentoSolicitud.delete({
      where: {
        id: documento.id,
      },
    });
  });

  eliminarArchivoSiExiste(documento.ruta);

  return successResponse(res, 200, "Documento eliminado correctamente", {
    id: documentoId,
  });
}