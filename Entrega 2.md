
# Municipal Request Tracker

Sistema web y móvil para la gestión, seguimiento y comunicación de solicitudes municipales entre ciudadanos y funcionarios.

Este proyecto corresponde a la asignatura Ingeniería Web y Móvil. La aplicación está desarrollada con Ionic + React + TypeScript en el frontend y Node.js + Express + Prisma + PostgreSQL en el backend.

---

## 1. Estado actual del proyecto

El proyecto se encuentra en una etapa avanzada de integración frontend + backend. Inicialmente el sistema funcionaba como prototipo frontend con datos simulados, pero actualmente ya cuenta con backend REST, autenticación JWT, base de datos relacional, persistencia real de solicitudes, carga de documentos, roles diferenciados y control básico de permisos.

Actualmente están funcionando los siguientes módulos principales:

- Registro de usuarios ciudadanos.
- Inicio de sesión con JWT.
- Rutas protegidas por rol.
- Rol ciudadano.
- Rol funcionario.
- Creación de solicitudes municipales.
- Listado de solicitudes del ciudadano.
- Bandeja de solicitudes para funcionario.
- Detalle de solicitud.
- Edición de solicitudes por ciudadano, solo si están pendientes.
- Eliminación de solicitudes por ciudadano, solo si están pendientes.
- Actualización de estado de solicitud por funcionario.
- Registro de historial de acciones.
- Carga de documentos por solicitud.
- Límite de 15 MB por documento.
- Límite de 10 documentos por solicitud.
- Descarga de documentos.
- Eliminación de documentos.
- Notificaciones base en base de datos.
- Marcado de notificaciones como leídas.
- UI diferenciada para ciudadano y funcionario.
- Validación de acceso a solicitudes según rol y usuario dueño.

También se corrigieron errores críticos detectados durante pruebas manuales:

- El modal de cambio de estado quedaba abierto porque el backend recibía la petición PATCH pero no devolvía respuesta.
- La pantalla quedaba en gris y sin permitir clics porque el frontend permanecía en estado `guardando`.
- El ciudadano podía intentar editar solicitudes rechazadas, resueltas o en revisión.
- El ciudadano veía acciones disponibles en solicitudes que ya no deberían modificarse.
- La eliminación de solicitudes podía fallar por relaciones asociadas como historial, documentos o notificaciones.

---

## 2. Descripción general

Municipal Request Tracker es una plataforma orientada a mejorar la trazabilidad de solicitudes municipales. El sistema busca reducir la incertidumbre del ciudadano respecto al estado de sus trámites y entregar al funcionario una bandeja organizada para revisar, actualizar y gestionar solicitudes.

El problema abordado es común en procesos municipales: los ciudadanos muchas veces no saben si una solicitud fue recibida, si está pendiente, si falta documentación, si fue rechazada o si ya fue resuelta. Esto genera visitas presenciales innecesarias, consultas repetidas y poca trazabilidad administrativa.

La aplicación propone centralizar este flujo en un mismo entorno digital, permitiendo que el ciudadano registre solicitudes, adjunte documentación, revise estados y reciba notificaciones; mientras que el funcionario puede revisar solicitudes, actualizar estados, dejar comentarios y consultar el historial del expediente.

---

## 3. Tecnologías utilizadas

### Frontend

- Ionic Framework
- React
- TypeScript
- React Router
- IonReactRouter
- Vite
- Capacitor
- CSS / componentes Ionic
- LocalStorage para token, sesión y rol frontend

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt
- Multer
- CORS
- dotenv

### Herramientas de desarrollo

- Git
- GitHub
- GitHub Projects
- Postman o Insomnia
- npm
- Prisma CLI

---

## 4. Roles del sistema

El sistema maneja dos roles principales.

| Rol en frontend | Rol en backend | Descripción |
|---|---|---|
| `solicitante` | `ciudadano` | Usuario que crea, revisa y gestiona sus propias solicitudes. |
| `funcionario` | `funcionario` | Usuario municipal que revisa solicitudes, cambia estados y gestiona expedientes. |

Importante: existe una diferencia de nombres entre frontend y backend. En el frontend se usa `solicitante` para mantener coherencia visual con el prototipo original, mientras que en backend y base de datos se usa `ciudadano`.

El archivo `authApi.ts` se encarga de mapear el rol:

```ts
ciudadano -> solicitante
funcionario -> funcionario
````

---

## 5. Credenciales de prueba

Después de ejecutar el seed de Prisma, existen usuarios demo:

### Ciudadano demo

```txt
Correo: ciudadano@demo.cl
Contraseña: 123456
Rol: ciudadano
```

### Funcionario demo

```txt
Correo: funcionario@demo.cl
Contraseña: 123456
Rol: funcionario
```

---

## 6. Estructura general del proyecto

```txt
municipal-request-tracker/
├── client/
│   ├── src/
│   │   ├── aplicacion/
│   │   ├── components/
│   │   ├── context/
│   │   ├── dominio/
│   │   ├── infraestructura/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── theme/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── .env.development
│
├── server/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.ts
│   │   └── migrations/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── uploads/
│   ├── package.json
│   └── .env
│
├── otros/
├── misc/
└── README.md
```

---

## 7. Arquitectura del frontend

El frontend está organizado intentando separar responsabilidades.

### `pages/`

Contiene las vistas principales de la aplicación.

Ejemplos:

```txt
pages/auth/LoginPage.tsx
pages/auth/RegisterPage.tsx
pages/ciudadano/DashboardCiudadano.tsx
pages/ciudadano/RealizarSolicitud.tsx
pages/ciudadano/SolicitudesRealizadas.tsx
pages/ciudadano/DetalleSolicitud.tsx
pages/funcionario/BandejaFuncionario.tsx
pages/funcionario/RevisarSolicitudFuncionario.tsx
```

### `components/`

Contiene componentes reutilizables.

Ejemplos:

```txt
components/MenuCiudadano.tsx
components/MenuFuncionario.tsx
components/solicitudes/ModalCambioDeEstado.tsx
components/solicitudes/FilaSolicitud.tsx
components/solicitudes/DocumentosSolicitud.tsx
components/notificaciones/ItemNotificacion.tsx
```

### `services/`

Contiene la comunicación con la API.

Ejemplos:

```txt
services/apiClient.ts
services/authApi.ts
services/solicitudesApi.ts
services/documentosApi.ts
services/notificaciones.ts
```

### `routes/`

Contiene el enrutamiento y protección por rol.

```txt
routes/AppRouter.tsx
routes/ProtectedRoute.tsx
```

### `context/`

Contiene el contexto de autenticación frontend.

```txt
context/AuthContext.tsx
```

### `dominio/`

Contiene entidades, constantes y reglas de negocio frontend.

```
dominio/entidades/
dominio/constantes/
dominio/reglas/
```

---

## 8. Arquitectura del backend

El backend sigue una estructura por capas simples.

```
server/src/
├── app.ts
├── server.ts
├── config/
│   └── prisma.ts
├── controllers/
│   ├── auth.controller.ts
│   ├── solicitudes.controller.ts
│   ├── documentos.controller.ts
│   └── notificaciones.controller.ts
├── middlewares/
│   ├── auth.middleware.ts
│   └── error.middleware.ts
├── models/
│   ├── usuario.model.ts
│   ├── solicitud.model.ts
│   ├── documento.model.ts
│   └── notificacion.model.ts
├── routes/
│   ├── auth.routes.ts
│   ├── solicitudes.routes.ts
│   ├── documentos.routes.ts
│   └── notificaciones.routes.ts
└── utils/
    └── apiResponse.ts
```

### Responsabilidades principales

| Carpeta       | Responsabilidad                                                    |
| ------------- | ------------------------------------------------------------------ |
| `controllers` | Reciben request, validan reglas y ejecutan operaciones de negocio. |
| `routes`      | Declaran endpoints y middlewares asociados.                        |
| `middlewares` | Autenticación JWT, control de roles y manejo de errores.           |
| `models`      | Tipos y constantes usados por backend.                             |
| `config`      | Configuración de Prisma.                                           |
| `utils`       | Formato común de respuestas JSON.                                  |

---

## 9. Base de datos

La base de datos está modelada con Prisma y PostgreSQL.

### Modelos principales

```txt
Usuario
Solicitud
DocumentoSolicitud
Notificacion
HistorialSolicitud
MensajeSolicitud
```

### Enums principales

```txt
RolUsuario:
- ciudadano
- funcionario

EstadoSolicitud:
- pendiente
- en_revision
- resuelta
- rechazada

PrioridadSolicitud:
- baja
- media
- alta
```

---

## 10. Modelo relacional resumido

### Usuario

Representa a ciudadanos y funcionarios.

Campos principales:

```txt
id
nombre
rut
email
passwordHash
region
comuna
rol
createdAt
```

Relaciones:

* Un ciudadano puede crear muchas solicitudes.
* Un funcionario puede gestionar muchas solicitudes.
* Un usuario puede subir documentos.
* Un usuario puede recibir notificaciones.
* Un usuario puede generar acciones en historial.
* Un usuario puede emitir mensajes.

### Solicitud

Representa una solicitud municipal.

Campos principales:

```txt
id
usuarioId
funcionarioId
titulo
categoria
descripcion
direccion
comuna
estado
prioridad
comentarioFuncionario
createdAt
updatedAt
```

Relaciones:

* Pertenece a un ciudadano.
* Puede ser gestionada por un funcionario.
* Puede tener documentos.
* Puede tener notificaciones.
* Puede tener historial.
* Puede tener mensajes.

### DocumentoSolicitud

Representa un archivo adjunto a una solicitud.

Campos principales:

```txt
id
solicitudId
subidoPorUsuarioId
nombreOriginal
nombreAlmacenado
mimeType
sizeBytes
ruta
hashArchivo
createdAt
```

Reglas actuales:

* Máximo 15 MB por documento.
* Máximo 10 documentos por solicitud.
* Formatos permitidos:

  * PDF
  * JPG
  * PNG
  * DOC
  * DOCX

### Notificacion

Representa una notificación para un usuario.

Campos principales:

```txt
id
usuarioId
solicitudId
titulo
mensaje
leida
createdAt
```

Estado actual:

* El backend puede listar notificaciones del usuario autenticado.
* El backend puede marcar notificaciones como leídas.
* Falta completar la generación cruzada de notificaciones entre ciudadano y funcionario en todos los eventos relevantes.

### HistorialSolicitud

Representa trazabilidad de acciones.

Campos principales:

```txt
id
solicitudId
usuarioActorId
accion
estadoAnterior
estadoNuevo
comentario
createdAt
```

Acciones usadas actualmente o proyectadas:

```txt
creacion_solicitud
actualizacion_solicitud
cambio_estado
subida_documento
eliminacion_documento
```

### MensajeSolicitud

Representa mensajes asociados a una solicitud.

Campos principales:

```txt
id
solicitudId
emisorId
mensaje
leido
createdAt
```

Estado actual:

* El modelo existe en base de datos.
* Aún falta implementar endpoints y frontend de comunicación/chat dentro de la solicitud.

---

## 11. Instalación y ejecución

### Requisitos previos

Tener instalado:

```txt
Node.js
npm
PostgreSQL
Git
```

---

## 12. Configuración del backend

Entrar a la carpeta del backend:

```bash
cd server
```

Instalar dependencias:

```bash
npm install
```

Crear archivo `.env` dentro de `server/`.

Ejemplo recomendado:

```env
PORT=3000
CLIENT_URL=http://localhost:5173
JWT_SECRET=dev_secret_cambiar_en_produccion
JWT_EXPIRES_IN=2h
DATABASE_URL="postgresql://usuario:password@localhost:5432/municipal_request_tracker?schema=public"
```

Importante: aunque el `.env.example` actual puede no incluir `DATABASE_URL`, Prisma sí la necesita porque el datasource usa `env("DATABASE_URL")`.

Ejecutar migraciones:

```bash
npx prisma migrate dev
```

Generar cliente Prisma:

```bash
npx prisma generate
```

Cargar usuarios demo:

```bash
npx prisma db seed
```

Levantar backend en desarrollo:

```bash
npm run dev
```

El backend debería quedar disponible en:

```txt
http://localhost:3000
```

Endpoint de prueba:

```txt
GET http://localhost:3000/api/health
```

---

## 13. Configuración del frontend

Entrar a la carpeta del frontend:

```bash
cd client
```

Instalar dependencias:

```bash
npm install
```

Crear o revisar el archivo `.env.development`:

```env
VITE_API_URL=http://localhost:3000/api
```

Ejecutar frontend:

```bash
npm run dev
```

El frontend debería quedar disponible en:

```txt
http://localhost:5173
```

---

## 14. Scripts disponibles

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run test.unit
npm run test.e2e
npm run lint
```

### Backend

```bash
npm run dev
npm run build
npm start
npm run typecheck
```

---

## 15. Endpoints actuales

### Health check

```txt
GET /api/health
```

Respuesta esperada:

```json
{
  "ok": true,
  "message": "API funcionando correctamente",
  "data": {
    "status": "ok",
    "timestamp": "..."
  }
}
```

---

## 16. Endpoints de autenticación

### Registrar usuario

```txt
POST /api/auth/register
```

Body:

```json
{
  "nombre": "Usuario Demo",
  "rut": "12345678-9",
  "email": "usuario@demo.cl",
  "password": "123456",
  "region": "Valparaíso",
  "comuna": "Valparaíso"
}
```

Notas:

* El registro crea usuarios con rol `ciudadano`.
* La contraseña se guarda hasheada con bcrypt.
* El backend devuelve usuario público y token JWT.

### Iniciar sesión

```txt
POST /api/auth/login
```

Body:

```json
{
  "email": "ciudadano@demo.cl",
  "password": "123456"
}
```

Respuesta esperada:

```json
{
  "ok": true,
  "message": "Inicio de sesión correcto",
  "data": {
    "user": {
      "id": "...",
      "nombre": "...",
      "rut": "...",
      "email": "...",
      "region": "...",
      "comuna": "...",
      "rol": "ciudadano",
      "createdAt": "..."
    },
    "token": "..."
  }
}
```

### Obtener usuario autenticado

```txt
GET /api/auth/me
```

Requiere header:

```txt
Authorization: Bearer TOKEN
```

---

## 17. Endpoints de solicitudes

Todos los endpoints de solicitudes requieren JWT.

Header:

```txt
Authorization: Bearer TOKEN
```

### Listar solicitudes

```txt
GET /api/solicitudes
```

Comportamiento:

* Si el usuario es funcionario, devuelve todas las solicitudes.
* Si el usuario es ciudadano, devuelve solo sus propias solicitudes.

### Obtener solicitud por ID

```txt
GET /api/solicitudes/:id
```

Reglas:

* El funcionario puede ver cualquier solicitud.
* El ciudadano solo puede ver solicitudes propias.

### Crear solicitud

```txt
POST /api/solicitudes
```

Body:

```json
{
  "titulo": "Solicitud de retiro de escombros",
  "categoria": "Aseo y ornato",
  "descripcion": "Hay escombros acumulados frente al domicilio.",
  "direccion": "Calle Demo 123",
  "comuna": "Valparaíso",
  "prioridad": "media"
}
```

Reglas:

* La solicitud se crea en estado `pendiente`.
* Se registra historial con acción `creacion_solicitud`.
* Actualmente se crea una notificación de confirmación para el propio ciudadano.
* Falta mejorar para que también se notifique a funcionarios.

### Editar solicitud

```txt
PUT /api/solicitudes/:id
```

Body:

```json
{
  "titulo": "Nuevo título",
  "categoria": "Nueva categoría",
  "descripcion": "Nueva descripción",
  "direccion": "Nueva dirección",
  "comuna": "Nueva comuna",
  "prioridad": "alta"
}
```

Reglas actuales corregidas:

* El ciudadano solo puede editar solicitudes propias.
* El ciudadano solo puede editar solicitudes en estado `pendiente`.
* No puede editar solicitudes `en_revision`, `resuelta` o `rechazada`.
* El funcionario puede editar según las reglas permitidas por backend.
* Se registra historial con acción `actualizacion_solicitud`.

### Cambiar estado de solicitud

```txt
PATCH /api/solicitudes/:id/estado
```

Body:

```json
{
  "estado": "en_revision",
  "comentarioFuncionario": "La solicitud fue tomada para revisión."
}
```

Estados permitidos:

```txt
pendiente
en_revision
resuelta
rechazada
```

Reglas:

* Solo puede hacerlo un funcionario.
* Se actualiza `estado`.
* Se asigna `funcionarioId`.
* Se guarda `comentarioFuncionario`.
* Se registra historial con acción `cambio_estado`.
* Se genera notificación para el ciudadano dueño de la solicitud.

Corrección realizada:

* Antes el endpoint no devolvía respuesta, por lo que el frontend quedaba esperando indefinidamente.
* Ahora debe devolver respuesta JSON estructurada y permitir que el modal se cierre correctamente.

### Eliminar solicitud

```txt
DELETE /api/solicitudes/:id
```

Reglas actuales corregidas:

* El ciudadano solo puede eliminar solicitudes propias.
* El ciudadano solo puede eliminar solicitudes en estado `pendiente`.
* No puede eliminar solicitudes `en_revision`, `resuelta` o `rechazada`.
* Antes de eliminar la solicitud se deben eliminar o manejar relaciones asociadas:

  * Documentos
  * Notificaciones
  * Historial
  * Mensajes, si aplica

Motivo de la regla:

Una solicitud rechazada, resuelta o en revisión ya forma parte del expediente y no debería poder eliminarse libremente desde el ciudadano.

---

## 18. Endpoints de documentos

Todos los endpoints de documentos requieren JWT.

### Listar documentos de una solicitud

```txt
GET /api/solicitudes/:id/documentos
```

Reglas:

* El funcionario puede ver documentos de cualquier solicitud.
* El ciudadano solo puede ver documentos de solicitudes propias.

### Subir documento

```txt
POST /api/solicitudes/:id/documentos
```

Tipo de body:

```txt
multipart/form-data
```

Campo requerido:

```txt
documento
```

Reglas:

* Máximo 15 MB por archivo.
* Máximo 10 documentos por solicitud.
* Formatos permitidos:

  * PDF
  * JPG
  * PNG
  * DOC
  * DOCX
* Se registra historial con acción `subida_documento`.

### Descargar documento

```txt
GET /api/solicitudes/:id/documentos/:documentoId/descargar
```

Reglas:

* Requiere JWT.
* Valida acceso a la solicitud.
* Descarga el archivo físico desde `server/uploads`.

### Eliminar documento

```txt
DELETE /api/solicitudes/:id/documentos/:documentoId
```

Reglas:

* El funcionario puede eliminar documentos.
* El ciudadano solo puede eliminar documentos que él mismo subió.
* Se registra historial con acción `eliminacion_documento`.
* Se elimina el archivo físico del servidor si existe.

---

## 19. Endpoints de notificaciones

Todos los endpoints de notificaciones requieren JWT.

### Listar notificaciones

```txt
GET /api/notificaciones
```

Reglas:

* Devuelve solo las notificaciones del usuario autenticado.
* Ordena por fecha de creación descendente.

### Marcar notificación como leída

```txt
PATCH /api/notificaciones/:id/leida
```

Reglas:

* Solo el dueño de la notificación puede marcarla como leída.
* Si otro usuario intenta modificarla, el backend responde 403.

---

## 20. Flujo del ciudadano

El ciudadano puede:

1. Registrarse.
2. Iniciar sesión.
3. Entrar a su dashboard.
4. Crear una nueva solicitud.
5. Ver el historial de solicitudes realizadas.
6. Ver detalle de una solicitud.
7. Editar una solicitud pendiente.
8. Eliminar una solicitud pendiente.
9. Adjuntar documentos a una solicitud.
10. Descargar documentos.
11. Eliminar documentos propios.
12. Ver notificaciones.
13. Marcar notificaciones como leídas.
14. Consultar información de solicitudes.
15. Consultar sección de contacto.

Restricciones actuales:

* No puede editar solicitudes en revisión.
* No puede editar solicitudes resueltas.
* No puede editar solicitudes rechazadas.
* No puede eliminar solicitudes en revisión.
* No puede eliminar solicitudes resueltas.
* No puede eliminar solicitudes rechazadas.
* No puede acceder a solicitudes de otros ciudadanos.

---

## 21. Flujo del funcionario

El funcionario puede:

1. Iniciar sesión.
2. Acceder a su dashboard.
3. Ver bandeja de solicitudes.
4. Ver historial de solicitudes.
5. Revisar una solicitud.
6. Cambiar el estado de una solicitud.
7. Dejar comentario de revisión.
8. Ver documentos adjuntos.
9. Descargar documentos.
10. Subir documentos.
11. Eliminar documentos.
12. Ver notificaciones.

Estados que puede asignar:

```txt
pendiente
en_revision
resuelta
rechazada
```

---

## 22. Reglas de negocio actuales

### Solicitudes

| Regla                                                       | Estado                    |
| ----------------------------------------------------------- | ------------------------- |
| Toda solicitud nueva parte como `pendiente`.                | Implementado              |
| El ciudadano solo ve sus propias solicitudes.               | Implementado              |
| El funcionario ve todas las solicitudes.                    | Implementado              |
| Solo el funcionario puede cambiar estado.                   | Implementado              |
| El ciudadano solo puede editar solicitudes pendientes.      | Implementado              |
| El ciudadano solo puede eliminar solicitudes pendientes.    | Implementado              |
| Las solicitudes rechazadas no son editables por ciudadano.  | Implementado              |
| Las solicitudes resueltas no son editables por ciudadano.   | Implementado              |
| Las solicitudes en revisión no son editables por ciudadano. | Implementado              |
| Cada cambio relevante debería quedar en historial.          | Parcialmente implementado |

### Documentos

| Regla                               | Estado       |
| ----------------------------------- | ------------ |
| Máximo 15 MB por archivo.           | Implementado |
| Máximo 10 documentos por solicitud. | Implementado |
| Validación de tipo MIME.            | Implementado |
| Descarga protegida por JWT.         | Implementado |
| Eliminación protegida por permisos. | Implementado |
| Historial al subir documento.       | Implementado |
| Historial al eliminar documento.    | Implementado |

### Notificaciones

| Regla                                                                   | Estado                                                  |
| ----------------------------------------------------------------------- | ------------------------------------------------------- |
| Usuario solo ve sus notificaciones.                                     | Implementado                                            |
| Usuario solo marca como leídas sus notificaciones.                      | Implementado                                            |
| Notificación al ciudadano al crear solicitud.                           | Implementado                                            |
| Notificación al ciudadano al cambiar estado.                            | Implementado o en proceso, según último parche aplicado |
| Notificación a funcionarios al crear solicitud.                         | Pendiente                                               |
| Notificación a funcionarios cuando ciudadano edita solicitud.           | Pendiente                                               |
| Notificación cruzada cuando se suben documentos.                        | Pendiente                                               |
| Vista de notificaciones de funcionario conectada totalmente a API real. | Pendiente                                               |

---

## 23. Correcciones recientes realizadas

### Corrección 1: cambio de estado no funcionaba

Problema:

* El funcionario intentaba actualizar el estado de una solicitud.
* El modal no se cerraba.
* La solicitud no se actualizaba.
* Al volver, la pantalla quedaba gris y sin permitir clics.

Causa:

* La función `actualizarEstadoSolicitud` del backend estaba incompleta.
* El endpoint recibía el PATCH pero no respondía.
* El frontend quedaba esperando eternamente la respuesta.
* `guardando` nunca volvía a `false`.

Solución:

* Se completó `actualizarEstadoSolicitud`.
* Se agregó validación de ID.
* Se agregó validación de usuario autenticado.
* Se agregó validación de estado.
* Se actualizó la solicitud.
* Se registró historial.
* Se generó notificación.
* Se devolvió respuesta JSON estructurada.

### Corrección 2: ciudadano podía intentar editar solicitudes rechazadas

Problema:

* El ciudadano veía el botón de editar aunque la solicitud estuviera rechazada.
* También podía intentar entrar manualmente a la ruta de edición.

Solución:

* En frontend se desactivaron los botones de editar/eliminar cuando la solicitud no está pendiente.
* En backend se bloqueó la edición si el usuario es ciudadano y la solicitud no está pendiente.
* En la página de edición se agregó validación al cargar la solicitud.

### Corrección 3: eliminación de solicitudes fallaba

Problema:

* El ciudadano no podía eliminar algunas solicitudes.
* Posible causa: restricciones por relaciones en base de datos.

Solución:

* Se completó la función `eliminarSolicitud`.
* Se validó dueño de la solicitud.
* Se validó estado pendiente.
* Se eliminaron relaciones asociadas en transacción.
* Se devolvió respuesta correcta al frontend.

---

## 24. Estado de cumplimiento respecto a Entrega Parcial 2

| Criterio EP2                           | Estado actual               |
| -------------------------------------- | --------------------------- |
| Servidor Node.js con Express           | Implementado                |
| Base de datos relacional               | Implementado con PostgreSQL |
| ORM                                    | Implementado con Prisma     |
| API REST                               | Implementada                |
| GET                                    | Implementado                |
| POST                                   | Implementado                |
| PUT                                    | Implementado                |
| PATCH                                  | Implementado                |
| DELETE                                 | Implementado                |
| Respuestas JSON estructuradas          | Implementado                |
| Consumo API desde Ionic React          | Implementado                |
| Manejo de errores frontend             | Parcialmente implementado   |
| Gestión de JWT                         | Implementado                |
| Registro                               | Implementado                |
| Login                                  | Implementado                |
| Rutas protegidas                       | Implementado                |
| Diferenciación por roles               | Implementado                |
| Hash de contraseñas con bcrypt         | Implementado                |
| Protección básica contra SQL Injection | Parcial, por uso de Prisma  |
| Pruebas Postman/Insomnia               | Pendiente de documentar     |
| Evidencia de pruebas                   | Pendiente                   |
| README actualizado                     | En proceso                  |

---

## 25. Estado de cumplimiento respecto a Entrega Final

| Criterio EF                     | Estado actual                                                          |
| ------------------------------- | ---------------------------------------------------------------------- |
| CRUD completo de solicitudes    | Casi completo                                                          |
| Notificaciones                  | Parcial                                                                |
| Almacenamiento local            | Implementado para sesión/token; no como funcionalidad avanzada offline |
| UI/UX optimizado                | Parcial                                                                |
| Seguridad avanzada API          | Pendiente                                                              |
| Protección XSS                  | Pendiente                                                              |
| CORS seguro                     | Parcial                                                                |
| bcrypt                          | Implementado                                                           |
| Optimización de consultas       | Pendiente                                                              |
| Servicio externo                | Pendiente                                                              |
| Dockerfile backend              | Pendiente                                                              |
| Dockerfile frontend             | Pendiente                                                              |
| docker-compose                  | Pendiente                                                              |
| Pruebas despliegue local Docker | Pendiente                                                              |

---

## 26. Pendientes principales

### Pendiente 1: notificaciones cruzadas

Debe completarse el flujo de notificaciones entre ciudadano y funcionario.

Casos requeridos:

* Si ciudadano crea solicitud, notificar a funcionarios.
* Si ciudadano edita solicitud, notificar a funcionarios.
* Si ciudadano sube documento, notificar a funcionarios.
* Si funcionario cambia estado, notificar al ciudadano.
* Si funcionario sube documento, notificar al ciudadano.
* Si funcionario agrega comentario, notificar al ciudadano.

Recomendación técnica:

Crear un servicio:

```txt
server/src/services/notificaciones.service.ts
```

Funciones sugeridas:

```ts
crearNotificacion(...)
notificarCiudadano(...)
notificarFuncionarios(...)
```

Esto evita repetir lógica dentro de cada controller.

### Pendiente 2: conectar vista real de notificaciones funcionario

Actualmente la vista de funcionario puede seguir usando lógica derivada de solicitudes o datos simulados. Debe consumir:

```ts
obtenerNotificaciones()
marcarNotificacionLeida(id)
```

desde:

```txt
client/src/services/notificaciones.ts
```

### Pendiente 3: adaptar entidad Notificacion frontend

La interface frontend debe coincidir con backend:

```ts
interface NotificacionApi {
  id: string;
  usuarioId: string;
  solicitudId?: string;
  titulo: string;
  mensaje: string;
  leida: boolean;
  createdAt: string;
}
```

Evitar campos antiguos como:

```txt
textoPrincipal
textoSecundario
funcionario
comentarioDetalle
```

si ya no vienen desde la API.

### Pendiente 4: comunicación en la misma página

El modelo `MensajeSolicitud` ya existe en Prisma, pero falta:

* Endpoint para listar mensajes por solicitud.
* Endpoint para enviar mensaje.
* Endpoint para marcar mensajes como leídos.
* Componente frontend de chat o comentarios.
* Validación de permisos por solicitud.
* Notificaciones cuando llega un mensaje nuevo.

Rutas sugeridas:

```txt
GET /api/solicitudes/:id/mensajes
POST /api/solicitudes/:id/mensajes
PATCH /api/solicitudes/:id/mensajes/:mensajeId/leido
```

### Pendiente 5: documentación de pruebas

Falta crear evidencia formal de pruebas en Postman o Insomnia.

Se recomienda documentar:

* Login ciudadano.
* Login funcionario.
* Crear solicitud.
* Listar solicitudes como ciudadano.
* Listar solicitudes como funcionario.
* Editar solicitud pendiente.
* Intentar editar solicitud rechazada.
* Cambiar estado como funcionario.
* Intentar cambiar estado como ciudadano.
* Subir documento válido.
* Subir documento mayor a 15 MB.
* Subir más de 10 documentos.
* Eliminar documento.
* Eliminar solicitud pendiente.
* Intentar eliminar solicitud rechazada.
* Listar notificaciones.
* Marcar notificación como leída.

### Pendiente 6: Docker

Falta preparar:

```txt
Dockerfile frontend
Dockerfile backend
docker-compose.yml
```

Servicios mínimos sugeridos:

```txt
frontend
backend
postgres
```

### Pendiente 7: seguridad avanzada

Pendiente para entrega final:

* CORS más estricto por ambiente.
* Validación/sanitización más robusta de inputs.
* Revisión XSS en campos visibles.
* Rate limiting en login.
* Manejo seguro de subida de archivos.
* No exponer rutas de archivos directamente.
* No subir `.env` al repositorio.
* Cambiar `JWT_SECRET` en producción.
* Revisar tamaño máximo de JSON.
* Revisar mensajes de error para no filtrar información sensible.

---

## 27. Pruebas manuales recomendadas

### Flujo ciudadano

1. Iniciar sesión como ciudadano.
2. Crear una solicitud.
3. Verificar que aparece en historial.
4. Entrar al detalle.
5. Editar la solicitud mientras está pendiente.
6. Eliminar una solicitud pendiente.
7. Subir documento válido.
8. Intentar subir documento mayor a 15 MB.
9. Intentar subir más de 10 documentos.
10. Descargar documento.
11. Eliminar documento propio.

### Flujo funcionario

1. Iniciar sesión como funcionario.
2. Entrar a bandeja.
3. Abrir una solicitud.
4. Cambiar estado a `en_revision`.
5. Verificar que el modal se cierra.
6. Verificar que el estado cambia visualmente.
7. Cambiar estado a `rechazada`.
8. Revisar que ciudadano ya no pueda editar.
9. Revisar que ciudadano ya no pueda eliminar.
10. Subir documento como funcionario.
11. Descargar documento.

### Pruebas de permisos

1. Ciudadano intenta ver solicitud de otro ciudadano.
2. Ciudadano intenta cambiar estado por endpoint.
3. Ciudadano intenta editar solicitud rechazada.
4. Ciudadano intenta eliminar solicitud rechazada.
5. Usuario intenta marcar notificación de otro usuario como leída.
6. Usuario sin token intenta acceder a `/api/solicitudes`.

Resultados esperados:

```txt
401 si no hay token.
403 si no hay permisos.
404 si no existe el recurso.
409 si el estado de la solicitud no permite la acción.
400 si los datos son inválidos.
200/201 si la operación es correcta.
```

---

## 28. Formato estándar de respuestas API

El backend utiliza respuestas JSON estructuradas.

### Respuesta exitosa

```json
{
  "ok": true,
  "message": "Operación realizada correctamente",
  "data": {}
}
```

### Respuesta con error

```json
{
  "ok": false,
  "message": "Descripción del error",
  "errors": [
    {
      "field": "campo",
      "code": "codigo_error",
      "message": "Detalle opcional"
    }
  ]
}
```

---

## 29. Variables de entorno

### Backend

Archivo:

```txt
server/.env
```

Ejemplo:

```env
PORT=3000
CLIENT_URL=http://localhost:5173
JWT_SECRET=dev_secret_cambiar_en_produccion
JWT_EXPIRES_IN=2h
DATABASE_URL="postgresql://usuario:password@localhost:5432/municipal_request_tracker?schema=public"
```

### Frontend

Archivo:

```txt
client/.env.development
```

Ejemplo:

```env
VITE_API_URL=http://localhost:3000/api
```

---

## 30. Recomendaciones para Git

No subir:

```txt
node_modules/
dist/
.env
server/uploads/*
```

Sí mantener:

```txt
server/uploads/.gitkeep
server/.env.example
client/.env.development.example, si se crea
README.md
prisma/schema.prisma
prisma/migrations/
```

Commits sugeridos para el estado actual:

```txt
fix: completar actualización de estado de solicitudes
fix: bloquear edición y eliminación ciudadana por estado
fix: eliminar solicitudes con relaciones asociadas
feat: integrar carga de documentos por solicitud
feat: agregar endpoints de notificaciones
docs: actualizar README con estado actual del proyecto
```

---

## 31. Consideraciones importantes para el equipo

* No mezclar el rol `ciudadano` del backend con `solicitante` del frontend sin mapearlo.
* No permitir que el ciudadano modifique solicitudes que ya están en revisión, resueltas o rechazadas.
* No dejar endpoints sin respuesta JSON, porque el frontend queda esperando y puede bloquear la interfaz.
* No crear lógica de notificaciones duplicada en muchos controllers; conviene centralizarla en un service.
* No confiar solo en ocultar botones en frontend: las reglas importantes también deben estar en backend.
* No eliminar solicitudes cerradas si forman parte de un expediente.
* No subir archivos `.env` reales al repositorio.
* No probar solo con UI; también se deben probar endpoints directamente en Postman o Insomnia.

---

## 32. Estado resumido para entrega

Actualmente el proyecto ya tiene una base sólida para Entrega Parcial 2:

* Frontend Ionic React funcional.
* Backend Express funcional.
* Base de datos PostgreSQL con Prisma.
* Autenticación JWT.
* Contraseñas con bcrypt.
* CRUD de solicitudes avanzado.
* Roles diferenciados.
* Carga de documentos.
* Validaciones de documentos.
* Historial de acciones.
* Notificaciones base.
* Protección por usuario y rol.

Lo más importante que falta para cerrar mejor la integración es:

1. Completar notificaciones cruzadas ciudadano-funcionario.
2. Conectar completamente las vistas de notificaciones a la API real.
3. Implementar comunicación interna o chat por solicitud.
4. Documentar pruebas en Postman o Insomnia.
5. Preparar Docker para entrega final.
6. Mejorar seguridad avanzada y evidencia de pruebas.

---

## 33. Próximas tareas sugeridas

### Tarea 1: Notificaciones cruzadas

Responsable sugerido: compañero backend/frontend.

Objetivo:

Crear notificaciones reales para ambos roles en eventos relevantes.

Archivos a modificar:

```txt
server/src/controllers/solicitudes.controller.ts
server/src/controllers/documentos.controller.ts
client/src/pages/funcionario/NotificacionesFuncionario.tsx
client/src/components/notificaciones/ItemNotificacion.tsx
client/src/dominio/entidades/Notificacion.ts
```

Archivos nuevos sugeridos:

```txt
server/src/services/notificaciones.service.ts
```

### Tarea 2: Comunicación por solicitud

Objetivo:

Permitir mensajes entre ciudadano y funcionario dentro del detalle de solicitud.

Archivos sugeridos:

```txt
server/src/controllers/mensajes.controller.ts
server/src/routes/mensajes.routes.ts
client/src/services/mensajesApi.ts
client/src/components/solicitudes/ComentariosSolicitud.tsx
```

### Tarea 3: Evidencia de pruebas

Objetivo:

Crear carpeta con capturas o documentación de Postman.

Carpeta sugerida:

```txt
otros/pruebas-api/
```

Contenido sugerido:

```txt
login-ciudadano.png
login-funcionario.png
crear-solicitud.png
editar-solicitud-pendiente.png
bloqueo-editar-rechazada.png
cambiar-estado-funcionario.png
subir-documento.png
limite-15mb.png
notificaciones.png
```

### Tarea 4: Docker

Objetivo:

Preparar despliegue local completo.

Archivos sugeridos:

```txt
Dockerfile
client/Dockerfile
server/Dockerfile
docker-compose.yml
```

---

## 34. Conclusión

Municipal Request Tracker pasó de ser un prototipo frontend a una aplicación integrada con backend, autenticación, persistencia real y reglas de negocio relevantes. El estado actual ya permite demostrar un flujo completo entre ciudadano y funcionario para registrar, revisar y actualizar solicitudes municipales.

La base técnica actual permite seguir avanzando hacia la entrega final. Las áreas más importantes por completar son notificaciones cruzadas, comunicación interna, evidencia de pruebas y despliegue con Docker.

```
```
