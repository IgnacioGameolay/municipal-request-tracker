import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import solicitudesRoutes from "./routes/solicitudes.routes.js";
import notificacionesRoutes from "./routes/notificaciones.routes.js";
import {
  errorMiddleware,
  notFoundMiddleware
} from "./middlewares/error.middleware.js";
import { successResponse } from "./utils/apiResponse.js";
import documentosRoutes from "./routes/documentos.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import tramitesRoutes from "./routes/tramites.routes.js";


dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
  })
);

app.use(express.json());

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


app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;