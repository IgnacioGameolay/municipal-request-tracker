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

  const solicitud = await prisma.solicitud.findUnique({
    where: { id },
  });
}

export async function actualizarEstadoSolicitud(req: AuthRequest, res: Response) {
  const id = obtenerParametroId(req.params.id);
  const { estado, comentarioFuncionario } = req.body;

  if (!id) {
    return errorResponse(res, 400, "ID de solicitud inválido", [
      { field: "id", code: "invalid_param" },
    ]);
  }
}

export async function eliminarSolicitud(req: AuthRequest, res: Response) {
  const id = obtenerParametroId(req.params.id);

  if (!id) {
    return errorResponse(res, 400, "ID de solicitud inválido", [
      { field: "id", code: "invalid_param" },
    ]);
  }

  const solicitud = await prisma.solicitud.findUnique({
    where: { id },
  });
}