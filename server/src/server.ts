import "dotenv/config";
import app from "./app.js";

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const server = app.listen(PORT, HOST, () => {
  console.log(`API escuchando en http://${HOST}:${PORT}`);
  console.log(`Health check disponible en http://${HOST}:${PORT}/api/health`);
});

const cerrarServidor = (signal: string) => {
  console.log(`\nSeñal recibida: ${signal}. Cerrando servidor...`);

  server.close(() => {
    console.log("Servidor cerrado correctamente.");
    process.exit(0);
  });
};

process.on("SIGINT", () => cerrarServidor("SIGINT"));
process.on("SIGTERM", () => cerrarServidor("SIGTERM"));