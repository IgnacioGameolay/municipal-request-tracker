export const ESTADOS_SOLICITUD = {
  pendiente: "Pendiente",
  enRevision: "En revisión",
  resuelta: "Resuelta",
  rechazada: "Rechazada",
  recibido: "Pendiente",
  aprobada: "Resuelta",
} as const;

export const ESTADOS_SOLICITUD_VISUALES = [
  ESTADOS_SOLICITUD.pendiente,
  ESTADOS_SOLICITUD.enRevision,
  ESTADOS_SOLICITUD.resuelta,
  ESTADOS_SOLICITUD.rechazada,
] as const;

export type EstadoSolicitudVisual =
  (typeof ESTADOS_SOLICITUD_VISUALES)[number];