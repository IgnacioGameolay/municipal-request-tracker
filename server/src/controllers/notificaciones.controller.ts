import { Response } from "express";
import { notificaciones } from "../data/mockDB.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

export function listarNotificaciones(req: AuthRequest, res: Response) {
  if (!req.user) {
    return errorResponse(res, 401, "Debes iniciar sesión");
  }

  const data = notificaciones.filter((n) => n.usuarioId === req.user?.id);

  return successResponse(res, 200, "Notificaciones obtenidas correctamente", data);
}

export function marcarNotificacionLeida(req: AuthRequest, res: Response) {
  const { id } = req.params;

  const notificacion = notificaciones.find((n) => n.id === id);

  if (!notificacion) {
    return errorResponse(res, 404, "Notificación no encontrada");
  }

  if (notificacion.usuarioId !== req.user?.id) {
    return errorResponse(res, 403, "No tienes permisos para modificar esta notificación");
  }

  notificacion.leida = true;

  return successResponse(res, 200, "Notificación marcada como leída", notificacion);
}