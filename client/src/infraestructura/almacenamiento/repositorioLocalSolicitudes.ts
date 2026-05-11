import { Solicitud } from '../../dominio/entidades/Solicitud';
import { solicitudesSimuladas } from '../simulacionDatos/solicitudesSimuladas';
import { CLAVES_ALMACENAMIENTO } from './clavesAlmacenamiento';

export const obtenerSolicitudesGuardadas = (): Solicitud[] => {
  const datos = localStorage.getItem(CLAVES_ALMACENAMIENTO.solicitudes);

  if (!datos) {
    guardarSolicitudes(solicitudesSimuladas);
    return solicitudesSimuladas;
  }

  const solicitudesGuardadas: Solicitud[] = JSON.parse(datos);

  const solicitudesCombinadas = [
    ...solicitudesSimuladas.filter(
      ejemplo => !solicitudesGuardadas.some(
        guardada => guardada.id.toString() === ejemplo.id.toString()
      )
    ),
    ...solicitudesGuardadas
  ];

  guardarSolicitudes(solicitudesCombinadas);

  return solicitudesCombinadas;
};

export const guardarSolicitudes = (solicitudes: Solicitud[]) => {
  localStorage.setItem(
    CLAVES_ALMACENAMIENTO.solicitudes,
    JSON.stringify(solicitudes)
  );
};

export const obtenerSolicitudPorId = (id: string) => {
  return obtenerSolicitudesGuardadas().find(
    solicitud => solicitud.id.toString() === id
  );
};