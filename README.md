# Municipal Request Tracker

Sistema web y móvil híbrido para la gestión, seguimiento y revisión de solicitudes municipales.

**Asignatura:** Ingeniería Web y Móvil - ICI4247  
**Entrega:** Entrega Parcial 2 - Integración Frontend + Backend y Autenticación  
**Frontend:** Ionic + React + TypeScript  
**Backend:** Node.js + Express + TypeScript  
**Base de datos:** PostgreSQL + Prisma ORM  
**Autenticación:** JWT + bcrypt  
**Pruebas API:** Postman

---

## Índice

1. [Descripción general](#1-descripción-general)
2. [Problema abordado](#2-problema-abordado)
3. [Objetivo del sistema](#3-objetivo-del-sistema)
4. [Alcance de la Entrega Parcial 2](#4-alcance-de-la-entrega-parcial-2)
5. [Usuarios y roles](#5-usuarios-y-roles)
6. [Funcionalidades implementadas](#6-funcionalidades-implementadas)
7. [Requerimientos funcionales y no funcionales](#7-requerimientos-funcionales-y-no-funcionales)
8. [Tecnologías utilizadas](#8-tecnologías-utilizadas)
9. [Arquitectura general](#9-arquitectura-general)
10. [Estructura del proyecto](#10-estructura-del-proyecto)
11. [Modelo de datos](#11-modelo-de-datos)
12. [Estados de una solicitud](#12-estados-de-una-solicitud)
13. [API REST](#13-api-rest)
14. [Autenticación, autorización y seguridad](#14-autenticación-autorización-y-seguridad)
15. [Integración frontend-backend](#15-integración-frontend-backend)
16. [Instalación y ejecución](#16-instalación-y-ejecución)
17. [Usuarios demo](#17-usuarios-demo)
18. [Flujos recomendados de demostración](#18-flujos-recomendados-de-demostración)
19. [Pruebas en Postman](#19-pruebas-en-postman)
20. [Material adicional de entrega](#20-material-adicional-de-entrega)
21. [Comandos útiles](#21-comandos-útiles)
22. [Solución de problemas comunes](#22-solución-de-problemas-comunes)
23. [Limitaciones actuales](#23-limitaciones-actuales)
24. [Proyección para la entrega final](#24-proyección-para-la-entrega-final)
25. [Cumplimiento de pauta EP2](#25-cumplimiento-de-pauta-ep2)
26. [Integrantes](#26-integrantes)

---

## 1. Descripción general

**Municipal Request Tracker** es una aplicación full-stack orientada al seguimiento, gestión y revisión de solicitudes municipales. Su propósito es entregar una plataforma donde ciudadanos o solicitantes puedan registrar solicitudes, adjuntar documentos, consultar estados, recibir notificaciones y revisar comentarios de funcionarios municipales.

Por otra parte, el sistema permite que funcionarios municipales visualicen solicitudes ingresadas, revisen antecedentes, cambien estados, registren observaciones y mantengan trazabilidad sobre cada expediente.

La versión actual corresponde a la **Entrega Parcial 2**, por lo que el foco principal está en:

- implementación del backend;
- conexión frontend-backend;
- autenticación con JWT;
- base de datos relacional;
- API REST;
- consumo de la API desde Ionic React;
- validaciones, roles, bcrypt y pruebas en Postman.

---

## 2. Problema abordado

En muchos procesos municipales, las personas no cuentan con un canal claro y trazable para conocer el estado de sus solicitudes. Esto provoca incertidumbre, visitas presenciales innecesarias, dependencia de correos aislados y dificultad para saber si falta documentación o si una solicitud fue revisada.

El problema se manifiesta principalmente en:

- falta de visibilidad sobre el estado real del trámite;
- ausencia de notificaciones centralizadas;
- poca trazabilidad de comentarios y revisiones;
- dificultad para adjuntar o revisar documentación asociada;
- mayor carga operativa para funcionarios municipales;
- experiencia poco clara para usuarios con conocimientos digitales básicos.

La aplicación busca resolver este problema mediante una plataforma web/móvil híbrida donde cada solicitud tiene estado, historial, documentos, notificaciones y responsables asociados.

---

## 3. Objetivo del sistema

### Objetivo general

Implementar una aplicación web/móvil híbrida que permita gestionar solicitudes municipales mediante un frontend Ionic React conectado a una API REST con autenticación JWT y persistencia en una base de datos relacional PostgreSQL.

### Objetivos específicos

- Permitir el registro e inicio de sesión de usuarios.
- Diferenciar acceso según rol: ciudadano/solicitante y funcionario municipal.
- Permitir que ciudadanos creen, consulten, editen y eliminen solicitudes según reglas de negocio.
- Permitir que funcionarios revisen solicitudes y actualicen su estado.
- Adjuntar, listar, descargar y eliminar documentos asociados a una solicitud.
- Generar y consultar notificaciones relacionadas con solicitudes.
- Mantener trazabilidad mediante historial de acciones en base de datos.
- Exponer una API REST con respuestas JSON estructuradas.
- Validar entradas, proteger rutas y manejar errores HTTP adecuados.
- Documentar y probar endpoints con Postman.

---

## 4. Alcance de la Entrega Parcial 2

Esta entrega incluye el paso desde una maqueta/prototipo frontend hacia una aplicación full-stack funcional.

### Incluido en esta versión

- Frontend en **Ionic + React + TypeScript**.
- Backend en **Node.js + Express + TypeScript**.
- Base de datos relacional **PostgreSQL**.
- ORM **Prisma** para modelado, migraciones y acceso a datos.
- Autenticación real con **JWT**.
- Contraseñas protegidas con **bcrypt**.
- Rutas protegidas en frontend y backend.
- Diferenciación de roles entre ciudadano y funcionario.
- CRUD de solicitudes.
- Cambio de estado por funcionario.
- Notificaciones persistidas en base de datos.
- Documentos adjuntos con Multer.
- Catálogo de trámites servido desde API.
- Listado de funcionarios servido desde API.
- Colección Postman con endpoints principales y pruebas negativas.
- Modelo relacional incluido en carpeta `otros/`.

### No incluido en esta versión

- Despliegue con Docker.
- Servicio externo municipal real.
- Clave Única u OAuth externo.
- Correos reales para recuperación de contraseña.
- WebSockets o notificaciones push en tiempo real.
- Panel administrador avanzado.

---

## 5. Usuarios y roles

El sistema considera dos roles principales.

| Rol frontend | Rol backend | Descripción | Acceso principal |
|---|---|---|---|
| `solicitante` | `ciudadano` | Usuario que crea y consulta solicitudes municipales. | Perfil, nueva solicitud, historial, detalle, notificaciones, contacto e información de trámites. |
| `funcionario` | `funcionario` | Usuario municipal que revisa, gestiona y actualiza solicitudes. | Perfil, bandeja, historial, revisión de solicitud y notificaciones. |

La conversión entre nombres de rol se realiza en el frontend, porque la interfaz usa el concepto de **solicitante**, mientras que la base de datos usa el enum **ciudadano**.

```ts
ciudadano   -> solicitante
funcionario -> funcionario
```

---

## 6. Funcionalidades implementadas

### 6.1 Funcionalidades para ciudadano/solicitante

- Registro de usuario.
- Inicio de sesión.
- Visualización de perfil con datos reales del usuario autenticado.
- Creación de nueva solicitud.
- Selección dinámica del tipo de trámite desde API.
- Adjuntar documentos al expediente.
- Consulta de historial de solicitudes propias.
- Filtros por ID, tipo, estado, fecha y título.
- Refresco de solicitudes desde API sin recargar manualmente la página.
- Consulta de detalle de una solicitud.
- Visualización de comentarios del funcionario.
- Edición de solicitudes pendientes.
- Eliminación de solicitudes pendientes.
- Bloqueo de edición/eliminación si la solicitud ya está en revisión, resuelta o rechazada.
- Consulta de notificaciones.
- Marcado de notificaciones como leídas.
- Consulta de información de trámites.
- Consulta de contactos de funcionarios.

### 6.2 Funcionalidades para funcionario

- Inicio de sesión como funcionario.
- Visualización de perfil funcionario.
- Bandeja de solicitudes.
- Historial de solicitudes.
- Filtros por número, identificador, fecha, estado, título y cliente/comuna.
- Refresco de bandeja e historial desde API sin F5.
- Revisión de detalle de solicitud.
- Visualización de documentos adjuntos.
- Descarga de documentos.
- Cambio de estado de solicitud.
- Registro de comentario de funcionario.
- Notificación al ciudadano por cambio de estado.
- Consulta de notificaciones recibidas.
- Marcado de notificaciones como leídas.

### 6.3 Funcionalidades transversales

- Manejo de sesión con JWT.
- Limpieza de sesión cuando el token expira o es inválido.
- Rutas protegidas por rol.
- Respuestas de API estandarizadas.
- Validaciones de entrada en backend.
- Manejo de códigos HTTP.
- Persistencia real en PostgreSQL.
- Trazabilidad mediante historial de acciones.

---

## 7. Requerimientos funcionales y no funcionales

### 7.1 Requerimientos funcionales

| ID | Requerimiento | Rol | Estado |
|---|---|---|---|
| RF01 | Registrar usuario. | Público | Implementado. |
| RF02 | Iniciar sesión. | Público | Implementado. |
| RF03 | Validar sesión actual. | Usuario autenticado | Implementado mediante `/auth/me`. |
| RF04 | Crear solicitud municipal. | Ciudadano | Implementado. |
| RF05 | Listar solicitudes propias. | Ciudadano | Implementado. |
| RF06 | Listar todas las solicitudes. | Funcionario | Implementado. |
| RF07 | Ver detalle de solicitud. | Ciudadano/Funcionario | Implementado con control de permisos. |
| RF08 | Editar solicitud pendiente. | Ciudadano | Implementado. |
| RF09 | Eliminar solicitud pendiente. | Ciudadano | Implementado. |
| RF10 | Cambiar estado de solicitud. | Funcionario | Implementado. |
| RF11 | Registrar comentario de revisión. | Funcionario | Implementado. |
| RF12 | Subir documentos. | Ciudadano/Funcionario autorizado | Implementado. |
| RF13 | Listar documentos. | Ciudadano/Funcionario autorizado | Implementado. |
| RF14 | Descargar documentos. | Ciudadano/Funcionario autorizado | Implementado. |
| RF15 | Eliminar documentos. | Ciudadano/Funcionario autorizado | Implementado. |
| RF16 | Ver notificaciones. | Usuario autenticado | Implementado. |
| RF17 | Marcar notificación como leída. | Usuario autenticado dueño de la notificación | Implementado. |
| RF18 | Listar funcionarios de contacto. | Usuario autenticado | Implementado. |
| RF19 | Listar catálogo de trámites. | Usuario autenticado | Implementado. |

### 7.2 Requerimientos no funcionales

| ID | Requerimiento | Evidencia |
|---|---|---|
| RNF01 | Usabilidad | Menús por rol, formularios claros, filtros, estados visuales y navegación protegida. |
| RNF02 | Seguridad | JWT, bcrypt, validación de token, control por rol y Prisma ORM. |
| RNF03 | Mantenibilidad | Separación entre `pages`, `components`, `services`, `routes`, `context`, `controllers`, `routes`, `middlewares` y `prisma`. |
| RNF04 | Trazabilidad | Tabla `historial_solicitudes` para acciones relevantes. |
| RNF05 | Integridad de datos | Relaciones y restricciones en Prisma/PostgreSQL. |
| RNF06 | Manejo de errores | Respuestas JSON estructuradas con `ok`, `message`, `data` y `errors`. |
| RNF07 | Rendimiento básico | Filtros en frontend sobre datos actualizados desde API y consultas ordenadas por fecha. |
| RNF08 | Escalabilidad inicial | Arquitectura separada en frontend y backend, lista para futuras integraciones. |

---

## 8. Tecnologías utilizadas

### Frontend

- Ionic React.
- React 19.
- TypeScript.
- React Router DOM v5.
- Ionicons.
- Vite.
- Capacitor.
- CSS modular por componentes.

### Backend

- Node.js.
- Express.
- TypeScript.
- Prisma ORM.
- PostgreSQL.
- JWT.
- bcrypt.
- Multer.
- CORS.
- dotenv.

### Desarrollo y pruebas

- npm.
- Git/GitHub.
- Postman.
- Prisma Studio.
- Cypress/Vitest configurados desde el template Ionic.

---

## 9. Arquitectura general

El sistema usa una arquitectura cliente-servidor con separación entre frontend, backend y base de datos.

```txt
Usuario
  │
  ▼
Frontend Ionic React
  │
  │ fetch / Bearer Token JWT
  ▼
Backend Express API REST
  │
  │ Prisma ORM
  ▼
PostgreSQL
```

### 9.1 Frontend

El frontend se encarga de:

- renderizar las pantallas;
- administrar sesión local del usuario;
- proteger rutas según rol;
- consumir la API mediante servicios centralizados;
- mostrar errores y mensajes;
- enviar formularios y archivos al backend.

### 9.2 Backend

El backend se encarga de:

- autenticar usuarios;
- generar y validar JWT;
- validar permisos por rol;
- exponer endpoints REST;
- validar datos de entrada;
- acceder a PostgreSQL mediante Prisma;
- manejar archivos con Multer;
- registrar historial y notificaciones.

### 9.3 Base de datos

La base de datos PostgreSQL almacena:

- usuarios;
- solicitudes;
- documentos;
- notificaciones;
- historial de acciones;
- mensajes asociados a solicitudes.

---

## 10. Estructura del proyecto

```txt
municipal-request-tracker/
│
├── client/                         # Frontend Ionic React
│   ├── src/
│   │   ├── components/             # Componentes reutilizables
│   │   ├── context/                # AuthContext
│   │   ├── dominio/                # Entidades, constantes y reglas frontend
│   │   ├── pages/                  # Pantallas principales
│   │   ├── routes/                 # Rutas y ProtectedRoute
│   │   ├── services/               # Consumo API
│   │   ├── theme/                  # Variables de tema Ionic
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env.development
│   ├── package.json
│   └── ionic.config.json
│
├── server/                         # Backend Express
│   ├── prisma/
│   │   ├── schema.prisma           # Modelo relacional Prisma
│   │   ├── seed.ts                 # Usuarios demo
│   │   └── migrations/             # Migraciones
│   ├── src/
│   │   ├── config/                 # Cliente Prisma
│   │   ├── controllers/            # Lógica de endpoints
│   │   ├── middlewares/            # Auth, roles y errores
│   │   ├── models/                 # Tipos/constantes backend
│   │   ├── routes/                 # Definición de rutas REST
│   │   ├── utils/                  # Respuestas estándar
│   │   ├── app.ts                  # Configuración Express
│   │   └── server.ts               # Inicio del servidor
│   ├── uploads/                    # Archivos subidos
│   ├── .env.example
│   └── package.json
│
├── postman/                        # Colección y entorno Postman en YAML
├── otros/                          # Diagramas, mockups y evidencias
├── misc/                           # Diagramas adicionales
└── README.md                       # Documento principal del proyecto
```

---

## 11. Modelo de datos

El modelo principal está definido en:

```txt
server/prisma/schema.prisma
```

Además, el diagrama relacional está incluido en:

```txt
otros/modelo-relacional.png
```

### 11.1 Entidades principales

#### Usuario

Representa a ciudadanos y funcionarios.

Campos principales:

- `id`
- `nombre`
- `rut`
- `email`
- `passwordHash`
- `region`
- `comuna`
- `rol`
- `createdAt`

Relaciones:

- un usuario ciudadano puede crear muchas solicitudes;
- un funcionario puede gestionar muchas solicitudes;
- un usuario puede subir documentos;
- un usuario puede recibir notificaciones;
- un usuario puede ejecutar acciones de historial.

#### Solicitud

Representa una solicitud municipal.

Campos principales:

- `id`
- `usuarioId`
- `funcionarioId`
- `titulo`
- `categoria`
- `descripcion`
- `direccion`
- `comuna`
- `estado`
- `prioridad`
- `comentarioFuncionario`
- `createdAt`
- `updatedAt`

Relaciones:

- pertenece a un ciudadano;
- puede estar asignada a un funcionario;
- puede tener documentos;
- puede generar notificaciones;
- tiene historial de acciones;
- puede tener mensajes asociados.

#### DocumentoSolicitud

Representa un archivo subido a una solicitud.

Campos principales:

- `id`
- `solicitudId`
- `subidoPorUsuarioId`
- `nombreOriginal`
- `nombreAlmacenado`
- `mimeType`
- `sizeBytes`
- `ruta`
- `hashArchivo`
- `createdAt`

#### Notificacion

Representa una notificación dirigida a un usuario.

Campos principales:

- `id`
- `usuarioId`
- `solicitudId`
- `titulo`
- `mensaje`
- `leida`
- `createdAt`

#### HistorialSolicitud

Registra trazabilidad de acciones relevantes.

Campos principales:

- `id`
- `solicitudId`
- `usuarioActorId`
- `accion`
- `estadoAnterior`
- `estadoNuevo`
- `comentario`
- `createdAt`

#### MensajeSolicitud

Modelo preparado para mensajes asociados a una solicitud.

Campos principales:

- `id`
- `solicitudId`
- `emisorId`
- `mensaje`
- `leido`
- `createdAt`

### 11.2 Enums de Prisma

```prisma
RolUsuario {
  ciudadano
  funcionario
}

EstadoSolicitud {
  pendiente
  en_revision
  resuelta
  rechazada
}

PrioridadSolicitud {
  baja
  media
  alta
}
```

---

## 12. Estados de una solicitud

Los estados válidos son:

| Estado en API/BD | Estado visual | Descripción |
|---|---|---|
| `pendiente` | Pendiente | Solicitud creada y aún no revisada. |
| `en_revision` | En revisión | Solicitud tomada o revisada por funcionario. |
| `resuelta` | Resuelta | Solicitud finalizada satisfactoriamente. |
| `rechazada` | Rechazada | Solicitud rechazada por observaciones o incumplimiento. |

Reglas aplicadas:

- El ciudadano solo puede editar o eliminar solicitudes en estado `pendiente`.
- El funcionario puede cambiar el estado mediante `PATCH /api/solicitudes/:id/estado`.
- Cuando cambia el estado, se registra historial y se crea una notificación para el ciudadano.

---

## 13. API REST

La API queda disponible por defecto en:

```txt
http://localhost:3000/api
```

El formato estándar de respuesta exitosa es:

```json
{
  "ok": true,
  "message": "Operación realizada correctamente",
  "data": {}
}
```

El formato estándar de error es:

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

### 13.1 Health check

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | `/api/health` | No | Verifica que la API esté funcionando. |

### 13.2 Autenticación

| Método | Ruta | Auth | Descripción | Respuesta esperada |
|---|---|---|---|---|
| POST | `/api/auth/register` | No | Registra un nuevo ciudadano. | `201 Created` con usuario público y token. |
| POST | `/api/auth/login` | No | Inicia sesión. | `200 OK` con usuario público y token. |
| GET | `/api/auth/me` | Sí | Valida token y retorna usuario autenticado. | `200 OK` con usuario público. |

Ejemplo de login:

```json
{
  "email": "ciudadano@demo.cl",
  "password": "123456"
}
```

### 13.3 Solicitudes

| Método | Ruta | Auth | Rol | Descripción |
|---|---|---|---|---|
| GET | `/api/solicitudes` | Sí | Ciudadano/Funcionario | Ciudadano ve sus solicitudes; funcionario ve todas. |
| GET | `/api/solicitudes/:id` | Sí | Ciudadano dueño/Funcionario | Obtiene detalle de solicitud. |
| POST | `/api/solicitudes` | Sí | Ciudadano/Funcionario autenticado | Crea solicitud asociada al usuario autenticado. |
| PUT | `/api/solicitudes/:id` | Sí | Ciudadano dueño/Funcionario | Actualiza datos de solicitud. |
| PATCH | `/api/solicitudes/:id/estado` | Sí | Funcionario | Cambia estado y registra comentario. |
| DELETE | `/api/solicitudes/:id` | Sí | Ciudadano dueño/Funcionario | Elimina solicitud según reglas de permiso/estado. |

Ejemplo de creación:

```json
{
  "titulo": "Solicitud de permiso municipal",
  "categoria": "Solicitud de Información, Reclamos y Sugerencias",
  "descripcion": "Solicito revisión del caso indicado.",
  "direccion": "Valparaíso, Valparaíso",
  "comuna": "Valparaíso",
  "prioridad": "media"
}
```

Ejemplo de cambio de estado:

```json
{
  "estado": "en_revision",
  "comentarioFuncionario": "La solicitud fue revisada y requiere validación documental."
}
```

### 13.4 Documentos

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | `/api/solicitudes/:id/documentos` | Sí | Lista documentos de una solicitud. |
| POST | `/api/solicitudes/:id/documentos` | Sí | Sube un documento con `multipart/form-data`. |
| GET | `/api/solicitudes/:id/documentos/:documentoId/descargar` | Sí | Descarga un documento. |
| DELETE | `/api/solicitudes/:id/documentos/:documentoId` | Sí | Elimina un documento. |

Reglas de documentos:

- Campo esperado en form-data: `documento`.
- Máximo por archivo: 15 MB.
- Máximo por solicitud: 10 documentos.
- Formatos permitidos: PDF, JPG, PNG, DOC, DOCX.

### 13.5 Notificaciones

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | `/api/notificaciones` | Sí | Lista notificaciones del usuario autenticado. |
| PATCH | `/api/notificaciones/:id/leida` | Sí | Marca una notificación propia como leída. |

### 13.6 Usuarios/funcionarios

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | `/api/usuarios/funcionarios` | Sí | Lista usuarios con rol funcionario para contacto ciudadano. |

Este endpoint no retorna `passwordHash`.

### 13.7 Catálogo de trámites

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | `/api/tramites` | Sí | Lista el catálogo de trámites usado por el frontend. |

Cada trámite contiene:

- `id`
- `tipo`
- `documentos`
- `tiempoEstimado`
- `areaResponsable`

### 13.8 Códigos HTTP usados

| Código | Uso |
|---|---|
| 200 | Operación exitosa. |
| 201 | Recurso creado correctamente. |
| 400 | Datos inválidos o payload incompleto. |
| 401 | Token faltante, inválido o credenciales incorrectas. |
| 403 | Usuario autenticado sin permisos suficientes. |
| 404 | Recurso no encontrado. |
| 409 | Conflicto de regla de negocio, por ejemplo editar una solicitud no pendiente. |
| 500 | Error interno/configuración faltante. |

---

## 14. Autenticación, autorización y seguridad

### 14.1 JWT

El backend genera tokens JWT al registrar o iniciar sesión. El token contiene:

```ts
{
  id: string;
  email: string;
  rol: "ciudadano" | "funcionario";
}
```

El frontend guarda el token en `localStorage` bajo la clave:

```txt
auth_token
```

La validación del token se realiza en:

```txt
server/src/middlewares/auth.middleware.ts
```

### 14.2 Rutas protegidas

En frontend:

```txt
client/src/routes/ProtectedRoute.tsx
```

En backend:

```txt
server/src/middlewares/auth.middleware.ts
server/src/middlewares/role.middleware equivalente mediante roleMiddleware
```

### 14.3 Control por rol

Ejemplo de endpoint protegido solo para funcionario:

```ts
router.patch(
  "/:id/estado",
  roleMiddleware("funcionario"),
  actualizarEstadoSolicitud
);
```

### 14.4 bcrypt

Las contraseñas se almacenan como hash mediante bcrypt.

- Registro: `bcrypt.hash(password, 10)`.
- Login: `bcrypt.compare(password, usuario.passwordHash)`.

El backend nunca retorna `passwordHash` en respuestas públicas.

### 14.5 Protección básica contra inyección SQL

El acceso a base de datos se realiza mediante Prisma ORM. No se construyen consultas SQL concatenando strings desde entrada de usuario. Esto entrega protección básica contra inyección SQL al usar consultas parametrizadas y modelos tipados.

### 14.6 Manejo de credenciales

Las credenciales sensibles no deben subirse al repositorio. El archivo real debe ser:

```txt
server/.env
```

El repositorio solo incluye:

```txt
server/.env.example
```

---

## 15. Integración frontend-backend

El frontend consume la API usando `fetch` centralizado en:

```txt
client/src/services/apiClient.ts
```

Este cliente se encarga de:

- definir la URL base de la API;
- agregar `Content-Type: application/json` cuando corresponde;
- agregar `Authorization: Bearer <token>` en rutas protegidas;
- omitir `Content-Type` cuando se envía `FormData`;
- transformar errores HTTP en `ApiClientError`;
- limpiar sesión si recibe `401 Unauthorized`.

Servicios principales:

| Archivo | Responsabilidad |
|---|---|
| `authApi.ts` | Login, registro, sesión y conversión de roles. |
| `solicitudesApi.ts` | CRUD de solicitudes y cambio de estado. |
| `documentosApi.ts` | Subida, listado, descarga y eliminación de documentos. |
| `notificaciones.ts` | Listado y marcado de notificaciones. |
| `tramitesApi.ts` | Catálogo de trámites. |
| `usuariosApi.ts` | Listado de funcionarios. |
| `solicitudesMapper.ts` | Conversión de estados API a estados visuales. |

Variable frontend:

```env
VITE_API_URL=http://localhost:3000/api
```

---

## 16. Instalación y ejecución

### 16.1 Requisitos previos

- Node.js instalado.
- npm instalado.
- Git instalado.
- PostgreSQL instalado y ejecutándose.
- Ionic CLI instalado para levantar el frontend con `ionic serve`.
- Postman instalado para pruebas de API.

Instalar Ionic CLI si no está instalado:

```bash
npm install -g @ionic/cli
```

### 16.2 Clonar repositorio

```bash
git clone https://github.com/IgnacioGameolay/municipal-request-tracker.git
cd municipal-request-tracker
```

### 16.3 Configurar base de datos PostgreSQL

Crear una base de datos llamada:

```txt
municipal_request_tracker
```

El puerto usado en el ejemplo es `5433`. Si PostgreSQL está en el puerto estándar `5432`, se debe ajustar `DATABASE_URL`.

### 16.4 Configurar backend

Entrar a la carpeta del servidor:

```bash
cd server
```

Instalar dependencias:

```bash
npm install
```

Crear archivo `.env` dentro de `server/`, usando como base `server/.env.example`:

```env
PORT=3000
CLIENT_URL=http://localhost:8100
JWT_SECRET=develop_secret_cambiar_en_produccion
JWT_EXPIRES_IN=2h
DATABASE_URL="postgresql://usuario:password@localhost:5433/municipal_request_tracker?schema=public"
```

Ajustar `usuario`, `password` y puerto según la configuración local de PostgreSQL.

Generar cliente Prisma:

```bash
npx prisma generate
```

Ejecutar migraciones:

```bash
npx prisma migrate dev
```

Cargar usuarios demo:

```bash
npm run db:seed
```

Levantar backend:

```bash
npm run dev
```

El backend queda disponible en:

```txt
http://localhost:3000/api
```

Probar health check:

```txt
http://localhost:3000/api/health
```

### 16.5 Configurar frontend

Abrir otra terminal desde la raíz del proyecto:

```bash
cd client
npm install
```

Verificar archivo:

```txt
client/.env.development
```

Debe contener:

```env
VITE_API_URL=http://localhost:3000/api
```

Levantar frontend con Ionic:

```bash
ionic serve
```

El frontend queda disponible normalmente en:

```txt
http://localhost:8100
```

### 16.6 Alternativa con Vite

También se puede levantar con:

```bash
npm run dev
```

En ese caso, Vite puede usar:

```txt
http://localhost:5173
```

Si se usa esta alternativa, debe ajustarse `CLIENT_URL` en `server/.env` o configurar CORS para permitir `5173`.

### 16.7 Compilar proyecto

Backend:

```bash
cd server
npm run typecheck
npm run build
```

Frontend:

```bash
cd client
npm run build
```

---

## 17. Usuarios demo

Después de ejecutar:

```bash
cd server
npm run db:seed
```

se crean los siguientes usuarios:

| Rol | Email | Contraseña |
|---|---|---|
| Ciudadano/Solicitante | `ciudadano@demo.cl` | `123456` |
| Funcionario | `funcionario@demo.cl` | `123456` |

El usuario ciudadano permite probar creación y seguimiento de solicitudes. El usuario funcionario permite probar bandeja, revisión y cambio de estado.

---

## 18. Flujos recomendados de demostración

### 18.1 Flujo ciudadano

1. Iniciar backend y frontend.
2. Iniciar sesión con `ciudadano@demo.cl`.
3. Entrar al perfil ciudadano.
4. Ir a **Realizar nueva solicitud**.
5. Seleccionar un tipo de trámite cargado desde API.
6. Ingresar título y descripción.
7. Adjuntar documento si corresponde.
8. Guardar solicitud.
9. Ir a **Historial**.
10. Presionar el botón amarillo para refrescar desde API.
11. Ver el detalle de la solicitud.
12. Editar una solicitud pendiente.
13. Consultar notificaciones.
14. Consultar información de solicitudes.
15. Consultar contactos de funcionarios.

### 18.2 Flujo funcionario

1. Iniciar sesión con `funcionario@demo.cl`.
2. Ir a **Bandeja**.
3. Presionar el botón amarillo para recargar solicitudes desde API.
4. Abrir una solicitud.
5. Revisar datos y documentos.
6. Cambiar estado a `En revisión`, `Resuelta` o `Rechazada`.
7. Agregar comentario.
8. Confirmar cambio.
9. Revisar historial.
10. Volver al navegador del ciudadano y refrescar solicitudes para ver el cambio.
11. Revisar la notificación generada al ciudadano.

### 18.3 Flujo con dos navegadores

Para demostrar actualización real mediante API:

1. Abrir Chrome con ciudadano.
2. Abrir Edge con funcionario.
3. Crear solicitud desde ciudadano.
4. En funcionario, presionar botón amarillo de refresco en bandeja/historial.
5. La nueva solicitud debe aparecer sin necesidad de F5.
6. Cambiar estado desde funcionario.
7. En ciudadano, presionar botón amarillo en historial.
8. El nuevo estado debe verse actualizado.

---

## 19. Pruebas en Postman

La pauta EP2 exige pruebas funcionales en Postman o Insomnia, documentación de endpoints y evidencia. Este proyecto incluye carpeta Postman en:

```txt
postman/
```

Para la versión más actual, se recomienda importar directamente la carpeta `postman/` incluida en el repositorio, ya que contiene la estructura final en YAML.

### 19.1 Entorno Postman

Archivo de entorno:

```txt
postman/environments/Local - Proyecto Web y Movil.environment.yaml
```

Variables principales:

| Variable | Uso |
|---|---|
| `baseUrl` | URL base de API: `http://localhost:3000/api`. |
| `token` | Token JWT activo. |
| `tokenCiudadano` | Token específico del ciudadano. |
| `tokenFuncionario` | Token específico del funcionario. |
| `solicitudId` | ID de solicitud para pruebas de detalle, edición, documentos y eliminación. |
| `documentoId` | ID de documento para descarga o eliminación. |

### 19.2 Colecciones incluidas

La colección está organizada en:

```txt
postman/collections/API Proyecto Web y Movil/
```

Carpetas principales:

- `Salud del Servidor`
- `Autenticacion`
- `Solicitudes`
- `Documentos`
- `Notificaciones`
- `Funcionarios`

### 19.3 Endpoints cubiertos en Postman

| Área | Request |
|---|---|
| Health | `GET {{baseUrl}}/health` |
| Auth | `POST {{baseUrl}}/auth/register` |
| Auth | `POST {{baseUrl}}/auth/login` |
| Auth | `GET {{baseUrl}}/auth/me` |
| Solicitudes | `GET {{baseUrl}}/solicitudes` |
| Solicitudes | `GET {{baseUrl}}/solicitudes/:id` |
| Solicitudes | `POST {{baseUrl}}/solicitudes` |
| Solicitudes | `PUT {{baseUrl}}/solicitudes/:id` |
| Solicitudes | `PATCH {{baseUrl}}/solicitudes/:id/estado` |
| Solicitudes | `DELETE {{baseUrl}}/solicitudes/:id` |
| Documentos | `GET {{baseUrl}}/solicitudes/:id/documentos` |
| Documentos | `POST {{baseUrl}}/solicitudes/:id/documentos` |
| Documentos | `GET {{baseUrl}}/solicitudes/:id/documentos/:documentoId/descargar` |
| Documentos | `DELETE {{baseUrl}}/solicitudes/:id/documentos/:documentoId` |
| Notificaciones | `GET {{baseUrl}}/notificaciones` |
| Notificaciones | `PATCH {{baseUrl}}/notificaciones/:id/leida` |
| Funcionarios | `GET {{baseUrl}}/usuarios/funcionarios` |
| Trámites | `GET {{baseUrl}}/tramites` |

### 19.4 Pruebas negativas incluidas o recomendadas

La carpeta Postman incluye pruebas negativas para autenticación y solicitudes. Para demostrar cobertura completa se recomienda ejecutar o mantener documentados estos casos:

| Caso | Resultado esperado |
|---|---|
| Login con credenciales incorrectas | `401 Unauthorized`. |
| Registro con campos faltantes | `400 Bad Request`. |
| Registro con correo repetido | `409 Conflict`. |
| Listar solicitudes sin token | `401 Unauthorized`. |
| Obtener solicitud inexistente | `404 Not Found`. |
| Eliminar solicitud ajena o sin permisos | `403 Forbidden`. |
| Cambiar estado como ciudadano | `403 Forbidden`. |
| Editar solicitud no pendiente como ciudadano | `409 Conflict`. |
| Subir archivo inválido | `400 Bad Request`. |
| Subir archivo sobre 15 MB | `400 Bad Request`. |
| Marcar notificación ajena como leída | `403 Forbidden`. |

### 19.5 Flujo recomendado de ejecución en Postman

1. Ejecutar `GET Health` para confirmar que el backend está activo.
2. Ejecutar `POST login-ciudadano`.
3. Copiar token a variable `token` o `tokenCiudadano`.
4. Ejecutar `POST crear-solicitud`.
5. Guardar el `id` retornado en `solicitudId`.
6. Ejecutar `GET listar-solicitudes`.
7. Ejecutar `GET obtener-solicitud`.
8. Ejecutar `POST subir-documento` usando `form-data` con campo `documento`.
9. Guardar el `id` del documento en `documentoId`.
10. Ejecutar `GET listar-documentos`.
11. Ejecutar `GET descargar-documento`.
12. Ejecutar `POST login-funcionario`.
13. Copiar token de funcionario a `token` o `tokenFuncionario`.
14. Ejecutar `PATCH cambiar-estado-solicitud`.
15. Volver al token ciudadano y ejecutar `GET notificaciones`.
16. Ejecutar `PATCH marcar-notificacion-leida`.

### 19.6 Evidencias de pruebas

Las evidencias de pruebas se pueden encontrar en los archivos .yaml generados tras las pruebas dentor de las sub-carpetas 

```txt
postman/
```
Por ejemplo:
```txt
postman/collections
/API Proyecto Web y Movil/
```

---

## 20. Material adicional de entrega

La pauta solicita incluir otros archivos como diagramas, presentaciones o material adicional dentro de una carpeta `otros/`. Este proyecto incluye:

```txt
otros/
```

Contenido relevante:

- `modelo-relacional.png`: modelo relacional del proyecto.
- Mockups del proyecto.
- Evidencias de pruebas API.
- Material visual de pantallas.

También existe:

```txt
misc/
```

con diagramas adicionales, como máquina de estados, secuencia y árbol de rutas.

---

## 21. Comandos útiles

### Backend

```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev
npm run db:seed
npm run dev
```

Validación:

```bash
npm run typecheck
npm run build
```

Prisma Studio:

```bash
npm run db:studio
```

Reset de base de datos:

```bash
npx prisma migrate reset
```

### Frontend

```bash
cd client
npm install
ionic serve
```

Alternativa Vite:

```bash
npm run dev
```

Build:

```bash
npm run build
```

### Limpieza de sesión frontend

En consola del navegador:

```js
localStorage.clear();
location.href = "/login";
```

---

## 22. Solución de problemas comunes

### 22.1 Error de conexión con backend

Mensaje típico:

```txt
No se pudo conectar con el servidor. Revisa que el backend esté ejecutándose.
```

Verificar:

1. Backend corriendo con `npm run dev` en `server/`.
2. API disponible en `http://localhost:3000/api/health`.
3. `client/.env.development` contiene `VITE_API_URL=http://localhost:3000/api`.

### 22.2 Error CORS

Si se usa `ionic serve`, el frontend normalmente corre en:

```txt
http://localhost:8100
```

Por eso `server/.env` debe tener:

```env
CLIENT_URL=http://localhost:8100
```

Si se usa `npm run dev`, Vite puede correr en:

```txt
http://localhost:5173
```

En ese caso se debe ajustar `CLIENT_URL` o permitir ambos orígenes en `server/src/app.ts`.

### 22.3 Error de base de datos

Verificar que:

- PostgreSQL esté ejecutándose.
- La base `municipal_request_tracker` exista.
- `DATABASE_URL` tenga usuario, contraseña, host, puerto y base correctos.
- Se hayan ejecutado migraciones con `npx prisma migrate dev`.

### 22.4 Token expirado o sesión inválida

El frontend limpia sesión automáticamente ante `401`. Si se queda una sesión antigua en navegador:

```js
localStorage.clear();
location.href = "/login";
```

### 22.5 Los cambios no se ven en otra pestaña/navegador

Usar el botón amarillo de refresco en las vistas de historial/bandeja. Ese botón vuelve a consultar la API y evita depender de datos viejos cargados en memoria.

### 22.6 No aparecen usuarios demo

Ejecutar:

```bash
cd server
npm run db:seed
```

---

## 23. Limitaciones actuales

- No hay despliegue con Docker en esta entrega.
- No hay integración con Clave Única u OAuth externo.
- La recuperación de contraseña es una pantalla prototipal; no envía correos reales.
- Las notificaciones son persistidas y consultables, pero no se emiten en tiempo real con WebSockets.
- El catálogo de trámites se sirve desde backend como arreglo estático, no como tabla editable desde administración.
- No existe panel administrador para gestionar funcionarios o trámites.
- No hay integración con servicios municipales externos.
- La carpeta `uploads/` almacena archivos localmente, no en S3 u otro storage externo.

---

## 24. Proyección para la entrega final

Para una versión posterior se propone:

- Despliegue con Docker y `docker-compose`.
- Separar almacenamiento de documentos hacia servicio externo.
- Implementar notificaciones en tiempo real.
- Incorporar correos reales para recuperación de contraseña.
- Crear panel administrador.
- Convertir catálogo de trámites en entidad administrable en base de datos.
- Mejorar validaciones de RUT y formato de correo.
- Agregar paginación y filtros desde backend.
- Implementar pruebas automatizadas más completas.
- Endurecer CORS, headers de seguridad y políticas de archivos.

---

## 25. Cumplimiento de pauta EP2

| Criterio EP2 | Evidencia en el proyecto | Estado |
|---|---|---|
| EP 2.1 Servidor Node.js con Express o Flask | `server/src/app.ts`, `server/src/server.ts`, rutas Express. | Cumplido. |
| EP 2.2 Base de datos relacional | PostgreSQL + Prisma, `schema.prisma`, migraciones, `otros/modelo-relacional.png`. | Cumplido. |
| EP 2.3 API REST GET/POST/PUT/PATCH/DELETE | Rutas de auth, solicitudes, documentos, notificaciones, funcionarios y trámites. | Cumplido. |
| EP 2.4 Consumo API desde Ionic React | `client/src/services/apiClient.ts` y servicios específicos. | Cumplido. |
| EP 2.5 JWT, login, registro, rutas protegidas y roles | `auth.controller.ts`, `auth.middleware.ts`, `AuthContext.tsx`, `ProtectedRoute.tsx`. | Cumplido. |
| EP 2.6 Validación, bcrypt, credenciales y SQL injection | Validaciones en controladores, bcrypt, JWT, Prisma ORM. | Cumplido. |
| EP 2.7 Pruebas Postman, documentación y evidencia | Carpeta `postman/`, entorno local, requests YAML, pruebas negativas y evidencias en `otros/`. | Cumplido/documentado. |
| Entrega: backend funcional | API Express ejecutable en `localhost:3000`. | Cumplido. |
| Entrega: autenticación y usuarios | Registro, login, `/auth/me`, roles y usuarios demo. | Cumplido. |
| Entrega: integración frontend-backend | Ionic React consume datos reales desde API. | Cumplido. |

---

## 26. Integrantes

Proyecto desarrollado para la asignatura **ICI4247 - Ingeniería Web y Móvil**.

Integrantes:

- Sebastián Andrés de Jesús García Valdebenito.
- Francisca Antonia Guzmán Pérez.
- Vicente Nills Quezada Gallardo.
- Ignacio Antonio Reyes Toledo.

---

## Estado final de esta entrega

La versión actual corresponde a una aplicación full-stack funcional para la Entrega Parcial 2. El proyecto cuenta con backend Express, base de datos PostgreSQL, Prisma ORM, autenticación JWT, hash de contraseñas con bcrypt, rutas protegidas, roles diferenciados, API REST documentada, integración con frontend Ionic React y colección Postman para pruebas funcionales.

