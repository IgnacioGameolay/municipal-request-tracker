import { Solicitud } from '../../dominio/entidades/Solicitud';
import { formatearFechaActual } from '../../dominio/reglas/formatearFecha';
import {
  obtenerSolicitudesGuardadas,
  guardarSolicitudes
} from '../../infraestructura/almacenamiento/repositorioLocalSolicitudes';

interface DatosActualizacion {
  id: string;
  estadoNuevo: string;
  comentario?: string;
}

export const actualizarEstadoSolicitud = ({
  id,
  estadoNuevo,
  comentario
}: DatosActualizacion): Solicitud | null => {
  const solicitudes = obtenerSolicitudesGuardadas();

  const index = solicitudes.findIndex(
    solicitud => solicitud.id.toString() === id
  );

  if (index === -1) {
    return null;
  }

  const solicitudActual = solicitudes[index];

  const funcionarioResponsable = (solicitudActual.encargado === 'Por asignar') ? 'Funcionario Municipal' : solicitudActual.encargado;

  const fechaRevision = formatearFechaActual();

  const solicitudActualizada: Solicitud = {
    ...solicitudActual,
    estado: estadoNuevo,
    encargado: funcionarioResponsable,
    ultimaRevision: fechaRevision,
    historialRevisiones: [
      ...(solicitudActual.historialRevisiones || []),
      {
        funcionario: funcionarioResponsable,
        estadoNuevo,
        fechaRevision
      }
    ]
  };

  if (comentario && comentario.trim() !== '') {
    const textoComentario =
      `[Comentario del Funcionario - ${fechaRevision}]: ${comentario.trim()}`;

    solicitudActualizada.comentariosFuncionario =
      solicitudActualizada.comentariosFuncionario
        ? `${solicitudActualizada.comentariosFuncionario}\n\n${textoComentario}`
        : textoComentario;
  }

  solicitudes[index] = solicitudActualizada;
  guardarSolicitudes(solicitudes);

  return solicitudActualizada;
};