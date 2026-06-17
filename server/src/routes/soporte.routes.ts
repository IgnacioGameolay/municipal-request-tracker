import { Router } from "express";
import { crearTicketSoporte, obtenerMisTickets, obtenerTickets, responderTicket } from "../controllers/soporte.controller.js";
import { authMiddleware, roleMiddleware } from "../middlewares/auth.middleware.js";
import { RolUsuario } from "../models/usuario.model.js";

const router = Router();

// Ruta para que el ciudadano cree un ticket
router.post("/", authMiddleware, crearTicketSoporte);

router.get("/mis-tickets", authMiddleware, obtenerMisTickets);

// Ruta para obtener todos los tickets (podría estar protegida solo para funcionarios, o mixta)
router.get("/", authMiddleware, obtenerTickets);

// Ruta para que el funcionario responda un ticket
router.patch("/:id/responder", authMiddleware, roleMiddleware("funcionario"), responderTicket);

export default router;