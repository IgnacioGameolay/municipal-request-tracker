export interface Notificacion {
  id: string;
  usuarioId: string;
  solicitudId?: string;
  titulo: string;
  mensaje: string;
  leida: boolean;
  createdAt: string;
}