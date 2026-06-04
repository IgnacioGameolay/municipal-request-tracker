import { apiRequest } from "./apiClient";

export interface NotificacionApi {
  id: string;
  usuarioId: string;
  solicitudId?: string | null;
  titulo: string;
  mensaje: string;
  leida: boolean;
  createdAt: string;
}

export async function obtenerNotificaciones(): Promise<NotificacionApi[]> {
  const response = await apiRequest<NotificacionApi[]>("/notificaciones");

  return response.data ?? [];
}

export async function marcarNotificacionLeida(
  id: string
): Promise<NotificacionApi> {
  const response = await apiRequest<NotificacionApi>(
    `/notificaciones/${id}/leida`,
    {
      method: "PATCH",
    }
  );

  if (!response.data) {
    throw new Error("No se pudo marcar la notificación como leída");
  }

  return response.data;
}