import { Solicitud } from "../../dominio/entidades/Solicitud";
import { normalizarEstado } from "../../dominio/reglas/normalizarEstado";
import { normalizarFechaVisual } from "../../dominio/reglas/formatearFecha";

export interface FiltrosFuncionario {
  nroSolicitud: string;
  identificador: string;
  fecha: string;
  estado: string;
  titulo: string;
}

const fechaInputAVisual = (fechaInput: string) => {
  if (!fechaInput) {
    return "";
  }

  const [anio, mes, dia] = fechaInput.split("-");

  if (!anio || !mes || !dia) {
    return "";
  }

  return `${dia}-${mes}-${anio}`;
};

export const filtrarSolicitudesFuncionario = (
  solicitudes: Solicitud[],
  filtros: FiltrosFuncionario,
): Solicitud[] => {
  let resultado = [...solicitudes];

  if (filtros.nroSolicitud.trim()) {
    resultado = resultado.filter((solicitud) =>
      solicitud.id.toString().includes(filtros.nroSolicitud.trim()),
    );
  }

  if (filtros.identificador.trim()) {
    resultado = resultado.filter((solicitud) =>
      solicitud.id.toString().includes(filtros.identificador.trim()),
    );
  }

  if (filtros.estado) {
    resultado = resultado.filter(
      (solicitud) =>
        normalizarEstado(solicitud.estado) === normalizarEstado(filtros.estado),
    );
  }

  if (filtros.titulo.trim()) {
    resultado = resultado.filter((solicitud) =>
      solicitud.titulo.toLowerCase().includes(filtros.titulo.toLowerCase()),
    );
  }

  if (filtros.fecha) {
    const fechaBuscada = fechaInputAVisual(filtros.fecha);

    resultado = resultado.filter((solicitud) =>
      normalizarFechaVisual(solicitud.fecha).startsWith(fechaBuscada),
    );
  }

  return resultado;
};
