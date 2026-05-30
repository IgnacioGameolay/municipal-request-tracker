import { Response } from "express";
import { prisma } from "../config/prisma.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

const estadosValidos = [
  "pendiente",
  "en_revision",
  "resuelta",
  "rechazada",
] as const;

const prioridadesValidas = ["baja", "media", "alta"] as const;

type EstadoSolicitud = (typeof estadosValidos)[number];
type PrioridadSolicitud = (typeof prioridadesValidas)[number];

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

function esEstadoValido(estado: unknown): estado is EstadoSolicitud {
  return typeof estado === "string" && estadosValidos.includes(estado as EstadoSolicitud);
}

function esPrioridadValida(prioridad: unknown): prioridad is PrioridadSolicitud {
  return (
    typeof prioridad === "string" &&
    prioridadesValidas.includes(prioridad as PrioridadSolicitud)
  );
}

function puedeVerSolicitud(
  req: AuthRequest,
  solicitud: { usuarioId: string },
): boolean {
  if (!req.user) return false;

  if (req.user.rol === "funcionario") {
    return true;
  }

  return solicitud.usuarioId === req.user.id;
}

export async function listarSolicitudes(req: AuthRequest, res: Response) {
  if (!req.user) {
    return errorResponse(res, 401, "Debes iniciar sesión");
  }

  const solicitudes =
    req.user.rol === "funcionario"
      ? await prisma.solicitud.findMany({
          orderBy: { createdAt: "desc" },
        })
      : await prisma.solicitud.findMany({
          where: { usuarioId: req.user.id },
          orderBy: { createdAt: "desc" },
        });

  return successResponse(
    res,
    200,
    "Solicitudes obtenidas correctamente",
    solicitudes,
  );
}
export async function obtenerSolicitudPorId(req: AuthRequest, res: Response) {
  const id = obtenerParametroId(req.params.id);

  if (!id) {
    return errorResponse(res, 400, "ID de solicitud inválido", [
      { field: "id", code: "invalid_param" },
    ]);
  }

  try {
    const solicitud = await prisma.solicitud.findUnique({
      where: { id },
    });

    if (!solicitud) {
      return errorResponse(res, 404, "Solicitud no encontrada", [
        { field: "id", code: "not_found" },
      ]);
    }

    if (!puedeVerSolicitud(req, solicitud)) {
      return errorResponse(
        res,
        403,
        "No tienes permisos para ver esta solicitud",
        [{ code: "forbidden" }],
      );
    }

    return successResponse(
      res,
      200,
      "Solicitud obtenida correctamente",
      solicitud,
    );
  } catch (error) {
    console.error("Error en obtenerSolicitudPorId:", error);

    return errorResponse(res, 500, "Error al obtener la solicitud", [
      { code: "database_error" },
    ]);
  }
}


export async function crearSolicitud(req: AuthRequest, res: Response) {
  if (!req.user) {
    return errorResponse(res, 401, "Debes iniciar sesión");
  }

  const {
    titulo,
    categoria,
    descripcion,
    direccion,
    comuna,
    prioridad,
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

  const prioridadFinal: PrioridadSolicitud = esPrioridadValida(prioridad)
    ? prioridad
    : "media";

  const solicitudCreada = await prisma.$transaction(async (tx) => {
    const nuevaSolicitud = await tx.solicitud.create({
      data: {
        usuarioId: req.user!.id,
        titulo: titulo.trim(),
        categoria: categoria.trim(),
        descripcion: descripcion.trim(),
        direccion: direccion.trim(),
        comuna: comuna.trim(),
        prioridad: prioridadFinal,
        estado: "pendiente",
      },
    });

    await tx.notificacion.create({
      data: {
        usuarioId: req.user!.id,
        solicitudId: nuevaSolicitud.id,
        titulo: "Solicitud creada",
        mensaje: `Tu solicitud "${nuevaSolicitud.titulo}" fue registrada correctamente.`,
        leida: false,
      },
    });

    await tx.historialSolicitud.create({
      data: {
        solicitudId: nuevaSolicitud.id,
        usuarioActorId: req.user!.id,
        accion: "creacion_solicitud",
        estadoAnterior: null,
        estadoNuevo: "pendiente",
        comentario: "Solicitud creada por el ciudadano.",
      },
    });

    return nuevaSolicitud;
  });

  return successResponse(
    res,
    201,
    "Solicitud creada correctamente",
    solicitudCreada,
  );
}

export async function actualizarSolicitud(req: AuthRequest, res: Response) {
  const id = obtenerParametroId(req.params.id);

  if (!id) {
    return errorResponse(res, 400, "ID de solicitud inválido", [
      { field: "id", code: "invalid_param" },
    ]);
  }

  if (!req.user) {
    return errorResponse(res, 401, "Debes iniciar sesión", [
      { code: "missing_user" },
    ]);
  }

  const solicitud = await prisma.solicitud.findUnique({
    where: { id },
  });

  if (!solicitud) {
    return errorResponse(res, 404, "Solicitud no encontrada", [
      { field: "id", code: "not_found" },
    ]);
  }

  if (req.user.rol !== "funcionario" && solicitud.usuarioId !== req.user.id) {
    return errorResponse(res, 403, "No tienes permisos para editar esta solicitud", [
      { code: "forbidden" },
    ]);
  }

  if (req.user.rol !== "funcionario" && solicitud.estado !== "pendiente") {
    return errorResponse(
      res,
      409,
      "Solo puedes editar solicitudes pendientes. Las solicitudes en revisión, resueltas o rechazadas ya no pueden ser modificadas por el ciudadano.",
      [{ field: "estado", code: "invalid_state" }],
    );
  }

  const {
    titulo,
    categoria,
    descripcion,
    direccion,
    comuna,
    prioridad,
  } = req.body;

  const datosActualizacion: {
    titulo?: string;
    categoria?: string;
    descripcion?: string;
    direccion?: string;
    comuna?: string;
    prioridad?: PrioridadSolicitud;
  } = {};

  if (typeof titulo === "string" && titulo.trim() !== "") {
    datosActualizacion.titulo = titulo.trim();
  }

  if (typeof categoria === "string" && categoria.trim() !== "") {
    datosActualizacion.categoria = categoria.trim();
  }

  if (typeof descripcion === "string" && descripcion.trim() !== "") {
    datosActualizacion.descripcion = descripcion.trim();
  }

  if (typeof direccion === "string" && direccion.trim() !== "") {
    datosActualizacion.direccion = direccion.trim();
  }

  if (typeof comuna === "string" && comuna.trim() !== "") {
    datosActualizacion.comuna = comuna.trim();
  }

  if (prioridad !== undefined) {
    if (!esPrioridadValida(prioridad)) {
      return errorResponse(res, 400, "Prioridad no válida", [
        { field: "prioridad", code: "invalid_value" },
      ]);
    }

    datosActualizacion.prioridad = prioridad;
  }

  if (Object.keys(datosActualizacion).length === 0) {
    return errorResponse(res, 400, "No se enviaron datos válidos para actualizar", [
      { code: "empty_payload" },
    ]);
  }

  const solicitudActualizada = await prisma.solicitud.update({
    where: { id },
    data: datosActualizacion,
  });

  await prisma.historialSolicitud.create({
    data: {
      solicitudId: solicitud.id,
      usuarioActorId: req.user.id,
      accion: "actualizacion_solicitud",
      estadoAnterior: solicitud.estado,
      estadoNuevo: solicitudActualizada.estado,
      comentario: "Solicitud actualizada por el ciudadano.",
    },
  });

  return successResponse(
    res,
    200,
    "Solicitud actualizada correctamente",
    solicitudActualizada,
  );
}

export async function actualizarEstadoSolicitud(req: AuthRequest, res: Response) {
  const id = obtenerParametroId(req.params.id);
  const { estado, comentarioFuncionario } = req.body;

  if (!id) {
    return errorResponse(res, 400, "ID de solicitud inválido", [
      { field: "id", code: "invalid_param" },
    ]);
  }

  if (!req.user) {
    return errorResponse(res, 401, "Debes iniciar sesión", [
      { code: "missing_user" },
    ]);
  }

  if (!esEstadoValido(estado)) {
    return errorResponse(res, 400, "Estado de solicitud no válido", [
      { field: "estado", code: "invalid_value" },
    ]);
  }

  const solicitud = await prisma.solicitud.findUnique({
    where: { id },
  });

  if (!solicitud) {
    return errorResponse(res, 404, "Solicitud no encontrada", [
      { field: "id", code: "not_found" },
    ]);
  }

  const comentarioLimpio =
    typeof comentarioFuncionario === "string" && comentarioFuncionario.trim() !== ""
      ? comentarioFuncionario.trim()
      : undefined;

  const solicitudActualizada = await prisma.$transaction(async (tx) => {
    const actualizada = await tx.solicitud.update({
      where: { id },
      data: {
        estado,
        funcionarioId: req.user!.id,
        comentarioFuncionario: comentarioLimpio,
      },
    });

    await tx.historialSolicitud.create({
      data: {
        solicitudId: solicitud.id,
        usuarioActorId: req.user!.id,
        accion: "cambio_estado",
        estadoAnterior: solicitud.estado,
        estadoNuevo: estado,
        comentario: comentarioLimpio ?? "Cambio de estado realizado por funcionario.",
      },
    });

    await tx.notificacion.create({
      data: {
        usuarioId: solicitud.usuarioId,
        solicitudId: solicitud.id,
        titulo: "Estado de solicitud actualizado",
        mensaje: `Tu solicitud "${solicitud.titulo}" cambió a estado ${estado.replace("_", " ")}.`,
        leida: false,
      },
    });

    return actualizada;
  });

  return successResponse(
    res,
    200,
    "Estado de solicitud actualizado correctamente",
    solicitudActualizada,
  );
}

export async function eliminarSolicitud(req: AuthRequest, res: Response) {
  const id = obtenerParametroId(req.params.id);

  if (!id) {
    return errorResponse(res, 400, "ID de solicitud inválido", [
      { field: "id", code: "invalid_param" },
    ]);
  }

  if (!req.user) {
    return errorResponse(res, 401, "Debes iniciar sesión", [
      { code: "missing_user" },
    ]);
  }

  const solicitud = await prisma.solicitud.findUnique({
    where: { id },
  });

  if (!solicitud) {
    return errorResponse(res, 404, "Solicitud no encontrada", [
      { field: "id", code: "not_found" },
    ]);
  }

  if (req.user.rol !== "funcionario" && solicitud.usuarioId !== req.user.id) {
    return errorResponse(res, 403, "No tienes permisos para eliminar esta solicitud", [
      { code: "forbidden" },
    ]);
  }

  if (req.user.rol !== "funcionario" && solicitud.estado !== "pendiente") {
    return errorResponse(
      res,
      409,
      "Solo puedes eliminar solicitudes pendientes. Las solicitudes en revisión, resueltas o rechazadas deben conservarse como expediente.",
      [{ field: "estado", code: "invalid_state" }],
    );
  }

  await prisma.$transaction(async (tx) => {
    await tx.documentoSolicitud.deleteMany({
      where: { solicitudId: id },
    });

    await tx.notificacion.deleteMany({
      where: { solicitudId: id },
    });

    await tx.historialSolicitud.deleteMany({
      where: { solicitudId: id },
    });

    await tx.mensajeSolicitud.deleteMany({
      where: { solicitudId: id },
    });

    await tx.solicitud.delete({
      where: { id },
    });
  });

  return successResponse(res, 200, "Solicitud eliminada correctamente", {
    id,
  });
}