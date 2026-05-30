import { Solicitud } from "../dominio/entidades/Solicitud";
import { EstadoSolicitud, SolicitudApi } from "./solicitudesApi";

function formatearFechaIsoParaVista(fechaIso: string): string {
  const fecha = new Date(fechaIso);

  if (Number.isNaN(fecha.getTime())) {
    return fechaIso;
  }

  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const anio = fecha.getFullYear();

  let hora = fecha.getHours();
  const minutos = String(fecha.getMinutes()).padStart(2, "0");
  const periodo = hora >= 12 ? "pm" : "am";

  hora = hora % 12;
  hora = hora === 0 ? 12 : hora;

  return `${dia}-${mes}-${anio} ${String(hora).padStart(2, "0")}:${minutos} ${periodo}`;
}

function mapEstadoApiToEstadoVisual(estado: EstadoSolicitud): string {
  const estados: Record<EstadoSolicitud, string> = {
    pendiente: "Pendiente",
    en_revision: "En revisión",
    resuelta: "Aprobada",
    rechazada: "Rechazada",
  };

  return estados[estado];
}

export function mapSolicitudApiToSolicitud(api: SolicitudApi): Solicitud {
  return {
    id: api.id,
    titulo: api.titulo,
    encargado: api.funcionarioId ? api.funcionarioId : "Sin asignar",
    fecha: formatearFechaIsoParaVista(api.createdAt),
    estado: mapEstadoApiToEstadoVisual(api.estado),
    tipo: api.categoria,
    cliente: api.comuna,
    descripcion: api.descripcion,
    descripcionAgregada: api.direccion,
    comentariosFuncionario: api.comentarioFuncionario,
    ultimaRevision: formatearFechaIsoParaVista(api.updatedAt),
  };
}

export function mapSolicitudesApiToSolicitudes(
  solicitudes: SolicitudApi[],
): Solicitud[] {
  return solicitudes.map(mapSolicitudApiToSolicitud);
}