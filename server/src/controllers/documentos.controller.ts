import { Response } from "express";
import fs from "node:fs";
import path from "node:path";

import { prisma } from "../config/prisma.js";
import { documentos } from "../data/mockDB.js";
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





async function obtenerSolicitudValida(req: AuthRequest, res: Response) {
  const { id } = req.params;

  if (!req.user) {
    errorResponse(res, 401, "Debes iniciar sesión");
    return null;
  }

  if (!id || typeof id !== "string") {
    errorResponse(res, 400, "ID de solicitud inválido", [
      { field: "id", code: "invalid_param" },
    ]);
    return null;
  }

  const solicitud = await prisma.solicitud.findUnique({
    where: { id },
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
export async function listarDocumentosSolicitud(req: AuthRequest, res: Response) {
  const solicitud = await obtenerSolicitudValida(req, res);
}
export async function subirDocumentoSolicitud(req: AuthRequest, res: Response) {
  const solicitud = await obtenerSolicitudValida(req, res);
}
export async function descargarDocumentoSolicitud(req: AuthRequest, res: Response) {
  const solicitud = await obtenerSolicitudValida(req, res);
}
export async function eliminarDocumentoSolicitud(req: AuthRequest, res: Response) {
  const solicitud = await obtenerSolicitudValida(req, res);
}