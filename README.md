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
- Usar componentes Ionic para construir una interfaz coherente con la pauta del curso.

---

## 4. Alcance de la Entrega Parcial 1

Esta entrega se enfoca en el desarrollo frontend del sistema. No corresponde aún a una implementación completa con backend persistente ni base de datos real. Para simular persistencia durante la navegación, se utiliza `localStorage` del navegador.

### Incluido en EP1

- Proyecto Ionic React con TypeScript.
- Rutas públicas y protegidas.
- Separación de roles: Solicitante y Funcionario Municipal.
- Pantallas principales asociadas a mockups.
- Formularios de login, registro y recuperación de contraseña.
- Creación, edición, listado y detalle de solicitudes.
- Bandeja e historial para funcionario.
- Actualización de estado por parte del funcionario.
- Comentarios de revisión.
- Historial de revisiones.
- Notificaciones simuladas.
- Consulta de información sobre requisitos de solicitudes.
- Canales de contacto y ayuda.
- Menú lateral diferenciado por rol.
- Estructura inicial de servicios.
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
| Solicitante | Usuario que crea y consulta solicitudes municipales. | Perfil, nueva solicitud, historial, detalle, notificaciones, contacto, información de solicitudes. |
| Funcionario Municipal | Usuario que revisa solicitudes y actualiza estados. | Perfil funcionario, bandeja, historial, revisión de solicitud, notificaciones. |

En esta entrega, el control de sesión y rol se simula mediante `AuthContext` y `localStorage`. Esto permite validar navegación, separación de vistas y comportamiento general del prototipo sin implementar todavía un backend de autenticación.

Además, se mantiene un cambio manual de rol desde algunos encabezados como apoyo prototipal para la demostración y validación rápida del flujo entre solicitante y funcionario. En una versión productiva, este mecanismo sería reemplazado por autenticación real y control de permisos desde backend.

---

## 7. Requerimientos funcionales considerados

| ID | Requerimiento funcional | Rol principal | Estado en prototipo |
|---|---|---|---|
| RF01 | Registrar y consultar solicitudes municipales. | Solicitante | Implementado en frontend. |
| RF02 | Visualizar estado actual de una solicitud. | Solicitante / Funcionario | Implementado con etiquetas de estado. |
| RF03 | Crear una nueva solicitud. | Solicitante | Implementado con formulario. |
| RF04 | Editar o complementar información de una solicitud. | Solicitante | Implementado mediante vista de edición. |
| RF05 | Consultar historial de solicitudes realizadas. | Solicitante | Implementado con tabla y filtros. |
| RF06 | Recibir notificaciones sobre cambios de estado. | Solicitante | Implementado con datos simulados. |
| RF07 | Visualizar comentarios u observaciones del funcionario. | Solicitante | Implementado en detalle de solicitud. |
| RF08 | Revisar solicitudes ingresadas. | Funcionario | Implementado en bandeja/historial. |
| RF09 | Actualizar estado de una solicitud. | Funcionario | Implementado con modal de cambio de estado. |
| RF10 | Registrar historial de revisión. | Funcionario / Solicitante | Implementado con `historialRevisiones`. |
| RF11 | Consultar requisitos por tipo de solicitud. | Solicitante | Implementado en Información sobre solicitudes. |
| RF12 | Consultar canales de contacto y ayuda. | Solicitante | Implementado en Contacto y ayuda. |

---

## 8. Requerimientos no funcionales considerados

| ID | Requerimiento no funcional | Aplicación en el prototipo |
|---|---|---|
| RNF01 | Usabilidad | Interfaz con menús, filtros, botones claros, etiquetas de estado y formularios simples. |
| RNF02 | Consistencia visual | Uso de encabezado común, colores por rol y componentes Ionic. |
| RNF03 | Trazabilidad | Registro de última revisión, estado nuevo, funcionario responsable y comentarios. |
| RNF04 | Separación por roles | Rutas protegidas y menús diferenciados para solicitante y funcionario. |
| RNF05 | Mantenibilidad | Organización por carpetas `pages`, `components`, `routes`, `context` y `services`. |
| RNF06 | Rendimiento percibido | Datos locales simulados para navegación rápida durante el prototipo. |
| RNF07 | Escalabilidad futura | Estructura preparada para reemplazar `localStorage` por API REST y base de datos. |

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

## 10. Estructura del proyecto

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
│   │   ├── components/
│   │   │   ├── MenuCiudadano.tsx
│   │   │   ├── MenuFuncionario.tsx
│   │   │   └── DashboardLayout.tsx
│   │   ├── context/
│   │   │   └── AuthContext.tsx
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
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   └── solicitudesService.ts
│   │   └── theme/
│   │       └── variables.css
├── docs/
│   └── Arquitectura_Navegacion.md
├── otros/
│   ├── diagramas/
│   └── capturas/
└── server/
    └── src/
```

---

## 11. Arquitectura frontend

La aplicación está organizada con una arquitectura frontend basada en componentes, rutas y contexto de autenticación simulado.

### 11.1 Capas principales

| Capa | Responsabilidad |
|---|---|
| Pages | Contienen las vistas principales del sistema. |
| Components | Contienen elementos reutilizables, especialmente menús laterales. |
| Routes | Centralizan la definición de navegación y protección por rol. |
| Context | Maneja sesión y rol actual mediante `AuthContext`. |
| Services | Agrupan funciones auxiliares o servicios simulados. |
| Storage local | Simula persistencia de solicitudes, sesión y rol. |

### 11.2 Decisión de uso de `localStorage`

Para EP1 se utiliza `localStorage` como mecanismo de persistencia temporal. Esta decisión permite demostrar flujos completos sin depender todavía de backend. Se usa para:

- Guardar rol actual.
- Simular sesión iniciada.
- Guardar solicitudes creadas.
- Actualizar estados.
- Registrar comentarios del funcionario.
- Mantener historial de revisiones.

En una versión posterior, esta lógica será reemplazada por una API REST conectada a base de datos relacional.

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

### Estados utilizados

| Estado | Significado | Color visual |
|---|---|---|
| Recibido | Solicitud ingresada y recibida por el sistema. | Gris |
| En revisión | Solicitud en proceso de análisis municipal. | Celeste |
| Pendiente | Solicitud requiere atención o documentación adicional. | Amarillo |
| Aprobada | Solicitud aceptada o aprobada. | Verde |
| Rechazada / Anulada | Solicitud rechazada o anulada. | Rojo |

---

## 13. Rutas principales

### 13.1 Rutas públicas

| Ruta | Pantalla | Propósito |
|---|---|---|
| `/login` | LoginPage | Ingreso al sistema y selección de rol. |
| `/registro` | RegisterPage | Creación de cuenta de solicitante. |
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

## 14. Casos de uso principales

### CU01 - Iniciar sesión

**Actor:** Solicitante o Funcionario Municipal.  
**Objetivo:** Acceder a las funcionalidades del sistema según rol.  
**Flujo principal:**

1. El usuario ingresa a `/login`.
2. Ingresa correo y contraseña.
3. Selecciona el tipo de usuario.
4. El sistema guarda el rol en `localStorage`.
5. El sistema redirige al panel correspondiente.

**Resultado esperado:** El usuario accede a las rutas propias de su rol.

---

### CU02 - Crear una nueva solicitud

**Actor:** Solicitante.  
**Objetivo:** Registrar una solicitud municipal.  
**Flujo principal:**

1. El solicitante ingresa a “Realizar nueva solicitud”.
2. Selecciona tipo de solicitud.
3. Ingresa título y descripción.
4. Revisa la advertencia sobre documentación.
5. Envía la solicitud.
6. El sistema la guarda en `localStorage`.
7. El sistema redirige al historial.

**Resultado esperado:** La solicitud aparece en el historial con estado inicial “Pendiente”.

---

### CU03 - Consultar historial de solicitudes

**Actor:** Solicitante.  
**Objetivo:** Revisar solicitudes ya ingresadas.  
**Flujo principal:**

1. El solicitante ingresa a “Solicitudes realizadas”.
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
5. Presiona “Actualizar solicitud” o “Rechazar solicitud”.
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
4. El sistema abre el detalle de la solicitud asociada.
5. Si la solicitud no existe en el prototipo, se crea una versión simulada para mantener el flujo.

**Resultado esperado:** El usuario accede directamente al detalle del cambio informado.

---

### CU07 - Consultar requisitos de una solicitud

**Actor:** Solicitante.  
**Objetivo:** Conocer documentación requerida antes de ingresar una solicitud.  
**Flujo principal:**

1. El usuario ingresa a “Información sobre solicitudes”.
2. Selecciona tipo de trámite.
3. El sistema muestra documentos requeridos, área responsable y tiempo estimado.

**Resultado esperado:** El solicitante cuenta con información previa para evitar errores o rechazos.

---

## 15. Task flows principales

### 15.1 Task Flow - Crear y consultar solicitud

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

### 15.2 Task Flow - Revisión por funcionario

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

### 15.3 Task Flow - Notificación y trazabilidad

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

---

## 16. Decisiones de diseño

### 16.1 Colores por rol

- Azul principal para encabezado general del sistema.
- Amarillo para rol solicitante.
- Rojo para rol funcionario municipal.

Esta diferenciación permite reconocer rápidamente el contexto de navegación.

### 16.2 Etiquetas de estado

Los estados se representan mediante badges de color para facilitar lectura rápida:

- Gris: recibido.
- Celeste: en revisión.
- Amarillo: pendiente u observado.
- Verde: aprobada.
- Rojo: rechazada o anulada.

### 16.3 Separación por rol

Se utilizan menús laterales distintos para solicitante y funcionario. Esto reduce ruido visual y evita mostrar opciones que no corresponden al usuario actual.

### 16.4 Historial de revisión

Se incorpora un botón `?` en la sección de última revisión para desplegar el historial. Esta decisión busca mantener la pantalla limpia sin ocultar información importante.

### 16.5 Prototipado con datos locales

El uso de `localStorage` permite demostrar continuidad entre pantallas sin backend. Se considera una decisión válida para EP1, ya que el foco está en frontend, navegación y experiencia de usuario.

### 16.6 Identificadores prototipales

Para esta entrega, los ID de solicitudes se mantienen con generación prototipal. En una versión madura, estos identificadores deben ser generados por backend o base de datos para garantizar unicidad.

---

## 17. Relación con mockups

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

## 18. Instalación y ejecución

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

## 19. Uso del sistema para demostración

### 19.1 Flujo solicitante recomendado

1. Abrir la aplicación.
2. Iniciar sesión como Solicitante.
3. Revisar perfil.
4. Ir a “Realizar nueva solicitud”.
5. Crear una solicitud.
6. Verla en “Solicitudes realizadas”.
7. Entrar al detalle.
8. Revisar notificaciones.
9. Abrir una notificación con el botón `?`.
10. Consultar “Información sobre solicitudes”.
11. Consultar “Contacto y ayuda”.

### 19.2 Flujo funcionario recomendado

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

## 20. Comandos útiles

```bash
# Instalar dependencias
cd client
npm install

# Ejecutar proyecto
npm run dev

# Compilar proyecto
npm run build
```

---

## 21. Limpieza de datos locales

El prototipo usa `localStorage`. Si se desea reiniciar las solicitudes guardadas durante pruebas, abrir la consola del navegador y ejecutar:

```js
localStorage.removeItem('solicitudes_db');
```

Para reiniciar sesión/rol:

```js
localStorage.removeItem('rol_actual');
localStorage.removeItem('is_authenticated');
```

---

## 22. Limitaciones actuales

- La autenticación es simulada.
- Los datos no se guardan en servidor.
- La documentación se representa visualmente, pero no se sube realmente.
- Las notificaciones son simuladas.
- La generación de ID es prototipal.
- El backend todavía no está conectado al frontend.
- El cambio manual de rol se mantiene como recurso de demostración para EP1.

Estas limitaciones son coherentes con el alcance de la entrega parcial, cuyo foco es el frontend, la navegación, el prototipo funcional y la estructura base del sistema.

---

## 23. Proyección para próximas entregas

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
- Centralizar lógica de solicitudes en servicios.

---

## 24. Cumplimiento de pauta EP1

| Criterio esperado | Evidencia en el proyecto |
|---|---|
| Uso de Ionic + React + TypeScript | Proyecto frontend en `client` construido con Ionic React y TS. |
| Rutas públicas | Login, registro y recuperación. |
| Rutas protegidas | `ProtectedRoute` para solicitante y funcionario. |
| Dos roles diferenciados | Solicitante y Funcionario Municipal. |
| Mínimo de pantallas implementadas | Se implementan más de cuatro pantallas funcionales. |
| Componentes Ionic | Uso de `IonPage`, `IonHeader`, `IonToolbar`, `IonContent`, `IonMenu`, `IonButton`, `IonInput`, `IonSelect`, `IonModal`, etc. |
| Organización modular | Carpetas `pages`, `components`, `routes`, `context`, `services`. |
| Mockups asociados | Pantallas implementadas según Figma. |
| Arquitectura de navegación | Documento en `docs/Arquitectura_Navegacion.md`. |
| Funcionalidades más allá de login/registro | Solicitudes, historial, revisión, notificaciones, contacto e información. |
| Uso de repositorio | Proyecto estructurado para entrega mediante GitHub. |

---

## 25. Autores

Proyecto desarrollado para la asignatura **ICI4247/1 - Ingeniería Web y Móvil**.

Integrantes:

- Sebastián Andrés de Jesús García Valdebenito
- Francisca Antonia Guzmán Pérez
- Vicente Nills Quezada Gallardo
- Ignacio Antonio Reyes Toledo


---

## 26. Estado actual

El proyecto se encuentra en estado de prototipo frontend funcional para EP1. La aplicación permite demostrar los flujos principales de navegación, gestión de solicitudes, revisión por funcionario y visualización de trazabilidad por parte del solicitante.
