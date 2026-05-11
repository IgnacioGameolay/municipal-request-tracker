import { Notificacion } from "../../dominio/entidades/Notificacion";
import { Solicitud } from "../../dominio/entidades/Solicitud";
import {
  obtenerSolicitudesGuardadas,
  guardarSolicitudes,
} from "../../infraestructura/almacenamiento/repositorioLocalSolicitudes";

export const prepararSolicitudNotificacion = (
  notificacion: Notificacion,
): void => {
  const solicitudes = obtenerSolicitudesGuardadas();

  const index = solicitudes.findIndex(
    (solicitud) =>
      solicitud.id.toString() === notificacion.idSolicitud.toString(),
  );

  const nuevaRevision = {
    funcionario: notificacion.funcionario,
    estadoNuevo: notificacion.estadoSolicitud,
    fechaRevision: notificacion.fecha,
  };

  if (index !== -1) {
    const solicitudExistente = solicitudes[index];

    const comentarioYaExiste =
      solicitudExistente.comentariosFuncionario?.includes(
        notificacion.comentarioDetalle,
      ) || false;

    const historialYaExiste =
      solicitudExistente.historialRevisiones?.some(
        (revision) =>
          revision.funcionario === nuevaRevision.funcionario &&
          revision.estadoNuevo === nuevaRevision.estadoNuevo &&
          revision.fechaRevision === nuevaRevision.fechaRevision,
      ) || false;

    solicitudes[index] = {
      ...solicitudExistente,
      titulo: solicitudExistente.titulo || notificacion.tituloSolicitud,
      encargado: notificacion.funcionario,
      estado: notificacion.estadoSolicitud,
      ultimaRevision: notificacion.fecha,
      comentariosFuncionario: comentarioYaExiste
        ? solicitudExistente.comentariosFuncionario
        : `${solicitudExistente.comentariosFuncionario || ""}${solicitudExistente.comentariosFuncionario ? "\n\n" : ""}${notificacion.comentarioDetalle}`,
      historialRevisiones: historialYaExiste
        ? solicitudExistente.historialRevisiones
        : [...(solicitudExistente.historialRevisiones || []), nuevaRevision],
    };

    guardarSolicitudes(solicitudes);
    return;
  }

  const nuevaSolicitud: Solicitud = {
    id: notificacion.idSolicitud,
    titulo: notificacion.tituloSolicitud,
    encargado: notificacion.funcionario,
    fecha: notificacion.fecha,
    ultimaRevision: notificacion.fecha,
    estado: notificacion.estadoSolicitud,
    tipo: "Tipo 1",
    descripcion: "Sin descripción",
    comentariosFuncionario: notificacion.comentarioDetalle,
    historialRevisiones: [nuevaRevision],
  };

  guardarSolicitudes([...solicitudes, nuevaSolicitud]);
};
