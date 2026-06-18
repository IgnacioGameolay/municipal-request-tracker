export interface DocumentoSolicitud {
  id: string;
  solicitudId: string;
  subidoPorUsuarioId: string;

  nombreOriginal: string;
  nombreAlmacenado: string;
  mimeType: string;
  sizeBytes: number;
  ruta: string;

  createdAt: string;
}

export const MAX_DOCUMENTOS_POR_SOLICITUD = 10;
export const MAX_DOCUMENTO_SIZE_BYTES = 15 * 1024 * 1024;

export const MIME_TYPES_PERMITIDOS = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;