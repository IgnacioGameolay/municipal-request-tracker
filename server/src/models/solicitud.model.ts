export type EstadoSolicitud =
  | "pendiente"
  | "en_revision"
  | "resuelta"
  | "rechazada";

export type PrioridadSolicitud = "baja" | "media" | "alta";

export interface Solicitud {
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