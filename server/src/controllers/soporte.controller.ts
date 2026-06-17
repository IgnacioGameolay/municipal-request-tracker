import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middlewares/auth.middleware.js"; // Ajusta la ruta si tu middleware se llama distinto
import { successResponse, errorResponse } from "../utils/apiResponse.js";

const prisma = new PrismaClient();

// Funcionalidades Solicitante
export const crearTicketSoporte = async (req: AuthRequest, res: Response) => {
  try {
    const { solicitudId, titulo, tipo, comentario } = req.body;
    
    // Al usar AuthRequest, TypeScript sabe que req.user existe gracias al middleware
    const usuarioId = req.user?.id; 

    if (!usuarioId) {
      return errorResponse(res, 401, "Usuario no autenticado", [{ code: "unauthorized" }]);
    }

    // Guardar en la base de datos usando Prisma
    const nuevoTicket = await prisma.ticketSoporte.create({
      data: {
        titulo,
        tipo,
        comentario,
        usuarioId,
        ...(solicitudId ? { solicitudId: String(solicitudId) } : {}),
      },
    });

    return successResponse(res, 201, "Ticket de soporte creado exitosamente", nuevoTicket);
    
  } catch (error) {
    console.error("Error al crear ticket de soporte:", error);
    return errorResponse(res, 500, "Error interno del servidor al intentar registrar el ticket");
  }
};

export const obtenerMisTickets = async (req: AuthRequest, res: Response) => {
  try {
    const usuarioId = req.user?.id;

    if (!usuarioId) {
      return errorResponse(res, 401, "Usuario no autenticado");
    }

    // Buscamos solo los tickets que pertenecen al usuario logueado
    const tickets = await prisma.ticketSoporte.findMany({
      where: { usuarioId },
      orderBy: { createdAt: 'desc' },
    });

    return successResponse(res, 200, "Tickets del usuario obtenidos con éxito", tickets);
  } catch (error) {
    console.error("Error al obtener tickets del ciudadano:", error);
    return errorResponse(res, 500, "Error interno al obtener el historial de tickets");
  }
};


// Funcionalidades Funcionario
export const obtenerTickets = async (req: AuthRequest, res: Response) => {
  try {
    // Obtenemos todos los tickets ordenados por fecha, incluyendo los datos del usuario
    const tickets = await prisma.ticketSoporte.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        usuario: {
          select: { nombre: true, rut: true, email: true }
        }
      }
    });

    return successResponse(res, 200, "Tickets obtenidos", tickets);
  } catch (error) {
    console.error("Error al obtener tickets:", error);
    return errorResponse(res, 500, "Error al obtener los tickets");
  }
};

export const responderTicket = async (req: AuthRequest, res: Response) => {
  try {
    // 1. Extraemos y forzamos explícitamente el id como string
    const id = req.params.id as string; 
    const { respuesta } = req.body;

    if (req.user?.rol !== "funcionario") {
      return errorResponse(res, 403, "Solo los funcionarios pueden responder tickets");
    }

    const ticketActualizado = await prisma.ticketSoporte.update({
      where: { id: id }, // Ahora TypeScript sabe que esto es 100% un string
      data: {
        respuestaFuncionario: respuesta,
        estado: "resuelto", // Cambiamos el estado automáticamente
      },
    });

    return successResponse(res, 200, "Ticket respondido exitosamente", ticketActualizado);
  } catch (error) {
    console.error("Error al responder ticket:", error);
    return errorResponse(res, 500, "Error al guardar la respuesta");
  }
};