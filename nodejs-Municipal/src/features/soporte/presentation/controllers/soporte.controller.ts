import { Response } from "express";

import { prisma } from "../../../../core/config/prisma.js";
import { AuthRequest } from "../../../../core/middleware/auth.middleware.js";
import { successResponse, errorResponse } from "../../../../core/utils/apiResponse.js";

export const crearTicketSoporte = async (req: AuthRequest, res: Response) => {
  try {
    const usuarioId = req.user?.id;
    const { solicitudId, titulo, tipo, comentario } = req.body;

    if (!usuarioId) {
      return errorResponse(res, 401, "Usuario no autenticado", [
        { code: "unauthorized" },
      ]);
    }

    if (!comentario || typeof comentario !== "string" || !comentario.trim()) {
      return errorResponse(res, 400, "El comentario del ticket es obligatorio", [
        { field: "comentario", code: "required" },
      ]);
    }

    let tituloFinal = typeof titulo === "string" ? titulo.trim() : "";
    let tipoFinal = typeof tipo === "string" ? tipo.trim() : "";
    let solicitudIdFinal: string | undefined;

    if (solicitudId) {
      const solicitud = await prisma.solicitud.findFirst({
        where: {
          id: String(solicitudId),
          usuarioId,
        },
        select: {
          id: true,
          titulo: true,
          categoria: true,
        },
      });

      if (!solicitud) {
        return errorResponse(
          res,
          404,
          "La solicitud asociada no existe o no pertenece al usuario autenticado",
          [{ field: "solicitudId", code: "not_found" }],
        );
      }

      solicitudIdFinal = solicitud.id;
      tituloFinal = tituloFinal || solicitud.titulo;
      tipoFinal = tipoFinal || solicitud.categoria;
    }

    if (!tituloFinal) {
      return errorResponse(res, 400, "El título del ticket es obligatorio", [
        { field: "titulo", code: "required" },
      ]);
    }

    if (!tipoFinal) {
      return errorResponse(res, 400, "El tipo del ticket es obligatorio", [
        { field: "tipo", code: "required" },
      ]);
    }

    const nuevoTicket = await prisma.ticketSoporte.create({
      data: {
        titulo: tituloFinal,
        tipo: tipoFinal,
        comentario: comentario.trim(),
        usuarioId,
        solicitudId: solicitudIdFinal,
      },
    });

    return successResponse(
      res,
      201,
      "Ticket de soporte creado exitosamente",
      nuevoTicket,
    );
  } catch (error) {
    console.error("Error al crear ticket de soporte:", error);

    return errorResponse(
      res,
      500,
      "Error interno del servidor al intentar registrar el ticket",
    );
  }
};

export const obtenerMisTickets = async (req: AuthRequest, res: Response) => {
  try {
    const usuarioId = req.user?.id;

    if (!usuarioId) {
      return errorResponse(res, 401, "Usuario no autenticado", [
        { code: "unauthorized" },
      ]);
    }

    const tickets = await prisma.ticketSoporte.findMany({
      where: { usuarioId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        solicitudId: true,
        titulo: true,
        tipo: true,
        comentario: true,
        respuestaFuncionario: true,
        estado: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return successResponse(
      res,
      200,
      "Tickets del usuario obtenidos correctamente",
      tickets,
    );
  } catch (error) {
    console.error("Error al obtener tickets del ciudadano:", error);

    return errorResponse(
      res,
      500,
      "Error interno al obtener el historial de tickets",
    );
  }
};

export const obtenerTickets = async (req: AuthRequest, res: Response) => {
  try {
    const tickets = await prisma.ticketSoporte.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        solicitudId: true,
        titulo: true,
        tipo: true,
        comentario: true,
        respuestaFuncionario: true,
        estado: true,
        createdAt: true,
        updatedAt: true,
        usuario: {
          select: {
            nombre: true,
            rut: true,
            email: true,
          },
        },
        solicitud: {
          select: {
            id: true,
            titulo: true,
            estado: true,
          },
        },
      },
    });

    return successResponse(res, 200, "Tickets obtenidos correctamente", tickets);
  } catch (error) {
    console.error("Error al obtener tickets:", error);

    return errorResponse(res, 500, "Error al obtener los tickets");
  }
};

export const responderTicket = async (req: AuthRequest, res: Response) => {
  try {
    const ticketIdParam = req.params.id;
    const respuesta = req.body.respuesta;

    const ticketId = Array.isArray(ticketIdParam)
      ? ticketIdParam[0]
      : ticketIdParam;

    if (!ticketId || typeof ticketId !== "string") {
      return errorResponse(res, 400, "El ID del ticket es obligatorio", [
        { field: "id", code: "required" },
      ]);
    }

    if (!respuesta || typeof respuesta !== "string" || !respuesta.trim()) {
      return errorResponse(res, 400, "La respuesta es obligatoria", [
        { field: "respuesta", code: "required" },
      ]);
    }

    const ticketExiste = await prisma.ticketSoporte.findUnique({
      where: { id: ticketId },
      select: { id: true },
    });

    if (!ticketExiste) {
      return errorResponse(res, 404, "Ticket no encontrado", [
        { field: "id", code: "not_found" },
      ]);
    }

    const ticketActualizado = await prisma.ticketSoporte.update({
      where: { id: ticketId },
      data: {
        respuestaFuncionario: respuesta.trim(),
        estado: "resuelto",
      },
    });

    return successResponse(
      res,
      200,
      "Ticket respondido exitosamente",
      ticketActualizado,
    );
  } catch (error) {
    console.error("Error al responder ticket:", error);

    return errorResponse(res, 500, "Error al guardar la respuesta");
  }
};