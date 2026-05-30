import { Response } from "express";

import { prisma } from "../config/prisma.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

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

export async function listarNotificaciones(req: AuthRequest, res: Response) {
  if (!req.user) {
    return errorResponse(res, 401, "Debes iniciar sesión", [
      { code: "missing_user" },
    ]);
  }

  const notificaciones = await prisma.notificacion.findMany({
    where: {
      usuarioId: req.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return successResponse(
    res,
    200,
    "Notificaciones obtenidas correctamente",
    notificaciones,
  );
}

export async function marcarNotificacionLeida(
  req: AuthRequest,
  res: Response,
) {
  if (!req.user) {
    return errorResponse(res, 401, "Debes iniciar sesión", [
      { code: "missing_user" },
    ]);
  }

  const id = obtenerParametroId(req.params.id);

  if (!id) {
    return errorResponse(res, 400, "ID de notificación inválido", [
      { field: "id", code: "invalid_param" },
    ]);
  }

  const notificacion = await prisma.notificacion.findUnique({
    where: { id },
  });

  if (!notificacion) {
    return errorResponse(res, 404, "Notificación no encontrada", [
      { field: "id", code: "not_found" },
    ]);
  }

  if (notificacion.usuarioId !== req.user.id) {
    return errorResponse(
      res,
      403,
      "No tienes permisos para modificar esta notificación",
      [{ code: "forbidden" }],
    );
  }

  const notificacionActualizada = await prisma.notificacion.update({
    where: { id },
    data: {
      leida: true,
    },
  });

  return successResponse(
    res,
    200,
    "Notificación marcada como leída",
    notificacionActualizada,
  );
}