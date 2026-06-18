import { Router } from "express";

import {
  crearTicketSoporte,
  obtenerMisTickets,
  obtenerTickets,
  responderTicket,
} from "../controllers/soporte.controller.js";

import {
  authMiddleware,
  roleMiddleware,
} from "../../../../core/middleware/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, roleMiddleware("ciudadano"), crearTicketSoporte);

router.get(
  "/mis-tickets",
  authMiddleware,
  roleMiddleware("ciudadano"),
  obtenerMisTickets,
);

router.get("/", authMiddleware, roleMiddleware("funcionario"), obtenerTickets);

router.patch(
  "/:id/responder",
  authMiddleware,
  roleMiddleware("funcionario"),
  responderTicket,
);

export default router;