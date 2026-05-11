# Municipal Request Tracker - Gestor de Solicitudes Municipales

Aplicación web desarrollada con **Ionic + React + TypeScript** para el seguimiento, revisión y comunicación de solicitudes municipales entre solicitantes y funcionarios. El proyecto corresponde a la Entrega Parcial 1 de Ingeniería Web y Móvil, centrada en frontend, navegación, prototipado funcional, roles, experiencia de usuario y estructura inicial del sistema.

---

## 1. Descripción general del proyecto

Municipal Request Tracker es un prototipo funcional de una plataforma de gestión de solicitudes municipales. Su propósito es mejorar la comunicación entre los municipios y las personas solicitantes durante el proceso de revisión de trámites, especialmente cuando una solicitud requiere correcciones, documentación adicional, aclaraciones o cuando es rechazada/anulada.

El sistema permite que una persona solicitante cree solicitudes, consulte su historial, revise el estado de sus trámites, acceda a observaciones realizadas por funcionarios y vea canales de contacto oficiales. Por otra parte, permite que un funcionario municipal revise solicitudes, actualice estados, registre comentarios y deje trazabilidad de las revisiones realizadas.

El proyecto se diseñó tomando como referencia una problemática real frecuente en servicios municipales: la falta de información clara y oportuna sobre el avance de trámites, documentación faltante y razones de rechazo.

---

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

---

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
- Implementar una arquitectura de rutas clara con React Router.
- Separar la lógica del sistema en componentes, reglas, casos de uso y datos simulados.
- Usar componentes Ionic para construir una interfaz coherente con la pauta del curso.

---

## 4. Alcance de la Entrega Parcial 1

Esta entrega se enfoca en el desarrollo frontend del sistema. No corresponde aún a una implementación completa con backend persistente ni base de datos real. Para simular persistencia durante la navegación, se utiliza `localStorage` del navegador.

### Incluido en EP1

- Proyecto Ionic React con TypeScript.
- Rutas públicas y protegidas.
- Separación de roles: Solicitante y Funcionario Municipal.
- Menú lateral diferenciado por rol.
- Encabezado común reutilizable.
- Formularios de login, registro y recuperación de contraseña.
- Validaciones básicas de formularios.
- Creación, edición, listado, eliminación y detalle de solicitudes.
- Bandeja e historial para funcionario.
- Actualización de estado por parte del funcionario.
- Comentarios de revisión.
- Historial de revisiones.
- Notificaciones simuladas para solicitante y funcionario.
- Consulta de información sobre requisitos de solicitudes.
- Canales de contacto y ayuda.
- Datos simulados organizados fuera de las páginas.
- Repositorio local para solicitudes basado en `localStorage`.
- Documentación de arquitectura de navegación.

### No incluido en EP1

- Backend definitivo.
- Base de datos relacional real.
- Autenticación real con JWT.
- Subida real de archivos al servidor.
- Gestión avanzada de permisos.
- Integración con servicios municipales reales.
- Notificaciones push reales.

Estas características se consideran parte de una evolución futura del sistema, especialmente para etapas posteriores del proyecto.

---

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

### 5.2 Funcionario Municipal

Persona encargada de revisar solicitudes ingresadas al sistema, actualizar estados y registrar observaciones. Necesita una vista organizada que le permita gestionar múltiples solicitudes de forma eficiente.

Necesidades principales:

- Consultar solicitudes asignadas o disponibles para revisión.
- Filtrar solicitudes por estado, fecha, título o identificador.
- Revisar detalle de una solicitud.
- Registrar comentarios u observaciones.
- Cambiar el estado de una solicitud.
- Dejar trazabilidad de la revisión realizada.
- Consultar historial de solicitudes revisadas.

---

## 6. Roles del sistema

El sistema considera dos roles principales.

| Rol | Descripción | Acceso principal |
|---|---|---|
| Solicitante | Usuario que crea y consulta solicitudes municipales. | Perfil, nueva solicitud, historial, detalle, notificaciones, contacto e información de solicitudes. |
| Funcionario Municipal | Usuario que revisa solicitudes y actualiza estados. | Perfil funcionario, bandeja, historial, revisión de solicitud y notificaciones. |

En esta entrega, el control de sesión y rol se simula mediante `AuthContext` y `localStorage`. El rol interno se maneja únicamente con los valores:

```txt
solicitante
funcionario
```

El valor `ciudadano` se conserva solo como parte del nombre de algunas rutas (`/ciudadano/...`), pero no como rol interno del sistema.

Además, se mantiene un cambio manual de rol desde el encabezado como apoyo prototipal para la demostración y validación rápida del flujo entre solicitante y funcionario. En una versión productiva, este mecanismo sería reemplazado por autenticación real y control de permisos desde backend.

---

## 7. Requerimientos funcionales considerados

| ID | Requerimiento funcional | Rol principal | Estado en prototipo |
|---|---|---|---|
| RF01 | Registrar y consultar solicitudes municipales. | Solicitante | Implementado en frontend. |
| RF02 | Visualizar estado actual de una solicitud. | Solicitante / Funcionario | Implementado con etiquetas de estado. |
| RF03 | Crear una nueva solicitud. | Solicitante | Implementado con formulario y validaciones. |
| RF04 | Editar o complementar información de una solicitud. | Solicitante | Implementado mediante vista de edición. |
| RF05 | Consultar historial de solicitudes realizadas. | Solicitante | Implementado con tabla y filtros. |
| RF06 | Eliminar solicitudes desde el historial del solicitante. | Solicitante | Implementado con modal de confirmación. |
| RF07 | Recibir notificaciones sobre cambios de estado. | Solicitante | Implementado con datos simulados. |
| RF08 | Visualizar comentarios u observaciones del funcionario. | Solicitante | Implementado en detalle de solicitud. |
| RF09 | Revisar solicitudes ingresadas. | Funcionario | Implementado en bandeja/historial. |
| RF10 | Actualizar estado de una solicitud. | Funcionario | Implementado con modal de cambio de estado. |
| RF11 | Registrar historial de revisión. | Funcionario / Solicitante | Implementado con `historialRevisiones`. |
| RF12 | Consultar requisitos por tipo de solicitud. | Solicitante | Implementado en Información sobre solicitudes. |
| RF13 | Consultar canales de contacto y ayuda. | Solicitante | Implementado en Contacto y ayuda. |
| RF14 | Recuperar o cambiar contraseña de forma prototipal. | Usuario público | Implementado con formulario y validaciones. |

---

## 8. Requerimientos no funcionales considerados

| ID | Requerimiento no funcional | Aplicación en el prototipo |
|---|---|---|
| RNF01 | Usabilidad | Interfaz con menús, filtros, botones claros, etiquetas de estado y formularios simples. |
| RNF02 | Consistencia visual | Uso de encabezado común, colores por rol y componentes Ionic. |
| RNF03 | Trazabilidad | Registro de última revisión, estado nuevo, funcionario responsable y comentarios. |
| RNF04 | Separación por roles | Rutas protegidas y menús diferenciados para solicitante y funcionario. |
| RNF05 | Mantenibilidad | Organización por carpetas `components`, `pages`, `routes`, `context`, `dominio`, `aplicacion` e `infraestructura`. |
| RNF06 | Rendimiento percibido | Datos locales simulados para navegación rápida durante el prototipo. |
| RNF07 | Escalabilidad futura | Estructura preparada para reemplazar `localStorage` por API REST y base de datos. |
| RNF08 | Modularidad | Páginas principales separadas en componentes reutilizables y casos de uso. |

---

## 9. Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| Ionic Framework | Componentes visuales y estructura de aplicación web/móvil. |
| React | Construcción de interfaces mediante componentes. |
| TypeScript | Tipado de props, estados, interfaces y rutas. |
| React Router | Definición de rutas públicas y protegidas. |
| IonReactRouter | Integración de Ionic con React Router. |
| localStorage | Persistencia simulada para solicitudes, rol y sesión en EP1. |
| CSS inline / estilos Ionic | Ajustes visuales rápidos y consistencia con mockups. |
| Vite | Herramienta de desarrollo y construcción del frontend. |
| Node.js / npm | Gestión de dependencias y scripts del proyecto. |

---

## 10. Estructura actual del proyecto

```txt
municipal-request-tracker/
├── README.md
├── client/
│   ├── package.json
│   ├── ionic.config.json
│   ├── capacitor.config.ts
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── aplicacion/
│   │   │   └── casosDeUso/
│   │   │       ├── actualizarEstadoSolicitud.ts
│   │   │       ├── crearSolicitud.ts
│   │   │       ├── editarSolicitud.ts
│   │   │       ├── eliminarSolicitud.ts
│   │   │       ├── filtrarHistorialFuncionario.ts
│   │   │       ├── filtrarSolicitudesFuncionario.ts
│   │   │       ├── obtenerRutaInicioPorRol.ts
│   │   │       └── prepararSolicitudDesdeNotificacion.ts
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── ciudadano/
│   │   │   ├── common/
│   │   │   ├── funcionario/
│   │   │   ├── notificaciones/
│   │   │   ├── solicitudes/
│   │   │   ├── MenuCiudadano.tsx
│   │   │   └── MenuFuncionario.tsx
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── dominio/
│   │   │   ├── constantes/
│   │   │   ├── entidades/
│   │   │   └── reglas/
│   │   ├── infraestructura/
│   │   │   ├── almacenamiento/
│   │   │   │   └── repositorioLocalSolicitudes.ts
│   │   │   └── datosSimulados/
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   ├── RegisterPage.tsx
│   │   │   │   └── CambiarPassword.tsx
│   │   │   ├── ciudadano/
│   │   │   │   ├── DashboardCiudadano.tsx
│   │   │   │   ├── RealizarSolicitud.tsx
│   │   │   │   ├── SolicitudesRealizadas.tsx
│   │   │   │   ├── DetalleSolicitud.tsx
│   │   │   │   ├── NotificacionesCiudadano.tsx
│   │   │   │   ├── ContactoCiudadano.tsx
│   │   │   │   └── InfoSolicitudes.tsx
│   │   │   └── funcionario/
│   │   │       ├── DashboardFuncionario.tsx
│   │   │       ├── BandejaFuncionario.tsx
│   │   │       ├── HistorialFuncionario.tsx
│   │   │       ├── RevisarSolicitudFuncionario.tsx
│   │   │       └── NotificacionesFuncionario.tsx
│   │   ├── routes/
│   │   │   ├── AppRouter.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   └── theme/
│   │       └── variables.css
└── server/
    └── src/
```

---

## 11. Arquitectura frontend

La aplicación está organizada con una arquitectura frontend por capas simples. No se implementa una Clean Architecture estricta, pero sí una separación clara entre vista, componentes, reglas, casos de uso y persistencia simulada.

### 11.1 Capas principales

| Capa | Responsabilidad |
|---|---|
| `pages` | Contienen las vistas principales y coordinan navegación, estado local y componentes. |
| `components` | Contienen piezas reutilizables de interfaz: encabezado, formularios, tablas, tarjetas, modales y menús. |
| `dominio/entidades` | Define interfaces principales como `Solicitud`, `Notificacion`, `Solicitante`, `Funcionario` e información de contacto. |
| `dominio/reglas` | Contiene reglas de validación, normalización de estados y formato de fechas. |
| `aplicacion/casosDeUso` | Agrupa acciones del sistema como crear, editar, eliminar, filtrar o actualizar solicitudes. |
| `infraestructura/almacenamiento` | Centraliza acceso a `localStorage` para solicitudes. |
| `infraestructura/datosSimulados` | Contiene mocks usados por pantallas de perfil, contacto, información y notificaciones. |
| `routes` | Centraliza rutas públicas, rutas protegidas y control por rol. |
| `context` | Maneja sesión y rol actual mediante `AuthContext`. |

### 11.2 Decisión de uso de `localStorage`

Para EP1 se utiliza `localStorage` como mecanismo de persistencia temporal. Esta decisión permite demostrar flujos completos sin depender todavía de backend. Se usa para:

- Guardar rol actual.
- Simular sesión iniciada.
- Guardar solicitudes creadas.
- Actualizar estados.
- Registrar comentarios del funcionario.
- Mantener historial de revisiones.
- Conservar datos de prueba durante la navegación.

En una versión posterior, esta lógica será reemplazada por una API REST conectada a base de datos relacional.

### 11.3 Autenticación simulada

La sesión se maneja desde `AuthContext`. El estado autenticado depende de la existencia de un rol válido (`solicitante` o `funcionario`). Las rutas protegidas usan `ProtectedRoute` para impedir acceso cruzado entre roles.

El cambio manual de rol se mantiene solo para demostración. Actualmente se centraliza desde el encabezado común para evitar inconsistencias entre menú, ruta y vista actual.

---

## 12. Modelo de datos simulado

Las solicitudes se almacenan en `localStorage` bajo la clave:

```txt
solicitudes_db
```

Estructura lógica de una solicitud:

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

interface HistorialRevision {
  funcionario: string;
  estadoNuevo: string;
  fechaRevision: string;
}
```

También se utilizan entidades simuladas para:

- `Notificacion`
- `Solicitante`
- `Funcionario`
- `ContactoFuncionario`
- `InformacionTramite`

### Estados utilizados

| Estado | Significado | Color visual |
|---|---|---|
| Recibido | Solicitud ingresada y recibida por el sistema. | Gris |
| En revisión | Solicitud en proceso de análisis municipal. | Celeste |
| Pendiente | Solicitud requiere atención o documentación adicional. | Amarillo |
| Observado | Solicitud requiere revisión o corrección. | Amarillo |
| Aprobada | Solicitud aceptada o aprobada. | Verde |
| Rechazada / Anulada | Solicitud rechazada o anulada. | Rojo |

Los estados se normalizan desde reglas compartidas para evitar problemas por mayúsculas, tildes o nombres equivalentes.

---

## 13. Rutas principales

### 13.1 Rutas públicas

| Ruta | Pantalla | Propósito |
|---|---|---|
| `/login` | LoginPage | Ingreso al sistema y selección de rol. |
| `/registro` | RegisterPage | Creación de cuenta. |
| `/recuperar` | CambiarPassword | Recuperación o cambio de contraseña. |
| `/` | Redirect | Redirige a `/login`. |

### 13.2 Rutas protegidas del solicitante

| Ruta | Pantalla | Propósito |
|---|---|---|
| `/ciudadano/tramites` | DashboardCiudadano | Perfil y datos generales del solicitante. |
| `/ciudadano/nueva-solicitud` | RealizarSolicitud | Crear una nueva solicitud. |
| `/ciudadano/historial` | SolicitudesRealizadas | Ver historial y gestionar solicitudes. |
| `/ciudadano/solicitud/:id` | DetalleSolicitud | Ver detalle, comentarios e historial de revisión. |
| `/ciudadano/editar-solicitud/:id` | RealizarSolicitud | Complementar una solicitud existente. |
| `/ciudadano/notificaciones` | NotificacionesCiudadano | Ver cambios relevantes de solicitudes. |
| `/ciudadano/contacto` | ContactoCiudadano | Consultar canales de contacto y ayuda. |
| `/ciudadano/informacion-solicitudes` | InfoSolicitudes | Revisar requisitos por tipo de solicitud. |

### 13.3 Rutas protegidas del funcionario

| Ruta | Pantalla | Propósito |
|---|---|---|
| `/funcionario/tramites` | DashboardFuncionario | Perfil y datos generales del funcionario. |
| `/funcionario/bandeja` | BandejaFuncionario | Ver solicitudes disponibles para revisión. |
| `/funcionario/historial` | HistorialFuncionario | Consultar solicitudes desde vista de gestión. |
| `/funcionario/solicitud/:id` | RevisarSolicitudFuncionario | Revisar, comentar y actualizar una solicitud. |
| `/funcionario/notificaciones` | NotificacionesFuncionario | Revisar notificaciones asociadas al rol funcionario. |

---

## 14. Componentes principales refactorizados

Durante el desarrollo se modularizaron las páginas principales para reducir repetición y mejorar mantenibilidad.

| Grupo | Componentes principales | Uso |
|---|---|---|
| `common` | `EncabezadoAplicacion`, `BarraRol`, `LogoMunicipal`, `ContenedorPagina`, `ColorEstado` | Elementos reutilizados en pantallas internas. |
| `auth` | `EncabezadoAuth`, `FormularioLogin`, `FormularioRegistro`, `FormularioCambiarPassword`, `CampoRegistro`, `CampoAuthConEtiqueta`, `CodigoVerificacion` | Login, registro y recuperación de contraseña. |
| `solicitudes` | Formularios, tablas, modales, resumen, comentarios y documentación | Crear, editar, listar, revisar y detallar solicitudes. |
| `notificaciones` | `ListaNotificaciones`, `ItemNotificacion` | Listado y acceso a detalle desde notificaciones. |
| `ciudadano` | Tarjetas de perfil, empresa, contacto e información de trámites | Vistas informativas del solicitante. |
| `funcionario` | Perfil funcionario, bandeja, historial y filas/tablas de gestión | Vistas de gestión del funcionario. |

---

## 15. Casos de uso principales

### CU01 - Iniciar sesión

**Actor:** Solicitante o Funcionario Municipal.  
**Objetivo:** Acceder a las funcionalidades del sistema según rol.  
**Flujo principal:**

1. El usuario ingresa a `/login`.
2. Ingresa correo y contraseña.
3. Selecciona el tipo de usuario.
4. El sistema valida campos obligatorios.
5. El sistema guarda el rol en `AuthContext` y `localStorage`.
6. El sistema redirige al panel correspondiente.

**Resultado esperado:** El usuario accede a las rutas propias de su rol.

---

### CU02 - Crear una nueva solicitud

**Actor:** Solicitante.  
**Objetivo:** Registrar una solicitud municipal.  
**Flujo principal:**

1. El solicitante ingresa a "Realizar nueva solicitud".
2. Selecciona tipo de solicitud.
3. Ingresa título y descripción.
4. Revisa la advertencia sobre documentación.
5. Envía la solicitud.
6. El sistema valida los datos.
7. El sistema guarda la solicitud en `localStorage`.
8. El sistema redirige al historial.

**Resultado esperado:** La solicitud aparece en el historial con estado inicial "Pendiente".

---

### CU03 - Consultar historial de solicitudes

**Actor:** Solicitante.  
**Objetivo:** Revisar solicitudes ya ingresadas.  
**Flujo principal:**

1. El solicitante ingresa a "Solicitudes realizadas".
2. Visualiza tabla con ID, tipo, título, encargado, fecha, estado y acciones.
3. Puede filtrar por ID, tipo, fecha, estado o título.
4. Puede entrar al detalle, editar/complementar o eliminar una solicitud.

**Resultado esperado:** El usuario puede dar seguimiento a sus solicitudes.

---

### CU04 - Revisar detalle de una solicitud

**Actor:** Solicitante.  
**Objetivo:** Conocer el estado y las observaciones de una solicitud.  
**Flujo principal:**

1. El solicitante presiona el botón de detalle.
2. El sistema abre `/ciudadano/solicitud/:id`.
3. Se muestra estado actual, encargado y última revisión.
4. Se muestran comentarios del funcionario.
5. El usuario puede presionar `?` para ver historial de revisión.

**Resultado esperado:** El solicitante entiende qué ocurrió con su trámite y qué observaciones existen.

---

### CU05 - Revisar solicitud como funcionario

**Actor:** Funcionario Municipal.  
**Objetivo:** Evaluar una solicitud y registrar una decisión.  
**Flujo principal:**

1. El funcionario accede a la bandeja o historial.
2. Selecciona una solicitud.
3. Revisa tipo, título, descripción y documentación simulada.
4. Escribe un comentario si corresponde.
5. Presiona "Actualizar solicitud" o "Rechazar solicitud".
6. Selecciona el nuevo estado.
7. Confirma el cambio.
8. El sistema guarda estado, comentario, fecha y funcionario responsable.

**Resultado esperado:** La solicitud queda actualizada y el solicitante puede ver el cambio desde su detalle.

---

### CU06 - Consultar notificaciones

**Actor:** Solicitante.  
**Objetivo:** Ver eventos importantes sobre solicitudes.  
**Flujo principal:**

1. El solicitante ingresa a notificaciones.
2. Visualiza una lista de cambios relevantes.
3. Presiona el botón `?` de una notificación.
4. El sistema prepara la solicitud asociada.
5. El sistema abre el detalle de la solicitud.
6. Si la solicitud no existe en el prototipo, se crea una versión simulada para mantener el flujo.

**Resultado esperado:** El usuario accede directamente al detalle del cambio informado.

---

### CU07 - Consultar requisitos de una solicitud

**Actor:** Solicitante.  
**Objetivo:** Conocer documentación requerida antes de ingresar una solicitud.  
**Flujo principal:**

1. El usuario ingresa a "Información sobre solicitudes".
2. Selecciona tipo de trámite.
3. El sistema muestra documentos requeridos, área responsable y tiempo estimado.

**Resultado esperado:** El solicitante cuenta con información previa para evitar errores o rechazos.

---

### CU08 - Recuperar contraseña

**Actor:** Usuario público.  
**Objetivo:** Simular recuperación o cambio de contraseña.  
**Flujo principal:**

1. El usuario ingresa a `/recuperar`.
2. Ingresa correo electrónico.
3. Solicita código de verificación.
4. Ingresa código y nueva contraseña.
5. El sistema valida datos del formulario.
6. El sistema redirige a `/login`.

**Resultado esperado:** El flujo de recuperación queda validado de forma prototipal.

---

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
Actualizar estado
↓
Guardar historial de revisión
↓
Volver a bandeja
```

### 16.3 Task Flow - Notificación y trazabilidad

```txt
Solicitante recibe notificación simulada
↓
Presiona botón de detalle
↓
Sistema abre solicitud asociada
↓
Solicitante ve estado actualizado
↓
Solicitante revisa comentario del funcionario
↓
Solicitante consulta historial mediante botón ?
```

### 16.4 Task Flow - Cambio de rol prototipal

```txt
Vista solicitante
↓
Presionar indicador de rol
↓
AuthContext actualiza rol a funcionario
↓
Sistema redirige a /funcionario/tramites
↓
Menú y vistas cambian al rol funcionario
```

---

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

### 17.4 Historial de revisión

Se incorpora un botón `?` en la sección de última revisión para desplegar el historial. Esta decisión busca mantener la pantalla limpia sin ocultar información importante.

### 17.5 Prototipado con datos locales

El uso de `localStorage` permite demostrar continuidad entre pantallas sin backend. Se considera una decisión válida para EP1, ya que el foco está en frontend, navegación y experiencia de usuario.

### 17.6 Identificadores prototipales

Para esta entrega, los ID de solicitudes se mantienen con generación prototipal. En una versión madura, estos identificadores deben ser generados por backend o base de datos para garantizar unicidad.

### 17.7 Encabezado común

Las páginas internas utilizan un encabezado reutilizable que concentra navegación a notificaciones, perfil y cambio prototipal de rol. Esto evita duplicación de código y reduce inconsistencias visuales.

---

## 18. Relación con mockups

Las pantallas implementadas se basan en los mockups diseñados en Figma. La implementación busca mantener:

- Estructura general de encabezado.
- Menú lateral por rol.
- Formularios de registro, login y solicitudes.
- Tablas de historial.
- Badges de estado.
- Botones de acción.
- Vista de detalle de solicitud.
- Notificaciones y acceso a detalle.
- Información sobre requisitos.
- Contacto y ayuda.

Algunas diferencias se mantienen por decisiones de prototipo, por ejemplo:

- Uso de datos simulados en lugar de datos reales.
- Subida de documentación representada visualmente, sin carga real de archivos.
- Cambio manual de rol como apoyo de demostración.
- Generación de ID prototipal.

---

## 19. Instalación y ejecución

### Requisitos previos

- Node.js instalado.
- npm instalado.
- Git instalado.

### Clonar repositorio

```bash
git clone https://github.com/IgnacioGameolay/municipal-request-tracker.git
cd municipal-request-tracker
```

### Instalar dependencias del frontend

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

---

## 20. Uso del sistema para demostración

### 20.1 Flujo solicitante recomendado

1. Abrir la aplicación.
2. Iniciar sesión como Solicitante.
3. Revisar perfil.
4. Ir a "Realizar nueva solicitud".
5. Crear una solicitud.
6. Verla en "Solicitudes realizadas".
7. Entrar al detalle.
8. Revisar notificaciones.
9. Abrir una notificación con el botón `?`.
10. Consultar "Información sobre solicitudes".
11. Consultar "Contacto y ayuda".
12. Cambiar a funcionario desde el indicador de rol para validar continuidad del flujo.

### 20.2 Flujo funcionario recomendado

1. Iniciar sesión como Funcionario Municipal.
2. Revisar perfil funcionario.
3. Ingresar a historial o bandeja de solicitudes.
4. Abrir una solicitud.
5. Escribir comentario.
6. Actualizar estado.
7. Confirmar cambio.
8. Volver a bandeja.
9. Verificar que la solicitud quedó actualizada.
10. Cambiar a solicitante para revisar cómo se visualiza el cambio.

---

## 21. Comandos útiles

```bash
# Instalar dependencias
cd client
npm install

# Ejecutar proyecto
npm run dev

# Compilar proyecto
npm run build

# Formatear código si se usa Prettier
npx prettier --write "src/**/*.{ts,tsx,css,json,md}"
```

---

## 22. Limpieza de datos locales

El prototipo usa `localStorage`. Si se desea reiniciar las solicitudes guardadas durante pruebas, abrir la consola del navegador y ejecutar:

```js
localStorage.removeItem('solicitudes_db');
```

Para reiniciar sesión y rol:

```js
localStorage.removeItem('rol_actual');
```

Para limpiar todo el prototipo durante pruebas:

```js
localStorage.clear();
location.href = '/login';
```

---

## 23. Pruebas manuales recomendadas

Antes de entregar, se recomienda validar el siguiente flujo:

- Login como solicitante.
- Creación de solicitud.
- Visualización en historial.
- Edición/complemento de solicitud.
- Detalle de solicitud.
- Notificación y acceso a detalle.
- Consulta de información de solicitudes.
- Contacto y ayuda.
- Cambio prototipal a funcionario.
- Bandeja de funcionario.
- Revisión y actualización de estado.
- Visualización del cambio desde solicitante.
- Login como funcionario desde `/login`.
- Rutas protegidas por rol.
- Recuperación de contraseña.
- Registro de cuenta.
- Compilación con `npm run build`.

---

## 24. Limitaciones actuales

- La autenticación es simulada.
- Los datos no se guardan en servidor.
- La documentación se representa visualmente, pero no se sube realmente.
- Las notificaciones son simuladas.
- La generación de ID es prototipal.
- El backend todavía no está conectado al frontend.
- El cambio manual de rol se mantiene como recurso de demostración para EP1.
- El sistema aún no valida usuarios reales ni permisos desde servidor.

Estas limitaciones son coherentes con el alcance de la entrega parcial, cuyo foco es el frontend, la navegación, el prototipo funcional y la estructura base del sistema.

---

## 25. Proyección para próximas entregas

Para una versión posterior del sistema se propone:

- Implementar API REST.
- Conectar base de datos relacional.
- Implementar autenticación real con JWT.
- Persistir usuarios, solicitudes, comentarios y revisiones en backend.
- Generar ID únicos desde base de datos.
- Implementar carga real de documentos.
- Implementar notificaciones reales.
- Mejorar permisos por rol desde backend.
- Agregar auditoría de acciones.
- Mejorar validación de formularios.
- Centralizar lógica de solicitudes en servicios conectados a backend.
- Reemplazar datos simulados por datos obtenidos desde API.

---

## 26. Cumplimiento de pauta EP1

| Criterio esperado | Evidencia en el proyecto |
|---|---|
| Uso de Ionic + React + TypeScript | Proyecto frontend en `client` construido con Ionic React y TS. |
| Rutas públicas | Login, registro y recuperación. |
| Rutas protegidas | `ProtectedRoute` para solicitante y funcionario. |
| Dos roles diferenciados | Solicitante y Funcionario Municipal. |
| Mínimo de pantallas implementadas | Se implementan más de cuatro pantallas funcionales. |
| Componentes Ionic | Uso de `IonPage`, `IonHeader`, `IonToolbar`, `IonContent`, `IonMenu`, `IonButton`, `IonInput`, `IonSelect`, `IonModal`, etc. |
| Organización modular | Carpetas `pages`, `components`, `routes`, `context`, `dominio`, `aplicacion` e `infraestructura`. |
| Mockups asociados | Pantallas implementadas según Figma. |
| Arquitectura de navegación | Documento en `docs/Arquitectura_Navegacion.md`. |
| Funcionalidades más allá de login/registro | Solicitudes, historial, revisión, notificaciones, contacto e información. |
| Validaciones básicas | Login, registro, recuperación y creación/edición de solicitudes. |
| Uso de repositorio | Proyecto estructurado para entrega mediante GitHub. |

---

## 27. Autores

Proyecto desarrollado para la asignatura **ICI4247/1 - Ingeniería Web y Móvil**.

Integrantes:

- Sebastián Andrés de Jesús García Valdebenito
- Francisca Antonia Guzmán Pérez
- Vicente Nills Quezada Gallardo
- Ignacio Antonio Reyes Toledo

---

## 28. Estado actual

El proyecto se encuentra en estado de prototipo frontend funcional para EP1. La aplicación permite demostrar los flujos principales de navegación, gestión de solicitudes, revisión por funcionario, notificaciones simuladas, consulta de requisitos, contacto municipal y visualización de trazabilidad por parte del solicitante.

La versión actual cuenta con una estructura más modular que separa páginas, componentes reutilizables, reglas de dominio, casos de uso, datos simulados y almacenamiento local. Esto deja el proyecto mejor preparado para una futura conexión con backend y base de datos.
