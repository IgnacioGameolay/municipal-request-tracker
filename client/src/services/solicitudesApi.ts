import { apiRequest } from "./apiClient";

export type EstadoSolicitud =
  | "pendiente"
  | "en_revision"
  | "resuelta"
  | "rechazada";

export type EstadoSolicitudApi = EstadoSolicitud;

export type PrioridadSolicitud = "baja" | "media" | "alta";
export type PrioridadSolicitudApi = PrioridadSolicitud;

export interface SolicitudApi {
  id: string;
  usuarioId: string;
  titulo: string;
  categoria: string;
  descripcion: string;
  direccion: string;
  comuna: string;
  estado: EstadoSolicitud;
  prioridad: PrioridadSolicitud;
  comentarioFuncionario?: string | null;
  funcionarioId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CrearSolicitudData {
  titulo: string;
  categoria: string;
  descripcion: string;
  direccion: string;
  comuna: string;
  prioridad?: PrioridadSolicitud;
}

export type CrearSolicitudPayload = CrearSolicitudData;

export interface ActualizarSolicitudData {
  titulo?: string;
  categoria?: string;
  descripcion?: string;
  direccion?: string;
  comuna?: string;
  prioridad?: PrioridadSolicitud;
}

export type ActualizarSolicitudPayload = ActualizarSolicitudData;

export interface CambiarEstadoData {
  estado: EstadoSolicitud;
  comentarioFuncionario?: string;
}

interface ListarSolicitudesResponse {
  solicitudes: SolicitudApi[];
  meta?: {
    paginaActual: number;
    totalPaginas: number;
    totalRegistros: number;
  };
}

export async function obtenerSolicitudes(): Promise<SolicitudApi[]> {
  const response = await apiRequest<ListarSolicitudesResponse | SolicitudApi[]>("/solicitudes");

  if (Array.isArray(response.data)) {
    return response.data;
  }

  return response.data?.solicitudes ?? [];
}

export const listarSolicitudesApi = obtenerSolicitudes;

export async function obtenerSolicitudPorId(
  id: string | number,
): Promise<SolicitudApi> {
  const response = await apiRequest<SolicitudApi>(`/solicitudes/${id}`);

  if (!response.data) {
    throw new Error("Solicitud no encontrada");
  }

  return response.data;
}

export const obtenerSolicitudApi = obtenerSolicitudPorId;

export async function crearSolicitud(
  data: CrearSolicitudData,
): Promise<SolicitudApi> {
  const response = await apiRequest<SolicitudApi>("/solicitudes", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.data) {
    throw new Error("No se pudo crear la solicitud");
  }

  return response.data;
}

export const crearSolicitudApi = crearSolicitud;

export async function actualizarSolicitud(
  id: string | number,
  data: ActualizarSolicitudData,
): Promise<SolicitudApi> {
  const response = await apiRequest<SolicitudApi>(`/solicitudes/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!response.data) {
    throw new Error("No se pudo actualizar la solicitud");
  }

  return response.data;
}

export const actualizarSolicitudApi = actualizarSolicitud;

export async function cambiarEstadoSolicitud(
  id: string | number,
  data: CambiarEstadoData,
): Promise<SolicitudApi> {
  const response = await apiRequest<SolicitudApi>(`/solicitudes/${id}/estado`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  if (!response.data) {
    throw new Error("No se pudo cambiar el estado de la solicitud");
  }

  return response.data;
}

export async function actualizarEstadoSolicitudApi(params: {
  id: string | number;
  estadoNuevo: string;
  comentario?: string;
}): Promise<SolicitudApi> {
  return cambiarEstadoSolicitud(params.id, {
    estado: estadoVisualAApi(params.estadoNuevo),
    comentarioFuncionario: params.comentario,
  });
}

export async function eliminarSolicitud(id: string | number): Promise<void> {
  await apiRequest<{ id: string }>(`/solicitudes/${id}`, {
    method: "DELETE",
  });
}

export const eliminarSolicitudApi = eliminarSolicitud;

export function estadoVisualAApi(estado: string): EstadoSolicitud {
  const normalizado = estado
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (normalizado === "en revision") {
    return "en_revision";
  }

  if (normalizado === "resuelta" || normalizado === "resuelto") {
    return "resuelta";
  }

  if (normalizado === "rechazada" || normalizado === "rechazado") {
    return "rechazada";
  }

  return "pendiente";
}