export interface Notificacion {
  id: string | number;

  idSolicitud?: string | number;
  tituloSolicitud?: string;
  textoPrincipal?: string;
  funcionario?: string;
  textoSecundario?: string;
  fecha?: string;
  estadoSolicitud?: string;
  comentarioDetalle?: string;

  // Campos de la API.
  usuarioId?: string;
  solicitudId?: string | number | null;
  titulo?: string;
  mensaje?: string;
  leida?: boolean;
  createdAt?: string;
}