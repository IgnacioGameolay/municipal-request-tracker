import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import type { CorsOptions } from "cors";

import authRoutes from "./features/auth/presentation/routes/auth.routes.js";
import solicitudesRoutes from "./features/solicitudes/presentation/routes/solicitudes.routes.js";
import notificacionesRoutes from "./features/notificaciones/presentation/routes/notificaciones.routes.js";
import documentosRoutes from "./features/documentos/presentation/routes/documentos.routes.js";
import usuariosRoutes from "./features/usuarios/presentation/routes/usuarios.routes.js";
import tramitesRoutes from "./features/tramites/presentation/routes/tramites.routes.js";
import soporteRoutes from "./features/soporte/presentation/routes/soporte.routes.js";


import {
  errorMiddleware,
  notFoundMiddleware
} from "./core/middleware/error.middleware.js";

import { successResponse } from "./core/utils/apiResponse.js";

dotenv.config();

const app = express();

//EF3 - Seguridad avanzada

app.set("trust proxy", 1);

const allowedOrigins = (
  process.env.CLIENT_URLS ??
  process.env.CLIENT_URL ??
  "http://localhost:8100,http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    // Permite herramientas sin Origin, como Postman, Insomnia o curl.
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Origen no permitido por CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    message: "Demasiadas solicitudes. Intenta nuevamente más tarde."
  }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    message: "Demasiados intentos de autenticación. Intenta nuevamente más tarde."
  }
});

// Cabeceras defensivas HTTP.
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin"
    }
  })
);

// CORS seguro mediante allowlist.
app.use(cors(corsOptions));

// Límite de payload para reducir abuso por cuerpos excesivamente grandes.
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Rate limiting general para toda la API.
app.use("/api", apiLimiter);

// Rate limiting específico para login/register.
app.use("/api/auth", authLimiter);

app.get("/api/health", (req, res) => {
  return successResponse(res, 200, "API funcionando correctamente", {
    status: "ok",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/solicitudes", solicitudesRoutes);
app.use("/api/solicitudes", documentosRoutes);
app.use("/api/notificaciones", notificacionesRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/tramites", tramitesRoutes);
app.use("/api/tickets", soporteRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;