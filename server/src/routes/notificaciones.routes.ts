import { Router } from "express";
import {
  listarNotificaciones,
  marcarNotificacionLeida
} from "../controllers/notificaciones.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", listarNotificaciones);
router.patch("/:id/leida", marcarNotificacionLeida);

export default router;