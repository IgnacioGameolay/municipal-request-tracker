import { Notificacion } from "../../dominio/entidades/Notificacion";
import { Solicitud, SolicitudId } from "../../dominio/entidades/Solicitud";
import { HistorialRevision } from "../../dominio/entidades/HistorialRevision";
import {
  obtenerSolicitudesGuardadas,
  guardarSolicitudes,
} from "../../infraestructura/almacenamiento/repositorioLocalSolicitudes";

const textoSeguro = (valor: string | undefined, respaldo: string): string => {
  return valor && valor.trim() ? valor : respaldo;
};

const idSeguro = (
  notificacion: Notificacion,
): SolicitudId | null => {
  return notificacion.idSolicitud ?? notificacion.solicitudId ?? null;
};

export const prepararSolicitudNotificacion = (
  notificacion: Notificacion,
): void => {
  const idSolicitud = idSeguro(notificacion);

  if (idSolicitud === null) {
    return;
  }

  const solicitudes = obtenerSolicitudesGuardadas();

  const index = solicitudes.findIndex(
    (solicitud) => solicitud.id.toString() === idSolicitud.toString(),
  );

  const nuevaRevision: HistorialRevision = {
    funcionario: textoSeguro(notificacion.funcionario, "Funcionario municipal"),
    estadoNuevo: textoSeguro(notificacion.estadoSolicitud, "Pendiente"),
    fechaRevision: textoSeguro(
      notificacion.fecha,
      notificacion.createdAt || new Date().toISOString(),
    ),
  };

  const comentarioDetalle = textoSeguro(
    notificacion.comentarioDetalle,
    notificacion.mensaje || "Actualización de solicitud.",
  );

  if (index !== -1) {
    const solicitudExistente = solicitudes[index];

    const comentarioYaExiste =
      solicitudExistente.comentariosFuncionario?.includes(comentarioDetalle) ||
      false;

    const historialYaExiste =
      solicitudExistente.historialRevisiones?.some(
        (revision) =>
          revision.funcionario === nuevaRevision.funcionario &&
          revision.estadoNuevo === nuevaRevision.estadoNuevo &&
          revision.fechaRevision === nuevaRevision.fechaRevision,
      ) || false;

    solicitudes[index] = {
      ...solicitudExistente,
      titulo: solicitudExistente.titulo || textoSeguro(notificacion.tituloSolicitud, notificacion.titulo || "Solicitud municipal"),
      encargado: nuevaRevision.funcionario,
      estado: nuevaRevision.estadoNuevo,
      ultimaRevision: nuevaRevision.fechaRevision,
      comentariosFuncionario: comentarioYaExiste
        ? solicitudExistente.comentariosFuncionario
        : `${solicitudExistente.comentariosFuncionario || ""}${solicitudExistente.comentariosFuncionario ? "\n\n" : ""}${comentarioDetalle}`,
      historialRevisiones: historialYaExiste
        ? solicitudExistente.historialRevisiones
        : [...(solicitudExistente.historialRevisiones || []), nuevaRevision],
    };

    guardarSolicitudes(solicitudes);
    return;
  }

  const nuevaSolicitud: Solicitud = {
    id: idSolicitud,
    titulo: textoSeguro(notificacion.tituloSolicitud, notificacion.titulo || "Solicitud municipal"),
    encargado: nuevaRevision.funcionario,
    fecha: nuevaRevision.fechaRevision,
    ultimaRevision: nuevaRevision.fechaRevision,
    estado: nuevaRevision.estadoNuevo,
    tipo: "Tipo 1",
    descripcion: textoSeguro(notificacion.textoPrincipal, notificacion.mensaje || "Sin descripción"),
    comentariosFuncionario: comentarioDetalle,
    historialRevisiones: [nuevaRevision],
  };

  guardarSolicitudes([...solicitudes, nuevaSolicitud]);
};