import { Router } from "express";

import { listarFuncionarios } from "../controllers/usuarios.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/funcionarios", listarFuncionarios);

export default router;