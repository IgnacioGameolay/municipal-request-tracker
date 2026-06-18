// Archivo muerto: mockDB.ts ya no se usa en ninguna ruta ni controlador del backend.
// El proyecto usa Prisma + PostgreSQL como única fuente de datos real
// (ver src/core/config/prisma.ts). Se verificó que ningún archivo de
// src/app.ts, src/server.ts, controllers o routes lo importa.
//
// No se pudo eliminar el archivo físicamente: el servidor MCP filesystem
// conectado en esta sesión no expone una operación de borrado de archivos.
//
// PENDIENTE (borrar manualmente):
//   - nodejs-Municipal/src/data/mockDB.ts (este archivo)
//   - nodejs-Municipal/src/data/ (queda vacía tras borrar lo anterior)
export {};
