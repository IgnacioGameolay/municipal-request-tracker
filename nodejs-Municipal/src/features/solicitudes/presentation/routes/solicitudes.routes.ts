import { Router } from "express";
import {
  actualizarEstadoSolicitud,
  actualizarSolicitud,
  crearSolicitud,
  eliminarSolicitud,
  listarSolicitudes,
  obtenerSolicitudPorId
} from "../controllers/solicitudes.controller.js";
import {
  authMiddleware,
  roleMiddleware
} from "../../../../core/middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", listarSolicitudes);
router.get("/:id", obtenerSolicitudPorId);
router.post("/", crearSolicitud);
router.put("/:id", actualizarSolicitud);
router.patch(
  "/:id/estado",
  roleMiddleware("funcionario"),
  actualizarEstadoSolicitud
);
router.delete("/:id", eliminarSolicitud);

export default router;