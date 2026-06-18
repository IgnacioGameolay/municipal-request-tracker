import { Router } from "express";

import { listarTramites } from "../controllers/tramites.controller.js";
import { authMiddleware } from "../../../../core/middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", listarTramites);

export default router;