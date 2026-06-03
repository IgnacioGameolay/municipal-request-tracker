# Municipal Request Tracker - Gestor de Solicitudes Municipales

Aplicación web desarrollada con **Ionic + React + TypeScript** para el seguimiento, revisión y comunicación de solicitudes municipales entre solicitantes y funcionarios. El proyecto corresponde a la Entrega Parcial 1 de Ingeniería Web y Móvil, centrada en frontend, navegación, prototipado funcional, roles, experiencia de usuario y organización modular del código.



## 1. Descripción general del proyecto

Municipal Request Tracker es un prototipo funcional de una plataforma de gestión de solicitudes municipales. Su propósito es mejorar la comunicación entre los municipios y las personas solicitantes durante el proceso de revisión de trámites, especialmente cuando una solicitud requiere correcciones, documentación adicional, aclaraciones o cuando es rechazada/anulada.

El sistema permite que una persona solicitante cree solicitudes, consulte su historial, revise el estado de sus trámites, acceda a observaciones realizadas por funcionarios, vea notificaciones y consulte canales de contacto. Por otra parte, permite que un funcionario municipal revise solicitudes, actualice estados, registre comentarios y deje trazabilidad de las revisiones realizadas.

El proyecto se diseñó tomando como referencia una problemática real frecuente en servicios municipales: la falta de información clara y oportuna sobre el avance de trámites, documentación faltante y razones de rechazo.



## 2. Problema abordado

En muchos procesos municipales, los solicitantes no reciben información clara, oportuna y trazable sobre el estado de sus solicitudes. Cuando falta documentación, una solicitud queda pendiente o es rechazada, la persona interesada suele enterarse tarde, de forma incompleta o mediante canales informales como llamadas, correos aislados o visitas presenciales.

Esta situación produce varios problemas:

- Incertidumbre sobre el estado real de una solicitud.
- Dificultad para saber qué documento falta o qué corrección debe realizarse.
- Aumento de visitas presenciales innecesarias al municipio.
- Mayor carga operativa para funcionarios, que deben responder consultas repetidas.
- Falta de trazabilidad de observaciones, revisiones y cambios de estado.
- Pérdida de tiempo para ciudadanos, emprendedores y pequeñas empresas que dependen de estos trámites para operar.

El sistema propuesto busca mejorar esta situación mediante una interfaz clara de seguimiento, historial, notificaciones, comentarios de revisión y actualización de estados.



## 3. Objetivo del sistema

Diseñar e implementar un prototipo frontend de una aplicación web para gestionar solicitudes municipales, permitiendo que solicitantes y funcionarios interactúen con el estado de los trámites de forma ordenada, trazable y comprensible.

### Objetivos específicos

- Permitir que el solicitante cree y consulte solicitudes municipales.
- Mostrar el estado actual de cada solicitud mediante etiquetas visuales.
- Permitir que el funcionario revise solicitudes y actualice su estado.
- Registrar comentarios del funcionario asociados a una revisión.
- Mostrar historial de revisiones y última revisión realizada.
- Facilitar la consulta de requisitos y canales de contacto.
- Diferenciar la navegación y funcionalidades según rol.
- Implementar rutas públicas y rutas protegidas mediante React Router.
- Modularizar la interfaz en componentes reutilizables.
- Separar responsabilidades entre dominio, aplicación, infraestructura, componentes y páginas.



## 4. [MODIFICADO] Alcance Actual del Proyecto

Esta entrega abarca tanto el desarrollo frontend del sistema como la implementación de un backend funcional, superando la fase inicial de persistencia simulada temporal.

### Incluido actualmente

- Proyecto Ionic React con TypeScript.
- Rutas públicas y protegidas en el frontend.
- Separación estricta de roles validados desde el backend (Solicitante y Funcionario Municipal).
- Autenticación real con JWT y encriptación de contraseñas.
- Backend en Node.js con Express y Prisma ORM.
- Base de datos relacional real en PostgreSQL.
- Creación, edición, listado, detalle y eliminación de solicitudes (CRUD completo en BD).
- Subida y descarga real de archivos al servidor mediante Multer.
- Bandeja e historial de gestión real para el funcionario.
- Cambio de estado y registro de comentarios persistidos en PostgreSQL.
- Historial de revisiones automatizado en el servidor.
- Notificaciones simuladas en frontend (estructura base para futura integración real).
- Consulta de información sobre requisitos de trámites.
- Contacto y ayuda con funcionarios simulados.
- Colección de pruebas en Postman documentada con flujos reales.
- Refactorización modular por carpetas de dominio, aplicación, infraestructura, componentes y páginas.

### No incluido en esta entrega

- Envío real de correos electrónicos para recuperación de contraseña.
- Gestión avanzada de permisos multisucursal.
- Integración con servicios municipales externos (RUT, Clave Única, etc.).
- Notificaciones push o WebSockets en tiempo real.


## 5. Usuarios objetivo

### 5.1 Solicitante

Persona natural, emprendedor, representante de pyme o ciudadano que realiza una solicitud municipal y necesita conocer su estado. Puede tener nivel digital básico o intermedio, por lo que la interfaz debe ser clara, directa y fácil de usar.

Necesidades principales:

- Crear una solicitud.
- Ver el estado de sus solicitudes.
- Saber si falta documentación.
- Revisar comentarios del funcionario.
- Consultar el historial de revisiones.
- Acceder a canales de contacto.
- Conocer requisitos por tipo de trámite.
- Recibir notificaciones simuladas sobre cambios relevantes.

### 5.2 Funcionario Municipal

Persona encargada de revisar solicitudes ingresadas al sistema, actualizar estados y registrar observaciones. Necesita una vista organizada que le permita gestionar múltiples solicitudes de forma eficiente.

Necesidades principales:

- Consultar solicitudes disponibles para revisión.
- Filtrar solicitudes por estado, fecha, título, tipo o identificador.
- Revisar el detalle de una solicitud.
- Registrar comentarios u observaciones.
- Cambiar el estado de una solicitud.
- Rechazar una solicitud cuando corresponda.
- Dejar trazabilidad de la revisión realizada.
- Consultar historial de solicitudes desde la vista de gestión.



## 6. Roles del sistema

El sistema considera dos roles principales.

| Rol | Descripción | Acceso principal |
|---|---|---|
| Solicitante | Usuario que crea y consulta solicitudes municipales. | Perfil, nueva solicitud, historial, detalle, notificaciones, contacto, información de solicitudes. |
| Funcionario Municipal | Usuario que revisa solicitudes y actualiza estados. | Perfil funcionario, bandeja, historial, revisión de solicitud, notificaciones. |

En esta entrega, el control de sesión y rol se simula mediante `AuthContext` y `localStorage`. El rol se guarda bajo la clave `rol_actual` y solo se consideran válidos los valores:

```txt
solicitante
funcionario
```

El cambio manual de rol se mantiene como apoyo prototipal para la demostración. Actualmente se gestiona desde el encabezado común, cambiando el rol y redirigiendo a la pantalla inicial correspondiente:

```txt
solicitante  -> /funcionario/tramites
funcionario  -> /ciudadano/tramites
```

En una versión productiva, este mecanismo debe ser reemplazado por autenticación real y control de permisos desde backend.



## 7. Requerimientos funcionales considerados

| ID | Requerimiento funcional | Rol principal | Estado en prototipo |
|---|---|---|---|
| RF01 | Registrar y consultar solicitudes municipales. | Solicitante | Implementado en frontend. |
| RF02 | Visualizar estado actual de una solicitud. | Solicitante / Funcionario | Implementado con etiquetas de estado. |
| RF03 | Crear una nueva solicitud. | Solicitante | Implementado con formulario. |
| RF04 | Editar o complementar información de una solicitud. | Solicitante | Implementado mediante vista de edición. |
| RF05 | Consultar historial de solicitudes realizadas. | Solicitante | Implementado con tabla, filtros y acciones. |
| RF06 | Recibir notificaciones sobre cambios de estado. | Solicitante | Implementado con datos simulados. |
| RF07 | Visualizar comentarios u observaciones del funcionario. | Solicitante | Implementado en detalle de solicitud. |
| RF08 | Revisar solicitudes ingresadas. | Funcionario | Implementado en bandeja e historial. |
| RF09 | Actualizar estado de una solicitud. | Funcionario | Implementado con modal de cambio de estado. |
| RF10 | Rechazar una solicitud. | Funcionario | Implementado con modal de confirmación. |
| RF11 | Registrar historial de revisión. | Funcionario / Solicitante | Implementado con `historialRevisiones`. |
| RF12 | Consultar requisitos por tipo de solicitud. | Solicitante | Implementado en Información sobre solicitudes. |
| RF13 | Consultar canales de contacto y ayuda. | Solicitante | Implementado en Contacto. |
| RF14 | Recuperar contraseña de forma prototipal. | Usuario público | Implementado con validaciones locales. |
| RF15 | Registrar cuenta de usuario de forma prototipal. | Usuario público | Implementado con validaciones locales. |



## 8. Requerimientos no funcionales considerados

| ID | Requerimiento no funcional | Aplicación en el prototipo |
|---|---|---|
| RNF01 | Usabilidad | Interfaz con menús, filtros, botones claros, etiquetas de estado y formularios simples. |
| RNF02 | Consistencia visual | Uso de encabezado común, contenedor de página, colores por rol y componentes Ionic. |
| RNF03 | Trazabilidad | Registro de última revisión, estado nuevo, funcionario responsable y comentarios. |
| RNF04 | Separación por roles | Rutas protegidas y menús diferenciados para solicitante y funcionario. |
| RNF05 | Mantenibilidad | Organización por carpetas `dominio`, `aplicacion`, `infraestructura`, `components`, `pages`, `routes` y `context`. |
| RNF06 | Rendimiento percibido | Datos locales simulados para navegación rápida durante el prototipo. |
| RNF07 | Escalabilidad futura | Estructura preparada para reemplazar `localStorage` por API REST y base de datos. |
| RNF08 | Legibilidad | Refactorización de pantallas grandes en componentes y casos de uso más pequeños. |



## 9. Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| Ionic Framework | Componentes visuales y estructura de aplicación web/móvil. |
| React | Construcción de interfaces mediante componentes. |
| TypeScript | Tipado de props, estados, entidades, casos de uso y rutas. |
| React Router | Definición de rutas públicas y protegidas. |
| IonReactRouter | Integración de Ionic con React Router. |
| localStorage | Persistencia simulada para solicitudes, rol y sesión en EP1. |
| Vite | Herramienta de desarrollo y construcción del frontend. |
| Node.js / npm | Gestión de dependencias y scripts del proyecto. |
| CSS inline / estilos Ionic | Ajustes visuales rápidos y consistencia con los mockups. |



## 10. Estructura actual del frontend

La estructura actual del frontend fue refactorizada para separar responsabilidades. La organización principal bajo `client/src` es la siguiente:

```txt
src/
├── App.tsx
├── main.tsx
├── aplicacion/
│   └── casosDeUso/
│       ├── actualizarEstadoSolicitud.ts
│       ├── crearSolicitud.ts
│       ├── editarSolicitud.ts
│       ├── eliminarSolicitud.ts
│       ├── filtrarHistorialFuncionario.ts
│       ├── filtrarSolicitudesFuncionario.ts
│       ├── obtenerRutaInicioPorRol.ts
│       └── prepararSolicitudNotificacion.ts
├── components/
│   ├── MenuCiudadano.tsx
│   ├── MenuFuncionario.tsx
│   ├── auth/
│   │   ├── CampoAuthConEtiqueta.tsx
│   │   ├── CampoRegistro.tsx
│   │   ├── CodigoVerificacion.tsx
│   │   ├── EncabezadoAuth.tsx
│   │   ├── FormularioCambiarPassword.tsx
│   │   ├── FormularioLogin.tsx
│   │   └── FormularioRegistro.tsx
│   ├── ciudadano/
│   │   ├── AvatarContactoFuncionario.tsx
│   │   ├── AvatarSolicitante.tsx
│   │   ├── CampoContactoFuncionario.tsx
│   │   ├── CampoDatoSolicitante.tsx
│   │   ├── DocumentosRequeridosTramite.tsx
│   │   ├── FilaDatoEmpresa.tsx
│   │   ├── ListaContactosFuncionarios.tsx
│   │   ├── ResumenInformacionTramite.tsx
│   │   ├── SelectorTipoTramite.tsx
│   │   ├── TarjetaContactoFuncionario.tsx
│   │   ├── TarjetaEmpresaSolicitante.tsx
│   │   └── TarjetaPerfilSolicitante.tsx
│   ├── common/
│   │   ├── BarraRol.tsx
│   │   ├── ColorEstado.tsx
│   │   ├── ContenedorPagina.tsx
│   │   ├── EncabezadoAplicacion.tsx
│   │   └── LogoMunicipal.tsx
│   ├── funcionario/
│   │   ├── AvatarFuncionario.tsx
│   │   ├── CampoDatoFuncionario.tsx
│   │   ├── FilaBandejaFuncionario.tsx
│   │   ├── FilaHistorialFuncionario.tsx
│   │   ├── FiltrosBandejaFuncionario.tsx
│   │   ├── FiltrosHistorialFuncionario.tsx
│   │   ├── TablaBandejaFuncionario.tsx
│   │   ├── TablaHistorialFuncionario.tsx
│   │   └── TarjetaPerfilFuncionario.tsx
│   ├── notificaciones/
│   │   ├── ItemNotificacion.tsx
│   │   └── ListaNotificacion.tsx
│   └── solicitudes/
│       ├── AccionesEnFomularioSolicitud.tsx
│       ├── ComentariosSolicitud.tsx
│       ├── DocumentacionSolicitud.tsx
│       ├── FilaSolicitud.tsx
│       ├── FiltrarSolicitudes.tsx
│       ├── FormularioCrearYEditarSolicitudes.tsx
│       ├── FormularioSolicitud.tsx
│       ├── ModalCambioDeEstado.tsx
│       ├── ModalEliminarSolicitud.tsx
│       ├── ModalSolicitudRechazada.tsx
│       ├── ResumenSolicitud.tsx
│       ├── RevisionSolicitud.tsx
│       └── TablaSolicitudes.tsx
├── context/
│   └── AuthContext.tsx
├── dominio/
│   ├── constantes/
│   │   ├── estadosSolicitud.ts
│   │   └── roles.ts
│   ├── entidades/
│   │   ├── ContactoFuncionario.ts
│   │   ├── Funcionario.ts
│   │   ├── HistorialRevision.ts
│   │   ├── InformacionTramite.ts
│   │   ├── Notificacion.ts
│   │   ├── Solicitante.ts
│   │   └── Solicitud.ts
│   └── reglas/
│       ├── formatearFecha.ts
│       ├── normalizarEstado.ts
│       ├── validarFormularioSolicitud.ts
│       ├── validarLogin.ts
│       ├── validarRecuperacionPassword.ts
│       └── validarRegistro.ts
├── infraestructura/
│   ├── almacenamiento/
│   │   ├── clavesAlmacenamiento.ts
│   │   └── repositorioLocalSolicitudes.ts
│   └── simulacionDatos/
│       ├── contactosFuncionariosSimulados.ts
│       ├── funcionariosSimulados.ts
│       ├── informacionTramitesSimulados.ts
│       ├── notificacionesSimuladas.ts
│       ├── solicitantesSimulados.ts
│       └── solicitudesSimuladas.ts
├── pages/
│   ├── auth/
│   │   ├── CambiarPassword.tsx
│   │   ├── LoginPage.tsx
│   │   └── RegisterPage.tsx
│   ├── ciudadano/
│   │   ├── ContactoCiudadano.tsx
│   │   ├── DashboardCiudadano.tsx
│   │   ├── DetalleSolicitud.tsx
│   │   ├── InfoSolicitudes.tsx
│   │   ├── NotificacionesCiudadano.tsx
│   │   ├── RealizarSolicitud.tsx
│   │   └── SolicitudesRealizadas.tsx
│   └── funcionario/
│       ├── BandejaFuncionario.tsx
│       ├── DashboardFuncionario.tsx
│       ├── HistorialFuncionario.tsx
│       ├── NotificacionesFuncionario.tsx
│       └── RevisarSolicitudFuncionario.tsx
├── routes/
│   ├── AppRouter.tsx
│   └── ProtectedRoute.tsx
├── services/
│   ├── authService.ts
│   └── solicitudesService.ts
└── theme/
    └── variables.css
```



## 11. Arquitectura frontend actual

La aplicación está organizada con una arquitectura frontend simple, pero más ordenada que una estructura basada solo en páginas. La separación actual permite que las vistas principales sean más pequeñas y que la lógica repetida esté centralizada.

### 11.1 Capas principales

| Capa | Responsabilidad |
|---|---|
| `pages` | Contienen las vistas principales del sistema y coordinan navegación, estado local y componentes. |
| `components` | Contienen elementos reutilizables de interfaz: encabezados, formularios, tablas, tarjetas, modales y menús. |
| `dominio/entidades` | Define las interfaces principales del sistema. |
| `dominio/reglas` | Contiene validaciones, normalización de estados y formateo de fechas. |
| `dominio/constantes` | Define roles y estados permitidos. |
| `aplicacion/casosDeUso` | Agrupa operaciones del sistema como crear, editar, eliminar, filtrar y actualizar solicitudes. |
| `infraestructura/almacenamiento` | Encapsula el acceso a `localStorage`. |
| `infraestructura/simulacionDatos` | Contiene los datos simulados usados en EP1. |
| `routes` | Centraliza rutas públicas, rutas protegidas y redirecciones por rol. |
| `context` | Maneja sesión y rol actual mediante `AuthContext`. |

### 11.2 Decisión de uso de `localStorage`

Para EP1 se utiliza `localStorage` como mecanismo de persistencia temporal. Esta decisión permite demostrar flujos completos sin depender todavía de backend.

Actualmente se usa para:

- Guardar el rol actual (`rol_actual`).
- Simular sesión iniciada.
- Guardar solicitudes creadas o modificadas.
- Actualizar estados.
- Registrar comentarios del funcionario.
- Mantener historial de revisiones.
- Conservar datos durante la navegación y recarga del navegador.

Las claves de almacenamiento están centralizadas en:

```txt
src/infraestructura/almacenamiento/clavesAlmacenamiento.ts
```

La clave principal para solicitudes es:

```txt
solicitudes_db
```



## 12. Modelo de datos simulado

### 12.1 Solicitud

Las solicitudes se trabajan mediante la entidad `Solicitud`:

```ts
interface Solicitud {
  id: number;
  titulo: string;
  encargado: string;
  fecha: string;
  estado: string;
  tipo?: string;
  cliente?: string;
  descripcion?: string;
  descripcionAgregada?: string;
  comentariosFuncionario?: string;
  ultimaRevision?: string;
  historialRevisiones?: HistorialRevision[];
}
```

### 12.2 Historial de revisión

```ts
interface HistorialRevision {
  funcionario: string;
  estadoNuevo: string;
  fechaRevision: string;
}
```

### 12.3 Estados utilizados

Los estados se centralizan en `dominio/constantes/estadosSolicitud.ts`.

| Estado | Significado | Color visual |
|---|---|---|
| Recibido | Solicitud ingresada y recibida por el sistema. | Gris |
| En revisión | Solicitud en proceso de análisis municipal. | Celeste |
| Pendiente | Solicitud requiere atención o documentación adicional. | Amarillo |
| Aprobada | Solicitud aceptada o aprobada. | Verde |
| Rechazada | Solicitud rechazada por el funcionario. | Rojo |
| Anulada | Solicitud anulada durante el proceso. | Rojo |

La visualización se realiza con el componente:

```txt
src/components/common/ColorEstado.tsx
```



## 13. Rutas principales

### 13.1 Rutas públicas

| Ruta | Pantalla | Propósito |
|---|---|---|
| `/login` | LoginPage | Ingreso al sistema y selección de rol. |
| `/registro` | RegisterPage | Creación de cuenta prototipal. |
| `/recuperar` | CambiarPassword | Recuperación o cambio de contraseña prototipal. |
| `/` | Redirect | Redirige a `/login`. |

### 13.2 Rutas protegidas del solicitante

| Ruta | Pantalla | Propósito |
|---|---|---|
| `/ciudadano/tramites` | DashboardCiudadano | Perfil, datos personales y datos de empresa del solicitante. |
| `/ciudadano/nueva-solicitud` | RealizarSolicitud | Crear una nueva solicitud. |
| `/ciudadano/historial` | SolicitudesRealizadas | Ver historial, filtrar, editar, eliminar y abrir detalle de solicitudes. |
| `/ciudadano/solicitud/:id` | DetalleSolicitud | Ver detalle, comentarios e historial de revisión. |
| `/ciudadano/editar-solicitud/:id` | RealizarSolicitud | Complementar una solicitud existente. |
| `/ciudadano/notificaciones` | NotificacionesCiudadano | Ver cambios relevantes de solicitudes. |
| `/ciudadano/contacto` | ContactoCiudadano | Consultar contactos de funcionarios. |
| `/ciudadano/informacion-solicitudes` | InfoSolicitudes | Revisar requisitos por tipo de solicitud. |

### 13.3 Rutas protegidas del funcionario

| Ruta | Pantalla | Propósito |
|---|---|---|
| `/funcionario/tramites` | DashboardFuncionario | Perfil y datos generales del funcionario. |
| `/funcionario/bandeja` | BandejaFuncionario | Ver solicitudes disponibles para revisión. |
| `/funcionario/historial` | HistorialFuncionario | Consultar solicitudes desde vista de gestión. |
| `/funcionario/solicitud/:id` | RevisarSolicitudFuncionario | Revisar, comentar, rechazar y actualizar una solicitud. |
| `/funcionario/notificaciones` | NotificacionesFuncionario | Revisar notificaciones asociadas al rol funcionario. |



## 14. Menús laterales

La aplicación utiliza `IonMenu` con `contentId="main-content"` y `menuId="menu-lateral"`. El menú mostrado depende del rol actual.

### 14.1 Menú del solicitante

Secciones principales:

- Mi cuenta
  - Perfil
- Gestor de solicitudes
  - Realizar nueva solicitud
  - Solicitudes realizadas
- Centro de Comunicación
  - Bandeja de notificaciones
  - Contacto y ayuda
  - Información sobre solicitudes

### 14.2 Menú del funcionario

Secciones principales:

- Mi cuenta
  - Perfil
  - Datos funcionario
- Gestor de solicitudes
  - Historial y gestor de solicitudes
- Centro de Comunicación
  - Bandeja de notificaciones
  - Contacto con solicitantes

Algunas opciones del menú funcionario se mantienen como elementos visuales de prototipo cuando aún no tienen una ruta propia asociada.



## 15. Casos de uso principales

### CU01 - Iniciar sesión

**Actor:** Solicitante o Funcionario Municipal.  
**Objetivo:** Acceder a las funcionalidades del sistema según rol.

**Flujo principal:**

1. El usuario ingresa a `/login`.
2. Ingresa correo y contraseña.
3. Selecciona tipo de usuario.
4. El sistema valida campos obligatorios.
5. El sistema guarda el rol mediante `AuthContext`.
6. El sistema redirige al panel correspondiente.

**Resultado esperado:** El usuario accede a las rutas propias de su rol.



### CU02 - Crear una nueva solicitud

**Actor:** Solicitante.  
**Objetivo:** Registrar una solicitud municipal.

**Flujo principal:**

1. El solicitante ingresa a "Realizar nueva solicitud".
2. Selecciona tipo de solicitud.
3. Ingresa título y descripción.
4. Revisa la advertencia sobre documentación.
5. Envía la solicitud.
6. El sistema valida el formulario.
7. El sistema crea la solicitud mediante `crearSolicitud.ts`.
8. El sistema guarda la solicitud en `localStorage`.
9. El sistema redirige al historial.

**Resultado esperado:** La solicitud aparece en el historial con estado inicial "Pendiente".



### CU03 - Consultar historial de solicitudes como solicitante

**Actor:** Solicitante.  
**Objetivo:** Revisar solicitudes ya ingresadas.

**Flujo principal:**

1. El solicitante ingresa a "Solicitudes realizadas".
2. Visualiza tabla con ID, tipo, título, encargado, fecha, estado y acciones.
3. Puede filtrar solicitudes.
4. Puede entrar al detalle.
5. Puede editar/complementar una solicitud.
6. Puede eliminar una solicitud mediante modal de confirmación.

**Resultado esperado:** El usuario puede dar seguimiento y gestionar sus solicitudes desde una tabla clara.



### CU04 - Revisar detalle de una solicitud

**Actor:** Solicitante.  
**Objetivo:** Conocer el estado y las observaciones de una solicitud.

**Flujo principal:**

1. El solicitante presiona el botón de detalle.
2. El sistema abre `/ciudadano/solicitud/:id`.
3. Se muestra estado actual, encargado y última revisión.
4. Se muestran comentarios del funcionario.
5. El usuario puede revisar el historial de revisión.

**Resultado esperado:** El solicitante entiende qué ocurrió con su trámite y qué observaciones existen.



### CU05 - Revisar solicitud como funcionario

**Actor:** Funcionario Municipal.  
**Objetivo:** Evaluar una solicitud y registrar una decisión.

**Flujo principal:**

1. El funcionario accede a la bandeja o historial.
2. Selecciona una solicitud.
3. Revisa tipo, título, descripción y documentación simulada.
4. Escribe un comentario si corresponde.
5. Presiona "Actualizar solicitud" o "Rechazar solicitud".
6. Selecciona el nuevo estado o confirma el rechazo.
7. El sistema guarda estado, comentario, fecha y funcionario responsable.
8. El sistema actualiza el historial de revisión.

**Resultado esperado:** La solicitud queda actualizada y el solicitante puede ver el cambio desde su detalle.



### CU06 - Consultar notificaciones

**Actor:** Solicitante o Funcionario Municipal.  
**Objetivo:** Ver eventos importantes sobre solicitudes.

**Flujo solicitante:**

1. El solicitante ingresa a notificaciones.
2. Visualiza una lista de cambios relevantes.
3. Presiona el botón de detalle de una notificación.
4. El sistema prepara la solicitud asociada si es necesario.
5. El sistema abre el detalle de la solicitud asociada.

**Flujo funcionario:**

1. El funcionario ingresa a notificaciones.
2. Visualiza solicitudes nuevas o pendientes de atención.
3. Puede abrir la solicitud asociada para revisarla.

**Resultado esperado:** El usuario accede directamente al detalle del cambio informado.



### CU07 - Consultar requisitos de una solicitud

**Actor:** Solicitante.  
**Objetivo:** Conocer documentación requerida antes de ingresar una solicitud.

**Flujo principal:**

1. El usuario ingresa a "Información sobre solicitudes".
2. Selecciona tipo de trámite.
3. El sistema muestra documentos requeridos, área responsable y tiempo estimado.

**Resultado esperado:** El solicitante cuenta con información previa para evitar errores o rechazos.



### CU08 - Contactar o consultar ayuda

**Actor:** Solicitante.  
**Objetivo:** Consultar información de contacto de funcionarios.

**Flujo principal:**

1. El solicitante ingresa a "Contacto y ayuda".
2. Visualiza una lista de funcionarios simulados.
3. Revisa nombre, teléfono y correo institucional.

**Resultado esperado:** El solicitante cuenta con canales de contacto visibles dentro del prototipo.



## 16. Task flows principales

### 16.1 Task Flow - Crear y consultar solicitud

```txt
Login solicitante
↓
Perfil solicitante
↓
Realizar nueva solicitud
↓
Completar tipo, título y descripción
↓
Enviar solicitud
↓
Historial de solicitudes
↓
Ver detalle de solicitud
```

### 16.2 Task Flow - Revisión por funcionario

```txt
Login funcionario
↓
Perfil funcionario
↓
Bandeja o historial de solicitudes
↓
Abrir solicitud
↓
Revisar antecedentes
↓
Comentar solicitud
↓
Actualizar estado o rechazar
↓
Guardar historial de revisión
↓
Volver a bandeja
```

### 16.3 Task Flow - Notificación y trazabilidad

```txt
Solicitante revisa notificaciones
↓
Presiona botón de detalle
↓
Sistema abre solicitud asociada
↓
Solicitante ve estado actualizado
↓
Solicitante revisa comentario del funcionario
↓
Solicitante consulta historial de revisión
```

### 16.4 Task Flow - Cambio de rol prototipal

```txt
Usuario presiona indicador de rol en encabezado
↓
AuthContext actualiza rol_actual
↓
AppRouter actualiza menú lateral
↓
Sistema redirige a la vista principal del nuevo rol
```



## 17. Decisiones de diseño

### 17.1 Colores por rol

- Azul principal para encabezado general del sistema.
- Amarillo para rol solicitante.
- Rojo para rol funcionario municipal.

Esta diferenciación permite reconocer rápidamente el contexto de navegación.

### 17.2 Etiquetas de estado

Los estados se representan mediante badges de color para facilitar lectura rápida:

- Gris: recibido.
- Celeste: en revisión.
- Amarillo: pendiente u observado.
- Verde: aprobada.
- Rojo: rechazada o anulada.

### 17.3 Separación por rol

Se utilizan menús laterales distintos para solicitante y funcionario. Esto reduce ruido visual y evita mostrar opciones que no corresponden al usuario actual.

### 17.4 Encabezado común

Las páginas internas reutilizan `EncabezadoAplicacion`, que centraliza:

- Botón de menú lateral.
- Logo prototipal.
- Título del sistema.
- Acceso a notificaciones.
- Acceso a perfil.
- Indicador y cambio manual de rol.

### 17.5 Formularios de autenticación modularizados

Las pantallas de login, registro y recuperación de contraseña se separaron en formularios reutilizables y reglas de validación. Esto evita que las páginas de autenticación concentren toda la lógica visual y de validación.

### 17.6 Prototipado con datos locales

El uso de `localStorage` permite demostrar continuidad entre pantallas sin backend. Se considera una decisión válida para EP1, ya que el foco está en frontend, navegación y experiencia de usuario.

### 17.7 Identificadores prototipales

Para esta entrega, los ID de solicitudes se mantienen con generación prototipal. En una versión madura, estos identificadores deben ser generados por backend o base de datos para garantizar unicidad.



## 18. Relación con mockups

Las pantallas implementadas se basan en los mockups diseñados para el proyecto. La implementación busca mantener:

- Estructura general de encabezado.
- Menú lateral por rol.
- Formularios de login, registro, recuperación y solicitudes.
- Tablas de historial.
- Badges de estado.
- Botones de acción.
- Vista de detalle de solicitud.
- Notificaciones y acceso a detalle.
- Información sobre requisitos.
- Contacto y ayuda.
- Perfil de solicitante y funcionario.

Algunas diferencias se mantienen por decisiones de prototipo:

- Uso de datos simulados en lugar de datos reales.
- Subida de documentación representada visualmente, sin carga real de archivos.
- Cambio manual de rol como apoyo de demostración.
- Generación de ID prototipal.
- Algunas opciones visuales del menú funcionario todavía no tienen pantalla propia.



## 19. Instalación y ejecución

### Requisitos previos

- Node.js instalado.
- npm instalado.
- Git instalado.
- PostgreSQL instalado y corriendo.

### Clonar repositorio

```bash
git clone [https://github.com/IgnacioGameolay/municipal-request-tracker.git](https://github.com/IgnacioGameolay/municipal-request-tracker.git)
cd municipal-request-tracker
```

### Instalar y configurar el Backend (AGREGADO)

Para levantar la API y la base de datos real:

1. Abre una nueva terminal y entra a la carpeta del servidor:
```bash
   cd server
   ```
2. Instala las dependencias:
```bash
   npm install
   ```
3. **Variables de entorno:** Crea un archivo `.env` en la raíz de la carpeta `server` guiándote por `.env.example`. Configura de forma obligatoria tu `DATABASE_URL` y tu `JWT_SECRET`.
4. Ejecuta las migraciones de Prisma para construir las tablas en PostgreSQL:
```bash
   npx prisma migrate dev
   ```
5. Levanta el servidor en modo desarrollo:
```bash
   npm run dev
   ```
*(El backend quedará corriendo en `http://localhost:3000`)*

### Instalar dependencias del frontend

En una nueva terminal, vuelve a la raíz del proyecto e ingresa al cliente:

```bash
cd client
npm install
```

Si Cypress genera problemas durante la instalación, se puede instalar sin descargar el binario:

```bash
CYPRESS_INSTALL_BINARY=0 npm install
```

En PowerShell:

```powershell
$env:CYPRESS_INSTALL_BINARY=0; npm install
```

### Ejecutar en modo desarrollo

Para el frontend:

```bash
npm run dev
```

Luego abrir la URL local indicada por Vite, por ejemplo:

```txt
http://localhost:5173
```

### Compilar para producción

```bash
npm run build
```

### Formatear código con Prettier

Si Prettier está instalado:

```bash
npx prettier --write "src/**/*.{ts,tsx,css,json,md}"
```



## 20. [MODIFICADO] Uso del sistema para demostración

### 20.1 Flujo solicitante recomendado

1. Abrir la aplicación (asegurándose de tener el backend y PostgreSQL corriendo).
2. Iniciar sesión como Solicitante.
3. Revisar perfil y datos de empresa.
4. Ir a "Realizar nueva solicitud".
5. Crear una solicitud y adjuntar un documento real (el backend ahora procesará y guardará el archivo).
6. Verla en "Solicitudes realizadas".
7. Entrar al detalle.
8. Editar/complementar una solicitud.
9. Revisar notificaciones.
10. Abrir una notificación con el botón de detalle.
11. Consultar "Información sobre solicitudes".
12. Consultar "Contacto y ayuda".
13. Cambiar a rol funcionario desde el encabezado.

### 20.2 Flujo funcionario recomendado

1. Iniciar sesión como Funcionario Municipal.
2. Revisar perfil funcionario.
3. Ingresar a bandeja o historial de solicitudes.
4. Abrir una solicitud (aquí podrás ver o descargar los documentos adjuntos reales).
5. Escribir comentario.
6. Actualizar estado o rechazar solicitud.
7. Confirmar cambio (la trazabilidad quedará guardada de forma persistente en la base de datos).
8. Volver a bandeja.
9. Verificar que la solicitud quedó actualizada.
10. Cambiar a solicitante para revisar cómo se visualiza el cambio.

## 21. Verificación en POSTMAN

Esta sección detalla cómo validar el funcionamiento del backend utilizando la colección exportada.

### 21.1 Preparación del Entorno
Antes de ejecutar las pruebas, asegúrate de que el servidor esté activo:
1. Navega a la carpeta `server/`.
2. Ejecuta `npm run dev` para levantar el backend en `http://localhost:3000`.

### 21.2 Configuración en Postman
Para ejecutar la colección `API Proyecto Web y Movil`, realiza estos pasos:

1. **Importar Colección:** En Postman, ejecuta el comando "Ctrl" + "O" (o haz clic en el botón *Import*). Arrastra directamente la carpeta completa `postman/collections/API Proyecto Web y Movil` hacia la ventana, o usa la opción de seleccionar carpeta (Folder). Postman leerá automáticamente toda la estructura de archivos `.yaml`.
2. **Importar Entorno:** En la misma ventana de importación, selecciona o arrastra el archivo `postman/environments/Local - Proyecto Web y Movil.environment.yaml`.
3. **Selección:** Asegúrate de seleccionar el entorno "Local" en el menú desplegable superior derecho de Postman.

### 21.3 Flujo de pruebas recomendado (Orden de ejecución)

Para demostrar que el backend es seguro y funcional, sigue este orden:

1. **Autenticación (Gestión de Token):**
   - Ejecuta `POST Iniciar Sesión`.
   - Nota: Si el token expira, simplemente vuelve a ejecutar esta petición.
   - Instrucciones para actualizar: 
     1. Copia el valor del token desde la respuesta (asegúrate de **NO** incluir las comillas `' '` ni caracteres extra).
     2. Ve a la pestaña **Environments** (parte superior derecha).
     3. Selecciona tu entorno `Local - Proyecto Web y Movil`.
     4. Pega el nuevo Token en el campo `Current Value` de la variable `token`.
     5. Haz clic en Save.
     6. *Nota: El procedimiento es el mismo cuando se requiere actualizar la variable de id de solicitud y de documento.*
     
2. **Solicitudes:**
   - Ejecuta `POST Crear Solicitud` (Asegúrate de tener un archivo cargado en el body de tipo `form-data`).
   - Ejecuta `GET Listar Solicitudes` para verificar que la creación fue persistida.
   - Ejecuta `GET Obtener Solicitud por ID` usando el ID generado en el paso anterior.
   
3. **Documentos:**
   - Ejecuta `POST Subir un documento` para probar el manejo de archivos (Multer).
   - Ejecuta `GET Ver Documentos Adjuntos` para confirmar la relación entre solicitud y archivo.


## 22. Comandos útiles

```bash
# Instalar dependencias
cd client
npm install

# Ejecutar proyecto
npm run dev

# Compilar proyecto
npm run build

# Formatear frontend
npx prettier --write "src/**/*.{ts,tsx,css,json,md}"
```



## 23. [MODIFICADO] Limpieza de datos locales y Base de Datos

Para limpiar la base de datos real en etapa de pruebas, puedes abrir la consola en la carpeta del servidor y ejecutar:

```bash
npx prisma migrate reset
```

El prototipo frontend aún puede usar `localStorage` para almacenar la sesión activa (como el token JWT). Si se desea reiniciar la sesión local o las solicitudes cacheadas durante pruebas, abrir la consola del navegador y ejecutar:

```js
localStorage.removeItem('solicitudes_db');
localStorage.removeItem('token');
localStorage.clear();
location.href = '/login';
```



## 24. [MODIFICADO] Limitaciones actuales

- Las notificaciones son simuladas en el frontend (aún no usan WebSockets para tiempo real).
- El envío de correos electrónicos para recuperar contraseñas no utiliza un servidor SMTP real todavía.
- La generación de algunos ID visuales en el frontend podría seguir un formato prototipal temporal.
- El cambio manual de rol se mantiene como recurso rápido de demostración.
- Algunas opciones visuales del menú funcionario todavía no tienen ruta propia.

Estas limitaciones son coherentes con el estado actual del proyecto, habiendo superado exitosamente la fase inicial al integrar un backend funcional, autenticación real y manejo de archivos.



## 25. [MODIFICADO] Proyección para próximas entregas

Habiendo implementado exitosamente la API REST, la base de datos relacional, la autenticación JWT y la subida real de documentos, para una versión posterior del sistema se propone:

- Implementar notificaciones push en tiempo real (ej. WebSockets / Socket.io).
- Enviar correos reales para recuperación de contraseña integrando un servicio como NodeMailer.
- Mejorar permisos por rol desde backend (ej. gestión multisucursal o multi-departamento).
- Agregar auditoría avanzada de acciones en la base de datos.
- Centralizar y robustecer los servicios HTTP en el frontend para la comunicación con el backend.
- Corregir elementos visuales del menú que aún no tienen pantalla propia.



## 26. [MODIFICADO] Cumplimiento de pauta EP1 y Siguientes

| Criterio esperado | Evidencia en el proyecto |
|---|---|
| Uso de Ionic + React + TypeScript | Proyecto frontend en `client` construido con Ionic React y TypeScript. |
| Rutas públicas | Login, registro y recuperación. |
| Rutas protegidas | `ProtectedRoute` para solicitante y funcionario (ahora con validación JWT). |
| Dos roles diferenciados | Solicitante y Funcionario Municipal (validados en BD). |
| Mínimo de pantallas implementadas | Se implementan más de cuatro pantallas funcionales. |
| Persistencia de datos (AGREGADO) | Uso de PostgreSQL y Prisma ORM para solicitudes, usuarios y revisiones. |
| Gestión de Archivos (AGREGADO) | Endpoints con Multer operativos en el backend para subida y descarga de expedientes. |
| Componentes Ionic | Uso de `IonPage`, `IonHeader`, `IonToolbar`, `IonContent`, `IonMenu`, `IonButton`, `IonInput`, `IonSelect`, `IonModal`, entre otros. |
| Organización modular | Carpetas `dominio`, `aplicacion`, `infraestructura`, `components`, `pages`, `routes` y `context`. |
| Mockups asociados | Pantallas implementadas de acuerdo con el diseño del prototipo. |
| Arquitectura de navegación | Rutas centralizadas en `src/routes/AppRouter.tsx` y protección en `ProtectedRoute.tsx`. |
| Documentación API (AGREGADO) | Colección de Postman exportada con flujos probados. |
| Funcionalidades más allá de login/registro | Solicitudes, historial, revisión, notificaciones, contacto e información. |
| Separación de responsabilidades | Casos de uso, reglas, entidades, simulación de datos y repositorio local separados. |
| Uso de repositorio | Proyecto estructurado para entrega mediante GitHub. |



## 27. Autores

Proyecto desarrollado para la asignatura **ICI4247/1 - Ingeniería Web y Móvil**.

Integrantes:

- Sebastián Andrés de Jesús García Valdebenito
- Francisca Antonia Guzmán Pérez
- Vicente Nills Quezada Gallardo
- Ignacio Antonio Reyes Toledo



## 28. [MODIFICADO] Estado actual

El proyecto ha evolucionado de un prototipo frontend a una aplicación Full-Stack funcional. La aplicación permite demostrar los flujos principales de navegación, gestión de solicitudes, revisión por funcionario, visualización de trazabilidad por parte del solicitante, subida real de documentos y separación de roles mediante rutas protegidas conectadas a un backend real en Node.js y PostgreSQL.

La versión actual mantiene la refactorización importante del frontend (separando páginas grandes en componentes reutilizables, casos de uso, reglas de dominio y entidades) y suma la capa de infraestructura del servidor para garantizar la persistencia y seguridad definitiva de los datos.