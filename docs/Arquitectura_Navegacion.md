# Definición de Arquitectura de Navegación y Experiencia de Usuario (EP 1.4)
**Proyecto:** Municipal Request Tracker (MRT)

Este documento especifica la estructura lógica de enrutamiento y la interacción del usuario diseñada para resolver la ineficiencia comunicacional y la falta de trazabilidad en los trámites municipales.

---

## (a) Rutas Principales y Secundarias
El sistema utiliza React Router para orquestar la navegación, aislando los dominios mediante una estructura de URLs determinista. A continuación el tree del proyecto con sus ramas:

![RootTree](/misc/RootTree.png)

**Rutas Públicas (No autenticadas):**
* `/login` : Puerta de entrada y autenticación.
* `/registro` : Formulario de creación de cuenta ciudadana.

**Rutas Privadas (Solicitante):**
* `/ciudadano/tramites` : (Principal) Dashboard de seguimiento.
* `/ciudadano/tramites/:id` : (Secundaria) Detalle del expediente y visualización de observaciones.
* `/ciudadano/tramites/:id/subsanar` : (Secundaria) Interfaz de recarga de documentos.

**Rutas Privadas (Funcionario):**
* `/admin/bandeja` : (Principal) DataGrid de gestión de solicitudes pendientes.
* `/admin/tramites/:id` : (Secundaria) Interfaz de revisión técnica y emisión de observaciones.

## (b) Jerarquía de Vistas
Se ha implementado una arquitectura de **profundidad máxima de 3 niveles** (Raíz -> Resumen -> Detalle/Acción) para minimizar la carga cognitiva.

1. **Nivel 1 (Orquestación):** `DashboardLayout` (Contiene la navegación lateral persistente).
2. **Nivel 2 (Listados):** Tablas de datos y tarjetas de resumen (`/tramites`, `/bandeja`).
3. **Nivel 3 (Foco de Tarea):** Vistas sin distracciones para lectura de observaciones o carga de archivos (`/:id`, `/:id/subsanar`).

## (c) Flujo de Navegación y (d) Diferenciación por Roles
El enrutamiento está protegido por un patrón de diseño *Higher-Order Component* (HOC) llamado `ProtectedRoute`. Este componente lee el Token JWT y bifurca la navegación.

* **El Solicitante:** Su navegación es lineal y orientada a la resolución. Solo tiene acceso a sus propios trámites.
* **El Funcionario:** Su navegación es paralela y orientada a la gestión masiva. Accede a la bandeja global de revisión.
* Ambos roles comparten el mismo esqueleto visual (`DashboardLayout`), pero el contenido del menú lateral se inyecta dinámicamente según sus privilegios, garantizando un estricto Control de Acceso Basado en Roles (RBAC).

## (e) Flujo de Tareas (Task Flows)
Para resolver la falta de información sobre rechazos, el sistema fuerza un flujo inquebrantable de subsanación.

**Task Flow: Subsanar Documentación Rechazada**
1. **Entrada:** El ciudadano ingresa a `/ciudadano/tramites`.
2. **Notificación:** El sistema renderiza una alerta visual de alta prioridad indicando un estado "OBSERVADO".
3. **Navegación Profunda:** El usuario hace clic y el router ejecuta un Push hacia `/ciudadano/tramites/:id`.
4. **Consumo de Información:** El usuario lee el motivo exacto del rechazo registrado por el funcionario.
5. **Ejecución de Acción:** Navega a `/ciudadano/tramites/:id/subsanar`, adjunta el nuevo PDF y confirma. El sistema actualiza el estado a "EN_REVISION" y redirige al dashboard principal.

### Flujo de Subsanación (Task Flow Crítico)
A continuación, se detalla la interacción a nivel de componentes para la subsanación de documentos, demostrando el aislamiento de la lógica de enrutamiento:

![Diagrama de Secuencia](/misc/Diagrama_Secuencia.png)

### Modelo de Estados del Dominio
El siguiente diagrama ilustra la transición de estados de una solicitud, destacando el estado "OBSERVADO" que resuelve la falla comunicacional del municipio:

![Máquina de Estados](/misc/Diagrama%20de%20Máquina%20de%20Estados.png)

