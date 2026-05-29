import { apiRequest } from "./apiClient";

export type EstadoSolicitud =
  | "pendiente"
  | "en_revision"
  | "resuelta"
  | "rechazada";

export type PrioridadSolicitud = "baja" | "media" | "alta";

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
  comentarioFuncionario?: string;
  funcionarioId?: string;
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

export interface ActualizarSolicitudData {
  titulo?: string;
  categoria?: string;
  descripcion?: string;
  direccion?: string;
  comuna?: string;
  prioridad?: PrioridadSolicitud;
}

export interface CambiarEstadoData {
  estado: EstadoSolicitud;
  comentarioFuncionario?: string;
}

export async function obtenerSolicitudes(): Promise<SolicitudApi[]> {
  const response = await apiRequest<SolicitudApi[]>("/solicitudes");

  return response.data ?? [];
}

export async function obtenerSolicitudPorId(id: string): Promise<SolicitudApi> {
  const response = await apiRequest<SolicitudApi>(`/solicitudes/${id}`);

  if (!response.data) {
    throw new Error("Solicitud no encontrada");
  }

  return response.data;
}

export async function crearSolicitud(
  data: CrearSolicitudData
): Promise<SolicitudApi> {
  const response = await apiRequest<SolicitudApi>("/solicitudes", {
    method: "POST",
    body: JSON.stringify(data)
  });

  if (!response.data) {
    throw new Error("No se pudo crear la solicitud");
  }

  return response.data;
}

export async function actualizarSolicitud(
  id: string,
  data: ActualizarSolicitudData
): Promise<SolicitudApi> {
  const response = await apiRequest<SolicitudApi>(`/solicitudes/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });

  if (!response.data) {
    throw new Error("No se pudo actualizar la solicitud");
  }

  return response.data;
}

export async function cambiarEstadoSolicitud(
  id: string,
  data: CambiarEstadoData
): Promise<SolicitudApi> {
  const response = await apiRequest<SolicitudApi>(`/solicitudes/${id}/estado`, {
    method: "PATCH",
    body: JSON.stringify(data)
  });

  if (!response.data) {
    throw new Error("No se pudo cambiar el estado de la solicitud");
  }

  return response.data;
}

export async function eliminarSolicitud(id: string): Promise<void> {
  await apiRequest<{ id: string }>(`/solicitudes/${id}`, {
    method: "DELETE"
  });
}