import { Request, Response } from "express";
import fs from "node:fs";
import path from "node:path";
import { documentos, solicitudes } from "../data/mockDB.js";
import {
  DocumentoSolicitud,
  MAX_DOCUMENTOS_POR_SOLICITUD,
} from "../models/documento.model.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";


function obtenerParametroRuta(
  req: AuthRequest,
  nombre: string,
): string | null {
  const valor = req.params[nombre];

  if (Array.isArray(valor)) {
    return valor[0] ?? null;
  }

  if (typeof valor === "string") {
    return valor;
  }

  return null;
}



function usuarioPuedeAccederSolicitud(
  req: AuthRequest,
  solicitudId: string,
): boolean {
  const solicitud = solicitudes.find((s) => s.id === solicitudId);

  if (!solicitud || !req.user) {
    return false;
  }

  if (req.user.rol === "funcionario") {
    return true;
  }

  return solicitud.usuarioId === req.user.id;
}

function obtenerSolicitudValida(req: AuthRequest, res: Response) {
  const id = obtenerParametroRuta(req, "id");

  if (!id) {
    errorResponse(res, 400, "El id de la solicitud es inválido", [
      { field: "id", code: "invalid_param" },
    ]);
    return null;
  }

  const solicitud = solicitudes.find((s) => s.id === id);

  if (!solicitud) {
    errorResponse(res, 404, "Solicitud no encontrada", [
      { field: "id", code: "not_found" },
    ]);
    return null;
  }

  if (!usuarioPuedeAccederSolicitud(req, id)) {
    errorResponse(res, 403, "No tienes permisos para acceder a esta solicitud", [
      { code: "forbidden" },
    ]);
    return null;
  }

  return solicitud;
}

export function listarDocumentosSolicitud(req: AuthRequest, res: Response) {
  const solicitud = obtenerSolicitudValida(req, res);

  if (!solicitud) {
    return;
  }

  const documentosSolicitud = documentos.filter(
    (documento) => documento.solicitudId === solicitud.id,
  );

  return successResponse(
    res,
    200,
    "Documentos obtenidos correctamente",
    documentosSolicitud,
  );
}

export function subirDocumentoSolicitud(req: AuthRequest, res: Response) {
  const solicitud = obtenerSolicitudValida(req, res);

  if (!solicitud) {
    if (req.file?.path) {
      fs.unlinkSync(req.file.path);
    }
    return;
  }

  if (!req.user) {
    if (req.file?.path) {
      fs.unlinkSync(req.file.path);
    }

    return errorResponse(res, 401, "Debes iniciar sesión");
  }

  if (!req.file) {
    return errorResponse(res, 400, "Debes adjuntar un archivo", [
      { field: "documento", code: "required" },
    ]);
  }

  const documentosSolicitud = documentos.filter(
    (documento) => documento.solicitudId === solicitud.id,
  );

  if (documentosSolicitud.length >= MAX_DOCUMENTOS_POR_SOLICITUD) {
    fs.unlinkSync(req.file.path);

    return errorResponse(
      res,
      400,
      `No se pueden adjuntar más de ${MAX_DOCUMENTOS_POR_SOLICITUD} documentos por solicitud`,
      [{ field: "documento", code: "max_documents" }],
    );
  }

  const nuevoDocumento: DocumentoSolicitud = {
    id: `doc${Date.now()}`,
    solicitudId: solicitud.id,
    subidoPorUsuarioId: req.user.id,
    nombreOriginal: req.file.originalname,
    nombreAlmacenado: req.file.filename,
    mimeType: req.file.mimetype,
    sizeBytes: req.file.size,
    ruta: req.file.path,
    createdAt: new Date().toISOString(),
  };

  documentos.push(nuevoDocumento);

  return successResponse(
    res,
    201,
    "Documento incorporado correctamente al expediente de la solicitud",
    nuevoDocumento,
  );
}

export function descargarDocumentoSolicitud(req: AuthRequest, res: Response) {
  const solicitud = obtenerSolicitudValida(req, res);

  if (!solicitud) {
    return;
  }

  const documentoId = obtenerParametroRuta(req, "documentoId");

if (!documentoId) {
  return errorResponse(res, 400, "El id del documento es inválido", [
    { field: "documentoId", code: "invalid_param" },
  ]);
}
  const documento = documentos.find(
    (doc) => doc.id === documentoId && doc.solicitudId === solicitud.id,
  );

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

export function eliminarDocumentoSolicitud(req: AuthRequest, res: Response) {
  const solicitud = obtenerSolicitudValida(req, res);

  if (!solicitud) {
    return;
  }

  const documentoId = obtenerParametroRuta(req, "documentoId");

    if (!documentoId) {
    return errorResponse(res, 400, "El id del documento es inválido", [
        { field: "documentoId", code: "invalid_param" },
    ]);
    }

  const index = documentos.findIndex(
    (doc) => doc.id === documentoId && doc.solicitudId === solicitud.id,
  );

  if (index === -1) {
    return errorResponse(res, 404, "Documento no encontrado", [
      { field: "documentoId", code: "not_found" },
    ]);
  }

  const documento = documentos[index];

  if (req.user?.rol !== "funcionario" && documento.subidoPorUsuarioId !== req.user?.id) {
    return errorResponse(res, 403, "No tienes permisos para eliminar este documento", [
      { code: "forbidden" },
    ]);
  }

  if (fs.existsSync(documento.ruta)) {
    fs.unlinkSync(documento.ruta);
  }

  documentos.splice(index, 1);

  return successResponse(res, 200, "Documento eliminado correctamente", {
    id: documentoId,
  });
}