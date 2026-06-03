import { Solicitud } from "../dominio/entidades/Solicitud";
import { EstadoSolicitud, SolicitudApi } from "./solicitudesApi";

function mapEstadoApiToEstadoVisual(estado: EstadoSolicitud): string {
  const estados: Record<EstadoSolicitud, string> = {
    pendiente: "Pendiente",
    en_revision: "En revisión",
    resuelta: "Aprobada",
    rechazada: "Rechazada",
  };

  return estados[estado] || "Desconocido";
}

export function mapSolicitudApiToSolicitud(api: SolicitudApi): Solicitud {
  return {
    id: api.id,
    titulo: api.titulo,
    encargado: api.funcionarioId ? api.funcionarioId : "Sin asignar",
    fecha: api.createdAt,
    estado: mapEstadoApiToEstadoVisual(api.estado),
    tipo: api.categoria,
    cliente: api.comuna,
    descripcion: api.descripcion,
    descripcionAgregada: api.direccion,
    comentariosFuncionario: api.comentarioFuncionario ?? undefined,
    ultimaRevision: api.updatedAt || api.createdAt,
  };
}

export function mapSolicitudesApiToSolicitudes(
  solicitudes: SolicitudApi[],
): Solicitud[] {
  return solicitudes.map(mapSolicitudApiToSolicitud);
}