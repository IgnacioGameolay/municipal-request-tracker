import { Solicitud } from '../../dominio/entidades/Solicitud';
import {
  obtenerSolicitudesGuardadas,
  guardarSolicitudes
} from '../../infraestructura/almacenamiento/repositorioLocalSolicitudes';

export const eliminarSolicitud = (idSolicitud: number): Solicitud[] => {
  const solicitudes = obtenerSolicitudesGuardadas();

  const solicitudesActualizadas = solicitudes.filter(
    solicitud => solicitud.id !== idSolicitud
  );

  guardarSolicitudes(solicitudesActualizadas);

  return solicitudesActualizadas;
};