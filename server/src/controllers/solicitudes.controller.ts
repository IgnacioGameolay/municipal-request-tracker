import { Response } from "express";
import { solicitudes, notificaciones } from "../data/mockDB.js";
import {
  EstadoSolicitud,
  PrioridadSolicitud,
  Solicitud
} from "../models/solicitud.model.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

function puedeVerSolicitud(req: AuthRequest, solicitud: Solicitud) {
  if (!req.user) return false;
  if (req.user.rol === "funcionario") return true;
  return solicitud.usuarioId === req.user.id;
}

export function listarSolicitudes(req: AuthRequest, res: Response) {
  if (!req.user) {
    return errorResponse(res, 401, "Debes iniciar sesión");
  }

  const data =
    req.user.rol === "funcionario"
      ? solicitudes
      : solicitudes.filter((s) => s.usuarioId === req.user?.id);

  return successResponse(res, 200, "Solicitudes obtenidas correctamente", data);
}

export function obtenerSolicitudPorId(req: AuthRequest, res: Response) {
  const { id } = req.params;

  const solicitud = solicitudes.find((s) => s.id === id);

  if (!solicitud) {
    return errorResponse(res, 404, "Solicitud no encontrada", [
      { field: "id", code: "not_found" }
    ]);
  }

  if (!puedeVerSolicitud(req, solicitud)) {
    return errorResponse(res, 403, "No tienes permisos para ver esta solicitud");
  }

  return successResponse(res, 200, "Solicitud obtenida correctamente", solicitud);
}

export function crearSolicitud(req: AuthRequest, res: Response) {
  if (!req.user) {
    return errorResponse(res, 401, "Debes iniciar sesión");
  }

  const {
    titulo,
    categoria,
    descripcion,
    direccion,
    comuna,
    prioridad
  } = req.body;

  const errors = [];

  if (!titulo || typeof titulo !== "string") {
    errors.push({ field: "titulo", code: "required" });
  }

  if (!categoria || typeof categoria !== "string") {
    errors.push({ field: "categoria", code: "required" });
  }

  if (!descripcion || typeof descripcion !== "string") {
    errors.push({ field: "descripcion", code: "required" });
  }

  if (!direccion || typeof direccion !== "string") {
    errors.push({ field: "direccion", code: "required" });
  }

  if (!comuna || typeof comuna !== "string") {
    errors.push({ field: "comuna", code: "required" });
  }

  if (errors.length > 0) {
    return errorResponse(res, 400, "La solicitud contiene datos inválidos", errors);
  }

  const prioridadFinal: PrioridadSolicitud =
    prioridad === "alta" || prioridad === "baja" || prioridad === "media"
      ? prioridad
      : "media";

  const now = new Date().toISOString();

  const nuevaSolicitud: Solicitud = {
    id: `s${Date.now()}`,
    usuarioId: req.user.id,
    titulo: titulo.trim(),
    categoria: categoria.trim(),
    descripcion: descripcion.trim(),
    direccion: direccion.trim(),
    comuna: comuna.trim(),
    estado: "pendiente",
    prioridad: prioridadFinal,
    createdAt: now,
    updatedAt: now
  };

  solicitudes.push(nuevaSolicitud);

  notificaciones.push({
    id: `n${Date.now()}`,
    usuarioId: req.user.id,
    solicitudId: nuevaSolicitud.id,
    titulo: "Solicitud creada",
    mensaje: `Tu solicitud "${nuevaSolicitud.titulo}" fue registrada correctamente.`,
    leida: false,
    createdAt: now
  });

  return successResponse(res, 201, "Solicitud creada correctamente", nuevaSolicitud);
}

export function actualizarSolicitud(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const solicitud = solicitudes.find((s) => s.id === id);

  if (!solicitud) {
    return errorResponse(res, 404, "Solicitud no encontrada");
  }

  if (!puedeVerSolicitud(req, solicitud)) {
    return errorResponse(res, 403, "No tienes permisos para editar esta solicitud");
  }

  if (req.user?.rol !== "funcionario" && solicitud.estado === "resuelta") {
    return errorResponse(res, 409, "No puedes editar una solicitud resuelta");
  }

  const {
    titulo,
    categoria,
    descripcion,
    direccion,
    comuna,
    prioridad
  } = req.body;

  if (titulo !== undefined && typeof titulo === "string") {
    solicitud.titulo = titulo.trim();
  }

  if (categoria !== undefined && typeof categoria === "string") {
    solicitud.categoria = categoria.trim();
  }

  if (descripcion !== undefined && typeof descripcion === "string") {
    solicitud.descripcion = descripcion.trim();
  }

  if (direccion !== undefined && typeof direccion === "string") {
    solicitud.direccion = direccion.trim();
  }

  if (comuna !== undefined && typeof comuna === "string") {
    solicitud.comuna = comuna.trim();
  }

  if (
    prioridad === "baja" ||
    prioridad === "media" ||
    prioridad === "alta"
  ) {
    solicitud.prioridad = prioridad;
  }

  solicitud.updatedAt = new Date().toISOString();

  return successResponse(res, 200, "Solicitud actualizada correctamente", solicitud);
}

export function actualizarEstadoSolicitud(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const { estado, comentarioFuncionario } = req.body;

  const estadosValidos: EstadoSolicitud[] = [
    "pendiente",
    "en_revision",
    "resuelta",
    "rechazada"
  ];

  if (!estadosValidos.includes(estado)) {
    return errorResponse(res, 400, "Estado inválido", [
      { field: "estado", code: "invalid_value" }
    ]);
  }

  const solicitud = solicitudes.find((s) => s.id === id);

  if (!solicitud) {
    return errorResponse(res, 404, "Solicitud no encontrada");
  }

  solicitud.estado = estado;
  solicitud.comentarioFuncionario =
    typeof comentarioFuncionario === "string"
      ? comentarioFuncionario.trim()
      : solicitud.comentarioFuncionario;
  solicitud.funcionarioId = req.user?.id;
  solicitud.updatedAt = new Date().toISOString();

  notificaciones.push({
    id: `n${Date.now()}`,
    usuarioId: solicitud.usuarioId,
    solicitudId: solicitud.id,
    titulo: "Estado actualizado",
    mensaje: `Tu solicitud "${solicitud.titulo}" cambió a estado: ${estado}.`,
    leida: false,
    createdAt: new Date().toISOString()
  });

  return successResponse(res, 200, "Estado actualizado correctamente", solicitud);
}

export function eliminarSolicitud(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const index = solicitudes.findIndex((s) => s.id === id);

  if (index === -1) {
    return errorResponse(res, 404, "Solicitud no encontrada");
  }

  const solicitud = solicitudes[index];

  if (!puedeVerSolicitud(req, solicitud)) {
    return errorResponse(res, 403, "No tienes permisos para eliminar esta solicitud");
  }

  solicitudes.splice(index, 1);

  return successResponse(res, 200, "Solicitud eliminada correctamente", {
    id
  });
}