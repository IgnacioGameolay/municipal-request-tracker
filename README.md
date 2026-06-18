# Municipal Request Tracker

Sistema web y móvil híbrido para la gestión, seguimiento y revisión de solicitudes municipales.

**Asignatura:** Ingeniería Web y Móvil - ICI4247
**Entrega:** Entrega Final - Funcionalidades avanzadas, optimización de rendimiento y despliegue
**Frontend:** Ionic + React + TypeScript
**Backend:** Node.js + Express + TypeScript
**Base de datos:** PostgreSQL + Prisma ORM
**Autenticación:** JWT + bcrypt
**Seguridad avanzada:** Helmet, CORS con allowlist, rate limiting
**Despliegue:** Docker + docker-compose
**Pruebas API:** Postman

---

## Índice

1. [Descripción general](#1-descripción-general)
2. [Problema abordado](#2-problema-abordado)
3. [Objetivo del sistema](#3-objetivo-del-sistema)
4. [Alcance de la Entrega Final](#4-alcance-de-la-entrega-final)
5. [Usuarios y roles](#5-usuarios-y-roles)
6. [Funcionalidades implementadas](#6-funcionalidades-implementadas)
7. [Requerimientos funcionales y no funcionales](#7-requerimientos-funcionales-y-no-funcionales)
8. [Tecnologías utilizadas](#8-tecnologías-utilizadas)
9. [Arquitectura general](#9-arquitectura-general)
10. [Estructura del proyecto](#10-estructura-del-proyecto)
11. [Modelo de datos](#11-modelo-de-datos)
12. [Estados de una solicitud](#12-estados-de-una-solicitud)
13. [API REST](#13-api-rest)
14. [Seguridad avanzada (EF3)](#14-seguridad-avanzada-ef3)
15. [Optimización de consultas y eficiencia de respuesta (EF4)](#15-optimización-de-consultas-y-eficiencia-de-respuesta-ef4)
16. [Integración con servicio externo (EF5)](#16-integración-con-servicio-externo-ef5)
17. [Integración frontend-backend](#17-integración-frontend-backend)
18. [Despliegue con Docker (EF6)](#18-despliegue-con-docker-ef6)
19. [Instalación y ejecución sin Docker](#19-instalación-y-ejecución-sin-docker)
20. [Usuarios demo](#20-usuarios-demo)
21. [Flujos recomendados de demostración](#21-flujos-recomendados-de-demostración)
22. [Pruebas en Postman](#22-pruebas-en-postman)
23. [Material adicional de entrega](#23-material-adicional-de-entrega)
24. [Comandos útiles](#24-comandos-útiles)
25. [Solución de problemas comunes](#25-solución-de-problemas-comunes)
26. [Limitaciones actuales](#26-limitaciones-actuales)
27. [Cumplimiento de pauta de Entrega Final](#27-cumplimiento-de-pauta-de-entrega-final)
28. [Integrantes](#28-integrantes)

---

## 1. Descripción general

**Municipal Request Tracker** es una aplicación full-stack orientada al seguimiento, gestión y revisión de solicitudes municipales. Permite que ciudadanos registren solicitudes, adjunten documentos, consulten estados, reciban notificaciones, reciban un correo de confirmación al crear una solicitud y levanten tickets de soporte cuando necesitan ayuda con un caso puntual.

Por otra parte, el sistema permite que funcionarios municipales visualicen solicitudes ingresadas, revisen antecedentes, cambien estados, registren observaciones, mantengan trazabilidad sobre cada expediente y respondan los tickets de soporte que los ciudadanos levantan.

Esta versión corresponde a la **Entrega Final**, por lo que además de las funcionalidades ya entregadas en EP1 y EP2, se incorporan:

- seguridad avanzada en la API (Helmet, CORS con allowlist, rate limiting);
- optimización de consultas (paginación, selección de campos, índices);
- integración con un servicio externo real (envío de correos vía Gmail/Nodemailer);
- reorganización completa del código en una arquitectura por features (`core/` + `features/`);
- despliegue completo de los tres servicios (frontend, backend, base de datos) con Docker y docker-compose;
- un módulo nuevo de tickets de soporte para ciudadanos y funcionarios.

---

## 2. Problema abordado

En muchos procesos municipales, las personas no cuentan con un canal claro y trazable para conocer el estado de sus solicitudes. Esto provoca incertidumbre, visitas presenciales innecesarias, dependencia de correos aislados y dificultad para saber si falta documentación o si una solicitud fue revisada.

El problema se manifiesta principalmente en:

- falta de visibilidad sobre el estado real del trámite;
- ausencia de notificaciones centralizadas;
- poca trazabilidad de comentarios y revisiones;
- dificultad para adjuntar o revisar documentación asociada;
- mayor carga operativa para funcionarios municipales;
- ausencia de un canal directo para resolver dudas puntuales sobre un caso;
- experiencia poco clara para usuarios con conocimientos digitales básicos.

La aplicación busca resolver este problema mediante una plataforma web/móvil híbrida donde cada solicitud tiene estado, historial, documentos, notificaciones, confirmación por correo y un canal de soporte asociado.

---

## 3. Objetivo del sistema

### Objetivo general

Implementar una aplicación web/móvil híbrida que permita gestionar solicitudes municipales mediante un frontend Ionic React conectado a una API REST segura y eficiente, con autenticación JWT, persistencia en PostgreSQL y despliegue reproducible mediante contenedores Docker.

### Objetivos específicos

- Permitir el registro e inicio de sesión de usuarios.
- Diferenciar acceso según rol: ciudadano/solicitante y funcionario municipal.
- Permitir que ciudadanos creen, consulten, editen y eliminen solicitudes según reglas de negocio.
- Permitir que funcionarios revisen solicitudes y actualicen su estado.
- Adjuntar, listar, descargar y eliminar documentos asociados a una solicitud.
- Generar y consultar notificaciones relacionadas con solicitudes.
- Enviar un correo de confirmación real al ciudadano cuando crea una solicitud.
- Permitir que ciudadanos levanten tickets de soporte y que funcionarios los respondan.
- Mantener trazabilidad mediante historial de acciones en base de datos.
- Exponer una API REST con respuestas JSON estructuradas, paginadas y eficientes.
- Proteger la API contra inyección SQL, XSS y abuso por exceso de solicitudes.
- Empaquetar y desplegar la aplicación completa con Docker.
- Documentar y probar endpoints con Postman.

---

## 4. Alcance de la Entrega Final

### Incluido en esta versión

- Todo lo entregado en EP1 y EP2 (frontend Ionic React, backend Express + TypeScript, PostgreSQL + Prisma, JWT, bcrypt, CRUD de solicitudes, documentos, notificaciones, catálogo de trámites, contactos de funcionarios).
- Reorganización completa del código en arquitectura por features (`core/` + `features/`) en frontend y backend.
- Módulo nuevo de **tickets de soporte**: el ciudadano puede crear un ticket (asociado o no a una solicitud existente) y revisar sus propios tickets; el funcionario puede ver todos los tickets y responderlos.
- **Seguridad avanzada (EF3):** cabeceras HTTP defensivas con Helmet, CORS restringido por lista de orígenes permitidos, rate limiting general y específico para autenticación.
- **Optimización de consultas (EF4):** paginación real en el listado de solicitudes, selección explícita de campos en consultas Prisma (evitando exponer datos innecesarios) e índices de base de datos en la tabla de tickets.
- **Integración con servicio externo (EF5):** envío de correo de confirmación real mediante Nodemailer contra un servidor SMTP de Gmail al crear una solicitud.
- **Despliegue con Docker (EF6):** Dockerfile para frontend y backend, y `docker-compose.yml` que orquesta base de datos, backend y frontend con healthchecks.

### No incluido en esta versión

- Integración con Clave Única u OAuth externo.
- Recuperación de contraseña con envío real de correo (la pantalla de cambio de contraseña sigue siendo prototipal/local).
- WebSockets o notificaciones push en tiempo real.
- Panel administrador para gestionar funcionarios o el catálogo de trámites desde la aplicación.
- Catálogo de trámites editable: sigue siendo un arreglo estático servido por el backend.
- Almacenamiento de documentos en un servicio externo (S3 u otro); los archivos siguen guardándose en `uploads/` (en Docker, en un volumen persistente).

---

## 5. Usuarios y roles

El sistema considera dos roles principales.

| Rol frontend | Rol backend | Descripción | Acceso principal |
|---|---|---|---|
| `solicitante` | `ciudadano` | Usuario que crea y consulta solicitudes municipales. | Perfil, nueva solicitud, historial, detalle, notificaciones, contacto/tickets de soporte e información de trámites. |
| `funcionario` | `funcionario` | Usuario municipal que revisa, gestiona y actualiza solicitudes. | Perfil, bandeja, historial, revisión de solicitud, notificaciones y bandeja de tickets de soporte. |

La conversión entre nombres de rol se realiza en el frontend, porque la interfaz usa el concepto de **solicitante**, mientras que la base de datos usa el enum **ciudadano**.

```ts
ciudadano   -> solicitante
funcionario -> funcionario
```

---

## 6. Funcionalidades implementadas

### 6.1 Funcionalidades para ciudadano/solicitante

- Registro de usuario e inicio de sesión.
- Visualización de perfil con datos reales del usuario autenticado.
- Creación de nueva solicitud, con selección dinámica del tipo de trámite desde la API.
- Recepción de un correo de confirmación real al crear una solicitud.
- Adjuntar documentos al expediente.
- Consulta de historial de solicitudes propias, con filtros por ID, tipo, estado, fecha y título.
- Refresco de solicitudes desde la API sin recargar manualmente la página.
- Consulta de detalle de una solicitud y de los comentarios del funcionario.
- Edición y eliminación de solicitudes pendientes (bloqueada si ya está en revisión, resuelta o rechazada).
- Consulta de notificaciones y marcado como leídas.
- Consulta de información de trámites y de contactos de funcionarios.
- Creación de tickets de soporte (asociados o no a una solicitud) y consulta de sus propios tickets, incluida la respuesta del funcionario cuando existe.

### 6.2 Funcionalidades para funcionario

- Inicio de sesión y visualización de perfil funcionario.
- Bandeja e historial de solicitudes, con filtros por número, identificador, fecha, estado, título y cliente/comuna.
- Refresco de bandeja e historial desde la API sin recargar la página.
- Revisión de detalle de solicitud, visualización y descarga de documentos adjuntos.
- Cambio de estado de solicitud con registro de comentario, lo que dispara una notificación al ciudadano.
- Consulta de notificaciones recibidas y marcado como leídas.
- Bandeja de tickets de soporte de todos los ciudadanos, con filtro por tipo, y respuesta a cada ticket pendiente.

### 6.3 Funcionalidades transversales

- Manejo de sesión con JWT y almacenamiento local (`localStorage`) del token, usuario y rol activo.
- Limpieza automática de sesión cuando el token expira o es inválido.
- Rutas protegidas por rol en frontend y backend.
- Respuestas de API estandarizadas (`ok`, `message`, `data`/`errors`).
- Validaciones de entrada en backend y manejo de códigos HTTP.
- Persistencia real en PostgreSQL, con consultas paginadas y selección explícita de campos.
- Trazabilidad mediante historial de acciones.
- Cabeceras de seguridad, CORS restringido y límite de solicitudes por IP en toda la API.

---

## 7. Requerimientos funcionales y no funcionales

Esta sección define los requerimientos funcionales y no funcionales del sistema. Cada requerimiento funcional incluye rol asociado, descripción, alcance y criterio de aceptación, para delimitar claramente qué debe hacer el sistema y cómo se puede comprobar su cumplimiento.

### 7.0 Roles considerados

| Rol | Descripción | Acceso principal dentro del sistema |
|---|---|---|
| Público | Persona que aún no ha iniciado sesión. Puede registrarse o iniciar sesión para acceder al sistema. | Registro e inicio de sesión. |
| Usuario autenticado | Persona con sesión válida mediante JWT. Puede acceder a funcionalidades protegidas según su rol específico. | Validación de sesión, navegación protegida y acceso a datos propios. |
| Ciudadano/Solicitante | Usuario que registra solicitudes municipales, revisa su estado, adjunta documentos, recibe notificaciones y puede levantar tickets de soporte. | Crear, listar, editar, eliminar y consultar solicitudes propias; gestionar documentos propios; revisar notificaciones y tickets. |
| Funcionario | Usuario municipal encargado de revisar solicitudes, cambiar estados, registrar comentarios, consultar solicitudes de ciudadanos y responder tickets de soporte. | Bandeja general de solicitudes, detalle de expedientes, cambio de estado, historial, notificaciones y bandeja de tickets. |
| Ciudadano/Funcionario autorizado | Usuario autenticado que tiene permisos sobre una solicitud específica. En el caso del ciudadano, debe ser dueño de la solicitud; en el caso del funcionario, debe tener rol funcionario. | Acceso controlado a detalle, documentos, historial y acciones permitidas sobre una solicitud. |

> Nota de implementación: en el frontend se usa el concepto visual `solicitante`, mientras que en la base de datos y backend el enum equivalente es `ciudadano`.

---

### 7.1 Requerimientos funcionales

| ID | Requerimiento | Rol | Estado | Descripción y alcance | Criterio de aceptación |
|---|---|---|---|---|---|
| RF01 | Registrar usuario. | Público | Implementado. | El sistema debe permitir que una persona cree una cuenta ingresando sus datos personales mínimos, tales como nombre, RUT, correo, región, comuna y contraseña. El registro queda asociado por defecto al rol ciudadano. | Dado un formulario válido, el sistema debe crear el usuario, almacenar la contraseña con hash bcrypt y retornar un usuario público sin `passwordHash`. Si faltan datos o el correo/RUT ya existe, debe responder con error estructurado. |
| RF02 | Iniciar sesión. | Público | Implementado. | El sistema debe permitir que un usuario registrado acceda mediante correo y contraseña. Al iniciar sesión correctamente, el backend debe generar un token JWT y retornar los datos públicos del usuario. | Dadas credenciales válidas, el sistema debe retornar `ok: true`, usuario público y token. Dadas credenciales inválidas, debe retornar `401 Unauthorized`. |
| RF03 | Validar sesión actual. | Usuario autenticado | Implementado mediante `/auth/me`. | El sistema debe permitir validar si el token JWT almacenado por el frontend sigue siendo válido y obtener la información actual del usuario autenticado. | Dado un token válido, `/auth/me` debe retornar el usuario autenticado. Dado un token faltante, vencido o inválido, debe responder `401 Unauthorized` y el frontend debe limpiar la sesión local. |
| RF04 | Crear solicitud municipal. | Ciudadano | Implementado. | El sistema debe permitir que un ciudadano cree una nueva solicitud municipal indicando título, categoría, descripción, dirección, comuna y prioridad. La solicitud debe quedar asociada al usuario autenticado y se debe intentar enviar un correo de confirmación real. | Dado un formulario válido, el sistema debe crear una solicitud en estado `pendiente`, asociada al ciudadano autenticado y visible en su historial. Si faltan campos obligatorios, debe retornar `400 Bad Request`. Si falla el correo, la solicitud no debe revertirse. |
| RF05 | Listar solicitudes propias. | Ciudadano | Implementado con paginación. | El sistema debe permitir que un ciudadano consulte únicamente las solicitudes que él mismo ha creado, evitando que acceda a solicitudes de otros usuarios. | Al ingresar como ciudadano, la vista de historial debe mostrar solo solicitudes cuyo `usuarioId` coincida con el usuario autenticado. La API debe aceptar `page` y `limit` para paginar resultados. |
| RF06 | Listar todas las solicitudes. | Funcionario | Implementado con paginación. | El sistema debe permitir que un funcionario consulte la bandeja general de solicitudes municipales registradas por ciudadanos. | Al ingresar como funcionario, la bandeja debe listar solicitudes de distintos ciudadanos, ordenadas por fecha de creación o actualización. Un ciudadano no debe poder acceder a esta vista. |
| RF07 | Ver detalle de solicitud. | Ciudadano/Funcionario autorizado | Implementado con control de permisos. | El sistema debe permitir consultar el detalle completo de una solicitud, incluyendo datos generales, estado, prioridad, documentos, comentarios e historial cuando corresponda. | Un ciudadano solo debe poder ver solicitudes propias. Un funcionario debe poder ver cualquier solicitud. Si el usuario no tiene permiso, el sistema debe retornar `403 Forbidden`. |
| RF08 | Editar solicitud pendiente. | Ciudadano | Implementado. | El sistema debe permitir que un ciudadano modifique los datos de una solicitud propia mientras esta se encuentre en estado `pendiente`. No se permite modificar solicitudes que ya estén en revisión, resueltas o rechazadas. | Dada una solicitud propia en estado `pendiente`, el sistema debe guardar los cambios. Si la solicitud no está pendiente, debe retornar conflicto de regla de negocio, por ejemplo `409 Conflict`. |
| RF09 | Eliminar solicitud pendiente. | Ciudadano | Implementado. | El sistema debe permitir que un ciudadano elimine una solicitud propia solo si aún está en estado `pendiente`. Esta regla evita eliminar solicitudes que ya fueron tomadas por funcionarios. | Dada una solicitud propia pendiente, el sistema debe eliminarla correctamente. Si la solicitud pertenece a otro usuario o no está pendiente, debe retornar `403 Forbidden` o `409 Conflict` según corresponda. |
| RF10 | Cambiar estado de solicitud. | Funcionario | Implementado. | El sistema debe permitir que un funcionario cambie el estado de una solicitud a `pendiente`, `en_revision`, `resuelta` o `rechazada`, registrando opcionalmente un comentario funcionario. | Dado un funcionario autenticado y un estado válido, el sistema debe actualizar la solicitud, registrar historial y crear una notificación para el ciudadano. Un ciudadano no debe poder ejecutar esta acción. |
| RF11 | Registrar comentario de revisión. | Funcionario | Implementado. | El sistema debe permitir que un funcionario agregue un comentario asociado a la revisión de una solicitud, especialmente al cambiar su estado. | Al cambiar el estado con comentario, el comentario debe quedar almacenado en la solicitud y/o historial, y debe ser visible en el detalle correspondiente. |
| RF12 | Subir documentos. | Ciudadano/Funcionario autorizado | Implementado. | El sistema debe permitir adjuntar documentos a una solicitud mediante `multipart/form-data`, usando Multer en backend. El campo esperado debe ser `documento`. | Dado un archivo válido, el sistema debe almacenarlo y asociarlo a la solicitud. Debe rechazar archivos no permitidos, archivos mayores a 15 MB o solicitudes con más de 10 documentos. |
| RF13 | Listar documentos. | Ciudadano/Funcionario autorizado | Implementado. | El sistema debe permitir consultar los documentos asociados a una solicitud, siempre que el usuario tenga permiso sobre ella. | Al consultar los documentos de una solicitud autorizada, el sistema debe retornar nombre original, tipo MIME, tamaño, fecha de subida y metadatos necesarios para descarga o eliminación. |
| RF14 | Descargar documentos. | Ciudadano/Funcionario autorizado | Implementado. | El sistema debe permitir descargar un documento previamente asociado a una solicitud, validando permisos antes de entregar el archivo. | Dado un documento existente y un usuario autorizado, el sistema debe permitir la descarga. Si el documento no existe o el usuario no tiene permisos, debe retornar `404 Not Found` o `403 Forbidden`. |
| RF15 | Eliminar documentos. | Ciudadano/Funcionario autorizado | Implementado. | El sistema debe permitir eliminar documentos asociados a una solicitud cuando el usuario autenticado tenga autorización para gestionar dicha solicitud o documento. | Dado un documento existente y un usuario autorizado, el sistema debe eliminar el registro y/o archivo asociado. Si no tiene permiso, debe retornar `403 Forbidden`. |
| RF16 | Ver notificaciones. | Usuario autenticado | Implementado. | El sistema debe permitir que cada usuario autenticado consulte sus notificaciones, principalmente las generadas por cambios de estado de solicitudes. | Al consultar `/api/notificaciones`, el sistema debe retornar solo notificaciones cuyo `usuarioId` corresponda al usuario autenticado. |
| RF17 | Marcar notificación como leída. | Usuario autenticado dueño de la notificación | Implementado. | El sistema debe permitir marcar como leída una notificación propia, evitando modificar notificaciones de otros usuarios. | Dada una notificación propia, el sistema debe actualizar `leida` a `true`. Si la notificación pertenece a otro usuario, debe retornar `403 Forbidden`. |
| RF18 | Listar funcionarios de contacto. | Usuario autenticado | Implementado. | El sistema debe permitir consultar una lista de funcionarios disponibles como contacto, sin exponer información sensible como contraseñas o hashes. | Al consultar `/api/usuarios/funcionarios`, el sistema debe retornar usuarios con rol `funcionario` y excluir siempre el campo `passwordHash`. |
| RF19 | Listar catálogo de trámites. | Usuario autenticado | Implementado. | El sistema debe permitir consultar el catálogo de trámites disponible para orientar la creación de solicitudes municipales. Cada trámite debe incluir información como tipo, documentos requeridos, tiempo estimado y área responsable. | Al consultar `/api/tramites`, el sistema debe retornar una lista de trámites estructurada y utilizable por el frontend para poblar formularios o vistas informativas. |
| RF20 | Crear ticket de soporte. | Ciudadano | Implementado. | El sistema debe permitir que un ciudadano cree un ticket de soporte, asociado opcionalmente a una solicitud propia, para consultar dudas o problemas sobre un trámite. | Dado un ciudadano autenticado y un comentario válido, el sistema debe crear el ticket en estado `pendiente`. Si se asocia a una solicitud ajena, debe retornar error y no crear el ticket. |
| RF21 | Listar tickets propios. | Ciudadano | Implementado. | El sistema debe permitir que un ciudadano consulte solo los tickets que él mismo creó, incluyendo estado y respuesta del funcionario cuando exista. | Al consultar `/api/tickets/mis-tickets`, el sistema debe retornar solo tickets cuyo `usuarioId` coincida con el usuario autenticado. |
| RF22 | Listar todos los tickets de soporte. | Funcionario | Implementado. | El sistema debe permitir que un funcionario consulte la bandeja general de tickets creados por ciudadanos, con filtros por tipo o estado cuando corresponda. | Al consultar `/api/tickets` como funcionario, el sistema debe retornar tickets de distintos ciudadanos. Un ciudadano no debe poder acceder a esta bandeja. |
| RF23 | Responder ticket de soporte. | Funcionario | Implementado. | El sistema debe permitir que un funcionario registre una respuesta para un ticket pendiente y lo marque como resuelto. | Dado un funcionario autenticado y una respuesta válida, el sistema debe guardar `respuestaFuncionario`, actualizar el estado a `resuelto` y reflejarlo en la vista del ciudadano. |

---

### 7.2 Requerimientos no funcionales

| ID | Requerimiento | Descripción | Métrica o criterio verificable | Evidencia en el proyecto |
|---|---|---|---|---|
| RNF01 | Usabilidad | El sistema debe ofrecer una interfaz clara, navegable y diferenciada por rol, permitiendo que ciudadanos y funcionarios encuentren fácilmente sus acciones principales. | Las acciones principales deben estar disponibles desde el menú o vista correspondiente en no más de 3 interacciones desde el ingreso al perfil. Los formularios deben mostrar campos claros y mensajes de error cuando falten datos obligatorios. | Menús por rol, formularios claros, filtros, estados visuales, navegación protegida, vistas separadas para ciudadano y funcionario, componentes Ionic y mensajes de carga/error/éxito. |
| RNF02 | Seguridad avanzada | El sistema debe proteger rutas, datos y acciones sensibles mediante autenticación JWT, hash de contraseñas, control de permisos por rol, cabeceras defensivas, CORS restringido y límites de solicitudes. | El 100% de las rutas privadas debe requerir token JWT. Las contraseñas deben almacenarse con bcrypt y nunca retornarse en respuestas públicas. Las acciones restringidas deben retornar `401` si no hay sesión y `403` si el usuario no tiene permisos. La API debe aplicar Helmet, CORS con allowlist y rate limiting. | JWT, bcrypt, middleware de autenticación, middleware de roles, Helmet, CORS seguro, rate limiting general y de autenticación, Prisma ORM, respuestas sin `passwordHash` y validación de archivos. |
| RNF03 | Mantenibilidad | El código debe estar organizado en capas y carpetas separadas para facilitar cambios futuros, depuración y extensión del sistema. | El frontend y backend deben mantener separación por responsabilidad. Las pantallas, componentes, servicios, rutas, controladores, middlewares, configuración de base de datos y utilidades deben estar en carpetas independientes. | Arquitectura por features (`core/` + `features/`), separación entre presentación, datos/dominio, rutas, controladores, middlewares, utilidades, configuración y Prisma. |
| RNF04 | Trazabilidad | El sistema debe registrar acciones relevantes sobre las solicitudes para permitir seguimiento del proceso municipal. | Cada cambio de estado debe generar un registro de historial indicando solicitud, usuario actor, acción, estado anterior, estado nuevo, comentario y fecha. | Tabla `historial_solicitudes` y registro automático al cambiar estado de una solicitud. |
| RNF05 | Integridad de datos | El sistema debe mantener consistencia entre usuarios, solicitudes, documentos, notificaciones, historial, mensajes y tickets. | La base de datos debe usar claves primarias, claves foráneas, enums y relaciones para impedir estados inválidos o referencias inexistentes. Los estados deben limitarse a `pendiente`, `en_revision`, `resuelta` y `rechazada`. | Relaciones y restricciones en Prisma/PostgreSQL, enums `RolUsuario`, `EstadoSolicitud` y `PrioridadSolicitud`, e índices en tablas consultadas frecuentemente. |
| RNF06 | Manejo de errores | El sistema debe responder de forma consistente ante errores de validación, permisos, recursos inexistentes o fallos internos. | Las respuestas de error deben usar formato JSON estructurado con `ok`, `message` y, cuando corresponda, `errors`. Los códigos HTTP deben corresponder al tipo de error: `400`, `401`, `403`, `404`, `409` o `500`. | Respuestas JSON estructuradas con `ok`, `message`, `data` y `errors`; manejo centralizado desde backend y transformación de errores en `apiClient.ts`. |
| RNF07 | Rendimiento y eficiencia de respuesta | El sistema debe entregar tiempos de respuesta aceptables en un entorno local y evitar recargas completas innecesarias, además de reducir datos innecesarios en respuestas API. | Las vistas principales deben poder actualizar sus datos desde la API sin recargar la página completa. Los listados deben estar paginados cuando corresponda, las consultas deben usar ordenamiento y el backend debe seleccionar solo los campos necesarios. Como criterio de UX, las pantallas principales no deberían tardar más de 3 segundos en cargar en ambiente local. | Paginación en solicitudes con `page` y `limit`, uso de `skip`/`take`, consultas ordenadas, `select` explícito, filtros en frontend sobre datos actualizados desde API y botón de refresco. |
| RNF08 | Escalabilidad inicial | La arquitectura debe permitir agregar futuras funcionalidades sin reescribir completamente el sistema. | El frontend, backend y base de datos deben estar separados. La API debe exponer endpoints REST independientes por dominio funcional, permitiendo agregar nuevas rutas, controladores o servicios sin afectar directamente otras capas. | Arquitectura cliente-servidor separada en frontend Ionic React, backend Express API REST y base de datos PostgreSQL mediante Prisma ORM. |
| RNF09 | Integración externa controlada | El sistema debe integrarse con un servicio externo real sin comprometer la operación principal cuando dicho servicio falle. | Si el envío de correo falla, la solicitud igualmente debe quedar creada y el error debe registrarse en logs. Las credenciales del servicio externo no deben versionarse. | Nodemailer con Gmail SMTP, variables `EMAIL_ENABLED`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM`, manejo no bloqueante y `.env.example` sin credenciales reales. |
| RNF10 | Portabilidad y despliegue | El sistema debe poder levantarse de manera reproducible mediante contenedores. | Deben existir Dockerfile para frontend y backend, además de un `docker-compose.yml` que orqueste frontend, backend y base de datos con variables de entorno y healthchecks. | Dockerfile en `Ionic-Municipal/` y `nodejs-Municipal/`, `docker-compose.yml`, volúmenes persistentes para PostgreSQL y uploads, y healthchecks de servicios. |

---

### 7.3 Relación entre requerimientos, roles y módulos del sistema

| Módulo | Requerimientos asociados | Roles involucrados |
|---|---|---|
| Autenticación y sesión | RF01, RF02, RF03 | Público, Usuario autenticado |
| Gestión de solicitudes ciudadanas | RF04, RF05, RF07, RF08, RF09 | Ciudadano |
| Revisión municipal | RF06, RF07, RF10, RF11 | Funcionario |
| Gestión documental | RF12, RF13, RF14, RF15 | Ciudadano/Funcionario autorizado |
| Notificaciones | RF16, RF17 | Usuario autenticado |
| Información de apoyo | RF18, RF19 | Usuario autenticado |
| Tickets de soporte | RF20, RF21, RF22, RF23 | Ciudadano, Funcionario |
| Seguridad, trazabilidad e integridad | RNF02, RNF04, RNF05, RNF06 | Todos los roles según permisos |
| Experiencia de usuario, rendimiento y arquitectura | RNF01, RNF03, RNF07, RNF08 | Todos los roles |
| Integración externa y despliegue | RNF09, RNF10 | Equipo de desarrollo / entorno de ejecución |

## 8. Tecnologías utilizadas

### Frontend

- Ionic React 8, React 19, TypeScript.
- React Router DOM v5.
- Ionicons, Vite, Capacitor.

### Backend

- Node.js, Express, TypeScript (ESM, ejecutado con `tsx` en desarrollo).
- Prisma ORM + PostgreSQL 17.
- JWT (`jsonwebtoken`) y bcrypt para autenticación y hash de contraseñas.
- Helmet, `express-rate-limit` y CORS configurado con allowlist para seguridad avanzada.
- Multer para manejo de archivos adjuntos.
- Nodemailer para envío de correos reales (EF5).

### Desarrollo, pruebas y despliegue

- npm, Git/GitHub.
- Postman para pruebas funcionales de la API.
- Prisma Studio para inspección de la base de datos.
- Cypress/Vitest configurados desde el template Ionic.
- Docker y docker-compose para despliegue local de los tres servicios.

---

## 9. Arquitectura general

El sistema usa una arquitectura cliente-servidor, con frontend y backend organizados internamente por **features** (módulos de negocio), cada uno separando su capa de dominio (entidades y reglas), su capa de datos (acceso a la API o a Prisma) y su capa de presentación (pantallas, componentes o controladores/rutas).

```txt
Usuario
  │
  ▼
Frontend Ionic React (core/ + features/)
  │
  │ fetch / Bearer Token JWT
  ▼
Backend Express API REST (core/ + features/)
  │
  │ Prisma ORM
  ▼
PostgreSQL
```

Es importante ser preciso sobre el alcance de esta arquitectura: no se trata de una Clean Architecture completa con casos de uso y repositorios abstractos. Cada feature del backend separa `domain/entities` (los antiguos modelos) de `presentation/{controllers,routes}`, y accede directamente a Prisma a través de `core/config/prisma.ts`. Cada feature del frontend separa `domain/{entities,rules}`, `data/` (llamadas a la API) y `presentation/{components,screens}`. Se eligió este nivel de separación porque el proyecto usa una única fuente de datos (PostgreSQL) sin necesidad de intercambiarla, por lo que una capa adicional de repositorios e interfaces habría agregado complejidad sin un beneficio práctico claro para el alcance del curso.

### 9.1 Frontend

- Renderiza las pantallas por feature y administra la sesión local del usuario (`core/auth/AuthContext.tsx`).
- Protege rutas según rol (`core/router/ProtectedRoute.tsx`).
- Consume la API mediante un cliente HTTP centralizado (`network/apiClient.ts`) y servicios por feature.
- Muestra errores y mensajes de forma consistente con componentes Ionic.

### 9.2 Backend

- Autentica usuarios, genera y valida JWT, y valida permisos por rol.
- Expone endpoints REST organizados por feature.
- Valida datos de entrada y aplica seguridad avanzada (Helmet, CORS, rate limiting).
- Accede a PostgreSQL mediante Prisma, con consultas paginadas y selección explícita de campos.
- Maneja archivos con Multer y envía correos con Nodemailer.
- Registra historial y notificaciones.

### 9.3 Base de datos

PostgreSQL almacena usuarios, solicitudes, documentos, notificaciones, historial de acciones, tickets de soporte y mensajes asociados a solicitudes (este último modelo está preparado en el esquema pero todavía no tiene endpoints).

---

## 10. Estructura del proyecto

```txt
municipal-request-tracker/
│
├── Ionic-Municipal/                 # Frontend Ionic React
│   ├── src/
│   │   ├── core/
│   │   │   ├── auth/                # AuthContext
│   │   │   ├── constants/           # roles.ts
│   │   │   ├── presentation/components/{common,layout}/
│   │   │   ├── router/              # AppRouter, ProtectedRoute
│   │   │   └── theme/               # variables.css
│   │   ├── network/                 # apiClient.ts (cliente HTTP centralizado)
│   │   ├── features/
│   │   │   ├── auth/                # data, domain/rules, presentation/{components,screens}
│   │   │   ├── ciudadano/
│   │   │   ├── funcionario/
│   │   │   ├── solicitudes/
│   │   │   ├── documentos/
│   │   │   ├── notificaciones/
│   │   │   ├── tickets/             # módulo nuevo de soporte
│   │   │   ├── tramites/
│   │   │   └── usuarios/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   └── package.json
│
├── nodejs-Municipal/                 # Backend Express
│   ├── prisma/
│   │   ├── schema.prisma            # Modelo relacional Prisma
│   │   ├── seed.ts                  # Usuarios demo
│   │   └── migrations/
│   ├── src/
│   │   ├── core/
│   │   │   ├── config/              # prisma.ts
│   │   │   ├── middleware/          # auth, errores
│   │   │   └── utils/               # apiResponse, mailer
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── solicitudes/
│   │   │   ├── documentos/
│   │   │   ├── notificaciones/
│   │   │   ├── soporte/             # tickets de soporte
│   │   │   ├── tramites/
│   │   │   └── usuarios/
│   │   ├── app.ts                   # Configuración Express y seguridad avanzada
│   │   └── server.ts                # Inicio del servidor
│   ├── uploads/                     # Archivos subidos (volumen en Docker)
│   ├── Dockerfile
│   ├── .env.example
│   └── package.json
│
├── otros/                            # Mockups, modelo relacional, colecciones Postman
├── misc/                              # Diagramas adicionales (estados, secuencia, rutas)
├── docker-compose.yml                 # Orquestación de base de datos, backend y frontend
├── .env.docker.example
└── README.md
```

---

## 11. Modelo de datos

El modelo principal está definido en:

```txt
nodejs-Municipal/prisma/schema.prisma
```

El diagrama relacional está incluido en:

```txt
otros/modelo-relacional.png
```

### 11.1 Entidades principales

**Usuario:** `id`, `nombre`, `rut`, `email`, `passwordHash`, `region`, `comuna`, `rol`, `createdAt`. Un usuario ciudadano puede crear muchas solicitudes; un funcionario puede gestionar muchas; ambos pueden subir documentos, recibir notificaciones, generar historial y crear/recibir tickets de soporte.

**Solicitud:** `id`, `usuarioId`, `funcionarioId`, `titulo`, `categoria`, `descripcion`, `direccion`, `comuna`, `estado`, `prioridad`, `comentarioFuncionario`, `createdAt`, `updatedAt`. Pertenece a un ciudadano, puede estar asignada a un funcionario, y puede tener documentos, notificaciones, historial, mensajes y tickets de soporte asociados.

**DocumentoSolicitud:** `id`, `solicitudId`, `subidoPorUsuarioId`, `nombreOriginal`, `nombreAlmacenado`, `mimeType`, `sizeBytes`, `ruta`, `hashArchivo`, `createdAt`.

**Notificacion:** `id`, `usuarioId`, `solicitudId`, `titulo`, `mensaje`, `leida`, `createdAt`.

**HistorialSolicitud:** `id`, `solicitudId`, `usuarioActorId`, `accion`, `estadoAnterior`, `estadoNuevo`, `comentario`, `createdAt`.

**MensajeSolicitud:** `id`, `solicitudId`, `emisorId`, `mensaje`, `leido`, `createdAt`. Modelo preparado en el esquema; todavía no tiene endpoints ni pantallas asociadas.

**TicketSoporte** *(nuevo en esta entrega):* `id`, `solicitudId` (opcional), `usuarioId`, `titulo`, `tipo`, `comentario`, `respuestaFuncionario`, `estado` (`pendiente`/`resuelto`), `createdAt`, `updatedAt`. Incluye índices en `usuarioId`, `solicitudId` y `estado` para acelerar las consultas de bandeja (ver sección 15).

### 11.2 Enums de Prisma

```prisma
enum RolUsuario { ciudadano funcionario }
enum EstadoSolicitud { pendiente en_revision resuelta rechazada }
enum PrioridadSolicitud { baja media alta }
```

---

## 12. Estados de una solicitud

| Estado en API/BD | Estado visual | Descripción |
|---|---|---|
| `pendiente` | Pendiente | Solicitud creada y aún no revisada. |
| `en_revision` | En revisión | Solicitud tomada o revisada por funcionario. |
| `resuelta` | Resuelta | Solicitud finalizada satisfactoriamente. |
| `rechazada` | Rechazada | Solicitud rechazada por observaciones o incumplimiento. |

Reglas: el ciudadano solo puede editar o eliminar solicitudes en estado `pendiente`; el funcionario cambia el estado mediante `PATCH /api/solicitudes/:id/estado`; cada cambio de estado registra historial y genera una notificación para el ciudadano.

---

## 13. API REST

La API está disponible por defecto en `http://localhost:3000/api`. Formato de respuesta exitosa:

```json
{ "ok": true, "message": "Operación realizada correctamente", "data": {} }
```

Formato de error:

```json
{ "ok": false, "message": "Descripción del error", "errors": [{ "field": "campo", "code": "codigo_error" }] }
```

### 13.1 Health check

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | `/api/health` | No | Verifica que la API esté funcionando. |

### 13.2 Autenticación

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| POST | `/api/auth/register` | No | Registra un nuevo ciudadano. |
| POST | `/api/auth/login` | No | Inicia sesión. |
| GET | `/api/auth/me` | Sí | Valida token y retorna usuario autenticado. |

### 13.3 Solicitudes

| Método | Ruta | Auth | Rol | Descripción |
|---|---|---|---|---|
| GET | `/api/solicitudes?page=&limit=` | Sí | Ciudadano/Funcionario | Listado paginado: ciudadano ve sus solicitudes, funcionario ve todas. |
| GET | `/api/solicitudes/:id` | Sí | Ciudadano dueño/Funcionario | Detalle de solicitud. |
| POST | `/api/solicitudes` | Sí | Ciudadano | Crea solicitud y dispara correo de confirmación. |
| PUT | `/api/solicitudes/:id` | Sí | Ciudadano dueño/Funcionario | Actualiza datos de solicitud. |
| PATCH | `/api/solicitudes/:id/estado` | Sí | Funcionario | Cambia estado y registra comentario. |
| DELETE | `/api/solicitudes/:id` | Sí | Ciudadano dueño/Funcionario | Elimina solicitud según reglas de permiso/estado. |

### 13.4 Documentos

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | `/api/solicitudes/:id/documentos` | Sí | Lista documentos de una solicitud. |
| POST | `/api/solicitudes/:id/documentos` | Sí | Sube un documento (`multipart/form-data`, campo `documento`). |
| GET | `/api/solicitudes/:id/documentos/:documentoId/descargar` | Sí | Descarga un documento. |
| DELETE | `/api/solicitudes/:id/documentos/:documentoId` | Sí | Elimina un documento. |

Reglas: máximo 15 MB por archivo, máximo 10 documentos por solicitud, formatos permitidos PDF/JPG/PNG/DOC/DOCX (validados por extensión y MIME type).

### 13.5 Notificaciones

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | `/api/notificaciones` | Sí | Lista notificaciones del usuario autenticado. |
| PATCH | `/api/notificaciones/:id/leida` | Sí | Marca una notificación propia como leída. |

### 13.6 Usuarios/funcionarios y trámites

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | `/api/usuarios/funcionarios` | Sí | Lista usuarios con rol funcionario (sin `passwordHash`). |
| GET | `/api/tramites` | Sí | Lista el catálogo de trámites usado por el frontend. |

### 13.7 Tickets de soporte *(nuevo en esta entrega)*

| Método | Ruta | Auth | Rol | Descripción |
|---|---|---|---|---|
| POST | `/api/tickets` | Sí | Ciudadano | Crea un ticket, asociado o no a una solicitud propia. |
| GET | `/api/tickets/mis-tickets` | Sí | Ciudadano | Lista los tickets del usuario autenticado. |
| GET | `/api/tickets` | Sí | Funcionario | Lista todos los tickets de soporte. |
| PATCH | `/api/tickets/:id/responder` | Sí | Funcionario | Registra la respuesta y marca el ticket como `resuelto`. |

### 13.8 Códigos HTTP usados

| Código | Uso |
|---|---|
| 200 | Operación exitosa. |
| 201 | Recurso creado correctamente. |
| 400 | Datos inválidos o payload incompleto. |
| 401 | Token faltante, inválido o credenciales incorrectas. |
| 403 | Usuario autenticado sin permisos suficientes. |
| 404 | Recurso no encontrado. |
| 409 | Conflicto de regla de negocio. |
| 500 | Error interno/configuración faltante. |

---

## 14. Seguridad avanzada (EF3)

Implementada en `nodejs-Municipal/src/app.ts` y `core/middleware/auth.middleware.ts`.

- **Cabeceras defensivas:** Helmet aplicado globalmente.
- **CORS seguro:** en vez de aceptar cualquier origen, se valida contra una lista (`CLIENT_URLS`) leída desde variables de entorno; solicitudes sin cabecera `Origin` (Postman, curl) se permiten explícitamente, pero un origen de navegador que no esté en la lista es rechazado.
- **Rate limiting:** límite general de 300 solicitudes cada 15 minutos sobre `/api`, y un límite más estricto de 20 solicitudes cada 15 minutos sobre `/api/auth`, para mitigar fuerza bruta en login/registro.
- **JWT:** firmado con `JWT_SECRET`, expiración configurable (`JWT_EXPIRES_IN`), validado en cada ruta protegida vía `authMiddleware`; el control de rol se aplica con `roleMiddleware("funcionario")` o `roleMiddleware("ciudadano")` según el endpoint.
- **bcrypt:** `bcrypt.hash(password, 10)` en registro, `bcrypt.compare` en login; `passwordHash` nunca se incluye en respuestas públicas.
- **Protección contra inyección SQL:** todo el acceso a datos pasa por Prisma con consultas parametrizadas y modelos tipados; no se concatenan strings de entrada de usuario en SQL.
- **Mitigación de XSS:** la API solo devuelve JSON (no renderiza HTML con datos de usuario), y el frontend en React escapa automáticamente el contenido dinámico al renderizarlo, evitando inyección de scripts en la interfaz.
- **Validación de archivos subidos:** Multer valida tamaño máximo, y la extensión del archivo se cruza contra su MIME type real antes de aceptarlo, no solo contra el nombre declarado.
- **Manejo de credenciales:** las claves reales viven en `nodejs-Municipal/.env` (no versionado); el repositorio solo incluye `.env.example` con valores de ejemplo, nunca credenciales reales.

---

## 15. Optimización de consultas y eficiencia de respuesta (EF4)

- **Paginación real:** `GET /api/solicitudes` acepta `page` y `limit`, usa `skip`/`take` en Prisma y devuelve metadatos (`paginaActual`, `totalPaginas`, `totalRegistros`) calculados con una consulta `count` separada, en vez de traer todas las filas y paginar en memoria.
- **Selección explícita de campos:** los listados de solicitudes y el endpoint de funcionarios usan `select` para traer solo los campos necesarios (por ejemplo, nunca se selecciona `passwordHash`), reduciendo el tamaño de la respuesta y evitando exponer datos sensibles.
- **Índices de base de datos:** el modelo `TicketSoporte` define índices sobre `usuarioId`, `solicitudId` y `estado`, que son exactamente las columnas usadas para filtrar en las bandejas de "mis tickets" y "tickets pendientes".
- **Transacciones atómicas:** operaciones que tocan varias tablas (crear solicitud + notificación + historial, por ejemplo) se ejecutan dentro de `prisma.$transaction`, evitando estados intermedios inconsistentes y reduciendo idas y vueltas a la base de datos.

---

## 16. Integración con servicio externo (EF5)

El servicio externo elegido es **envío de correo real vía Gmail SMTP**, usando Nodemailer (`core/utils/mailer.ts`).

- Al crear una solicitud, el backend llama a `enviarCorreoConfirmacion(email, nombre, titulo, estado)` con los datos reales del ciudadano y de la solicitud recién creada.
- El envío se ejecuta en segundo plano y de forma no bloqueante: un fallo de red con Gmail se registra en el log pero **no** impide ni retrasa la respuesta HTTP de creación de la solicitud, ni revierte la transacción.
- El servicio se activa/desactiva con la variable `EMAIL_ENABLED`, y las credenciales se configuran con `EMAIL_USER`, `EMAIL_PASS` (contraseña de aplicación de Gmail, no la contraseña normal de la cuenta) y `EMAIL_FROM`.

> Importante: `EMAIL_PASS` es una credencial sensible real. Nunca debe escribirse en `.env.example`, `.env.docker.example` ni en ningún archivo versionado; solo debe vivir en el `.env` local de cada máquina o en las variables de entorno del entorno de despliegue.

---

## 17. Integración frontend-backend

El frontend consume la API mediante un cliente HTTP centralizado en:

```txt
Ionic-Municipal/src/network/apiClient.ts
```

Este cliente define la URL base de la API, agrega `Content-Type: application/json` cuando corresponde (omitiéndolo si el cuerpo es `FormData`), agrega `Authorization: Bearer <token>` en rutas protegidas, transforma errores HTTP en `ApiClientError`, y limpia la sesión automáticamente si recibe `401 Unauthorized`.

Cada feature tiene su propio archivo de datos en `features/<feature>/data/`, por ejemplo `authApi.ts`, `solicitudesApi.ts`, `documentosApi.ts`, `notificaciones.ts`, `soporteApi.ts`, `tramitesApi.ts` y `usuariosApi.ts`.

Variable de entorno del frontend:

```env
VITE_API_URL=http://localhost:3000/api
```

---

## 18. Despliegue con Docker (EF6)

`docker-compose.yml`, en la raíz del repositorio, orquesta tres servicios:

| Servicio | Imagen/build | Puerto host | Notas |
|---|---|---|---|
| `database` | `postgres:17` | `5433` → `5432` | Healthcheck con `pg_isready`; datos persistidos en el volumen `postgres_data`. |
| `backend` | build de `./nodejs-Municipal` | `3000` | Espera a que `database` esté `healthy`; healthcheck propio contra `/api/health`; uploads persistidos en el volumen `uploads_data`. |
| `frontend` | build de `./Ionic-Municipal` | `8100` | Espera a que `backend` esté `healthy`; recibe `VITE_API_URL` apuntando al backend. |

### 18.1 Pasos para levantar todo con Docker

1. Copiar el archivo de ejemplo y completar tus propias credenciales (nunca las reales del proyecto en un commit):

   ```bash
   cp .env.docker.example .env
   ```

2. Completar en ese `.env` al menos `JWT_SECRET` y, si quieres que se envíen correos reales, `EMAIL_USER`/`EMAIL_PASS` con una contraseña de aplicación de Gmail propia.

3. Levantar todo:

   ```bash
   docker compose up --build
   ```

4. Verificar:

   - Backend: `http://localhost:3000/api/health`
   - Frontend: `http://localhost:8100`

5. Para limpiar todo (incluida la base de datos):

   ```bash
   docker compose down -v
   ```

### 18.2 Notas

- Las migraciones de Prisma deben aplicarse contra la base de datos del contenedor antes del primer uso real (`npx prisma migrate deploy`, ejecutado dentro del contenedor `backend` o apuntando `DATABASE_URL` al puerto publicado `5433`).
- El volumen `uploads_data` asegura que los documentos subidos sobrevivan a un `docker compose down` (sin `-v`).

---

## 19. Instalación y ejecución sin Docker

Esta alternativa sirve para desarrollo local sin contenedores.

### 19.1 Requisitos previos

Node.js, npm, Git, PostgreSQL instalado y ejecutándose, Ionic CLI (`npm install -g @ionic/cli`) y Postman.

### 19.2 Clonar y configurar base de datos

```bash
git clone https://github.com/IgnacioGameolay/municipal-request-tracker.git
cd municipal-request-tracker
```

Crear una base de datos `municipal_request_tracker`. El puerto de ejemplo es `5433`; si tu PostgreSQL usa el `5432` estándar, ajusta `DATABASE_URL`.

### 19.3 Backend

```bash
cd nodejs-Municipal
npm install
```

Crear `.env` usando `nodejs-Municipal/.env.example` como base, completando tus propios valores (especialmente `JWT_SECRET` y, si vas a probar el correo real, `EMAIL_USER`/`EMAIL_PASS` con una contraseña de aplicación de Gmail propia).

```bash
npx prisma generate
npx prisma migrate dev
npm run db:seed
npm run dev
```

Backend disponible en `http://localhost:3000/api`; health check en `http://localhost:3000/api/health`.

### 19.4 Frontend

```bash
cd Ionic-Municipal
npm install
```

Verificar que exista `VITE_API_URL=http://localhost:3000/api` en el archivo de entorno correspondiente, luego:

```bash
npm run dev
```

Frontend disponible normalmente en `http://localhost:5173` (o `http://localhost:8100` si se usa `ionic serve`).

### 19.5 Compilar proyecto

```bash
cd nodejs-Municipal && npm run typecheck && npm run build
cd ../Ionic-Municipal && npm run build
```

---

## 20. Usuarios demo

Después de `npm run db:seed` en `nodejs-Municipal`:

| Rol | Email | Contraseña |
|---|---|---|
| Ciudadano/Solicitante | `ciudadano@demo.cl` | `123456` |
| Funcionario | `funcionario@demo.cl` | `123456` |

---

## 21. Flujos recomendados de demostración

### 21.1 Flujo ciudadano

1. Iniciar sesión con `ciudadano@demo.cl`.
2. Crear una nueva solicitud y revisar que llegue el correo de confirmación (si `EMAIL_ENABLED=true`).
3. Ir al historial, refrescar desde la API, ver el detalle y editar la solicitud mientras esté pendiente.
4. Crear un ticket de soporte asociado a esa solicitud y revisar el estado del ticket.
5. Consultar notificaciones, información de trámites y contactos de funcionarios.

### 21.2 Flujo funcionario

1. Iniciar sesión con `funcionario@demo.cl`.
2. Ir a la bandeja, refrescar desde la API, abrir la solicitud creada por el ciudadano.
3. Cambiar el estado, agregar un comentario y confirmar.
4. Ir a la bandeja de tickets de soporte, abrir el ticket creado por el ciudadano y responderlo.
5. Revisar el historial de la solicitud.

### 21.3 Flujo con dos navegadores

Repetir el flujo de EP2 (un navegador como ciudadano, otro como funcionario, usando el botón de refresco en vez de F5) y sumar la verificación cruzada del ticket de soporte: el ciudadano lo crea, el funcionario lo responde, el ciudadano refresca su bandeja y ve la respuesta.

---

## 22. Pruebas en Postman

La colección actualizada para esta entrega está en:

```txt
otros/postman-entrega-final/collections/API Proyecto Web y Movil/
```

con las carpetas: `Salud del Servidor`, `Autenticacion`, `Solicitudes`, `Documentos`, `Notificaciones`, `Funcionarios`, `Seguridad` (pruebas negativas) y **`Tickets`** (nueva, con creación, listado, respuesta y casos negativos).

El entorno se encuentra en:

```txt
otros/postman-entrega-final/environments/Local - Proyecto Web y Movil.environment.yaml
```

con variables como `baseUrl`, `token`/`tokenCiudadano`/`tokenFuncionario`, `solicitudId` y `documentoId`.

La colección de la entrega parcial anterior se conserva como referencia histórica en `otros/postman-entregas-parciales/`.

### 22.1 Pruebas negativas incluidas

| Caso | Resultado esperado |
|---|---|
| Login con credenciales incorrectas | `401 Unauthorized`. |
| Registro con campos faltantes o correo repetido | `400`/`409`. |
| Listar solicitudes o trámites sin token | `401 Unauthorized`. |
| Token inválido en ruta protegida | `401 Unauthorized`. |
| Marcar notificación ajena como leída | `403 Forbidden`. |
| Crear ticket sin comentario | `400 Bad Request`. |
| Crear ticket asociado a una solicitud ajena | `404 Not Found`. |
| Ciudadano intenta responder un ticket | `403 Forbidden`. |
| Responder ticket sin enviar respuesta | `400 Bad Request`. |

---

## 23. Material adicional de entrega

```txt
otros/
├── Mockups-Proyecto Ing Web & Móvil/   # Prototipos UI/UX
├── modelo-relacional.png               # Diagrama entidad-relación
├── postman-entrega-final/              # Colección y entorno vigentes
└── postman-entregas-parciales/         # Colecciones históricas (EP1/EP2)

misc/
├── Diagrama de Máquina de Estados.png
├── Diagrama_Secuencia.png
├── Ionic + React Routing-*.png
└── RootTree.png
```

---

## 24. Comandos útiles

### Backend

```bash
cd nodejs-Municipal
npm install
npx prisma generate
npx prisma migrate dev
npm run db:seed
npm run dev
npm run typecheck
npm run build
npm run db:studio
npx prisma migrate reset
```

### Frontend

```bash
cd Ionic-Municipal
npm install
npm run dev
npm run build
```

### Docker

```bash
docker compose up --build
docker compose down -v
```

### Limpieza de sesión frontend

```js
localStorage.clear();
location.href = "/login";
```

---

## 25. Solución de problemas comunes

**Error de conexión con backend:** verificar que el backend esté corriendo (`npm run dev` en `nodejs-Municipal/`, o el contenedor `backend` arriba), y que `VITE_API_URL` apunte al puerto correcto.

**Error CORS:** revisar que el origen real del frontend (`http://localhost:5173`, `http://localhost:8100`, o el puerto de Docker) esté incluido en `CLIENT_URLS` del `.env` del backend.

**Error de base de datos:** confirmar que PostgreSQL esté corriendo, que la base exista, que `DATABASE_URL` tenga usuario/contraseña/host/puerto correctos, y que las migraciones se hayan aplicado.

**No llega el correo de confirmación:** confirmar `EMAIL_ENABLED=true` y que `EMAIL_USER`/`EMAIL_PASS` correspondan a una contraseña de aplicación de Gmail vigente (no la contraseña normal de la cuenta); revisar el log del backend, ya que un fallo de correo no bloquea la creación de la solicitud.

**Token expirado o sesión inválida:** el frontend limpia la sesión automáticamente ante `401`; si persiste, `localStorage.clear()` y recargar.

**No aparecen usuarios demo:** ejecutar `npm run db:seed` dentro de `nodejs-Municipal`.

---

## 26. Limitaciones actuales

- No hay integración con Clave Única u OAuth externo.
- La recuperación de contraseña sigue siendo una pantalla prototipal sin envío real de correo.
- Las notificaciones son persistidas y consultables, pero no se emiten en tiempo real con WebSockets.
- El catálogo de trámites se sirve como arreglo estático, no como tabla administrable.
- No existe panel administrador para gestionar funcionarios o trámites.
- Los documentos se almacenan localmente en `uploads/` (con volumen persistente en Docker), no en un servicio externo como S3.
- El modelo `MensajeSolicitud` está preparado en el esquema de base de datos pero todavía no tiene endpoints ni pantallas.

---

## 27. Cumplimiento de pauta de Entrega Final

| Criterio | Puntaje | Evidencia en el proyecto |
|---|---|---|
| EF1. Funcionalidades completas e integración funcional | 20 pts | CRUD completo de solicitudes, documentos y notificaciones; autenticación y roles; módulo nuevo de tickets de soporte; almacenamiento local de sesión (`localStorage`); flujo integrado y estable entre `Ionic-Municipal` y `nodejs-Municipal`. |
| EF2. Mejoras de UI/UX y optimización del rendimiento | 15 pts | Menús diferenciados por rol, componentes Ionic nativos (`IonCard`, `IonModal`, `IonToast`, `IonSpinner`, `IonBadge`) para estados de carga/éxito/error, patrón de actualización sin recarga completa, y arquitectura por features que facilita mantener consistencia visual entre pantallas. |
| EF3. Seguridad avanzada en la API | 15 pts | Helmet, CORS con allowlist, rate limiting general y de autenticación, JWT, bcrypt, validación cruzada de extensión/MIME en archivos subidos, consultas parametrizadas vía Prisma. Ver sección 14. |
| EF4. Optimización de consultas y eficiencia de respuesta | 10 pts | Paginación real con `skip`/`take` y conteo separado, `select` explícito de campos, índices en `TicketSoporte`, operaciones multi-tabla envueltas en `$transaction`. Ver sección 15. |
| EF5. Integración con servicio externo o API de terceros | 10 pts | Envío de correo de confirmación real vía Gmail SMTP con Nodemailer, no bloqueante, configurable por variables de entorno. Ver sección 16. |
| EF6. Despliegue local mediante Docker y docker-compose | 15 pts | `Dockerfile` para frontend y backend, `docker-compose.yml` con los tres servicios, healthchecks y volúmenes persistentes. Ver sección 18. |
| Repositorio público en GitHub | — | `https://github.com/IgnacioGameolay/municipal-request-tracker` |
| README.md con descripción, integrantes y pasos de ejecución | — | Este documento. |

---

## 28. Integrantes

Proyecto desarrollado para la asignatura **ICI4247 - Ingeniería Web y Móvil**.

- Sebastián Andrés de Jesús García Valdebenito.
- Francisca Antonia Guzmán Pérez.
- Vicente Nills Quezada Gallardo.
- Ignacio Antonio Reyes Toledo.

---

## Estado final de esta entrega

La versión actual corresponde a la aplicación full-stack completa para la Entrega Final. Sobre la base funcional de EP1 y EP2 (backend Express, PostgreSQL + Prisma, JWT, bcrypt, rutas protegidas, roles e integración frontend-backend), esta entrega agrega seguridad avanzada en la API, optimización de consultas, un módulo nuevo de tickets de soporte, integración real con un servicio externo de correo, una reorganización completa del código en arquitectura por features, y despliegue reproducible de los tres servicios mediante Docker y docker-compose.
