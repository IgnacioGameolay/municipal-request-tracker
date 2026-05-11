import { Solicitud } from '../../dominio/entidades/Solicitud';
import { formatearFechaActual } from '../../dominio/reglas/formatearFecha';
import {
  obtenerSolicitudesGuardadas,
  guardarSolicitudes
} from '../../infraestructura/almacenamiento/repositorioLocalSolicitudes';

interface DatosEditarSolicitud {
  id: string;
  descripcionOriginal: string;
  descripcionAgregada: string;
}

export const editarSolicitud = ({
  id,
  descripcionOriginal,
  descripcionAgregada
}: DatosEditarSolicitud): Solicitud | null => {
  const solicitudes = obtenerSolicitudesGuardadas();

  const index = solicitudes.findIndex(
    solicitud => solicitud.id.toString() === id
  );

  if (index === -1) {
    return null;
  }

  const fechaEdicion = formatearFechaActual();

  const descripcionActualizada =
    `${descripcionOriginal}\n\n[Agregado el ${fechaEdicion}]: ${descripcionAgregada.trim()}`;

  const solicitudActualizada: Solicitud = {
    ...solicitudes[index],
    descripcion: descripcionActualizada
  };

  solicitudes[index] = solicitudActualizada;
  guardarSolicitudes(solicitudes);

  return solicitudActualizada;
};