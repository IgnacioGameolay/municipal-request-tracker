import type { Solicitud } from "../../dominio/entidades/Solicitud";
import { normalizarEstado } from "../../dominio/reglas/normalizarEstado";
import { obtenerMilisegundosFecha } from "../../dominio/reglas/formatearFecha";

export interface FiltrosHistorialFuncionarioDatos {
  id: string;
  tipo: string;
  ordenFecha: string;
  cliente: string;
  estado: string;
  titulo: string;
}

export const filtrarHistorialFuncionario = (
  solicitudes: Solicitud[],
  filtros: FiltrosHistorialFuncionarioDatos,
): Solicitud[] => {
  let resultado = [...solicitudes];

  if (filtros.id.trim()) {
    resultado = resultado.filter((solicitud) =>
      solicitud.id.toString().includes(filtros.id.trim()),
    );
  }

  if (filtros.tipo) {
    resultado = resultado.filter(
      (solicitud) => solicitud.tipo === filtros.tipo,
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

  if (filtros.cliente.trim()) {
    resultado = resultado.filter((solicitud) =>
      (solicitud.cliente || "")
        .toLowerCase()
        .includes(filtros.cliente.toLowerCase()),
    );
  }

  if (filtros.ordenFecha === "recientes") {
    resultado.sort(
      (a, b) =>
        obtenerMilisegundosFecha(b.fecha) - obtenerMilisegundosFecha(a.fecha),
    );
  }

  if (filtros.ordenFecha === "antiguas") {
    resultado.sort(
      (a, b) =>
        obtenerMilisegundosFecha(a.fecha) - obtenerMilisegundosFecha(b.fecha),
    );
  }

  return resultado;
};
