import { Notificacion } from '../../dominio/entidades/Notificacion';

export const notificacionesSimuladas: Notificacion[] = [
  {
    id: 1,
    idSolicitud: 45,
    tituloSolicitud: 'Solicitud n°45',
    textoPrincipal: 'Tu solicitud "Solicitud n°45" ha sido anulada por ',
    funcionario: 'Funcionario n°2',
    textoSecundario: '',
    fecha: '08-04-2026 11:43 pm',
    estadoSolicitud: 'Anulada',
    comentarioDetalle:
      '[Funcionario n°2 - 08-04-2026 11:43 pm]\n\nLa solicitud fue anulada debido a que no se completó la corrección dentro del plazo indicado.'
  },
  {
    id: 2,
    idSolicitud: 6,
    tituloSolicitud: 'Solicitud n°6',
    textoPrincipal: 'Tu solicitud "Solicitud n°6" cambió de estado a PENDIENTE por ',
    funcionario: 'Funcionario n°2',
    textoSecundario: '',
    fecha: '09-04-2026 12:43 pm',
    estadoSolicitud: 'Pendiente',
    comentarioDetalle:
      '[Funcionario n°2 - 09-04-2026 12:43 pm]\n\nFalta documentación, específicamente:\n\nDocumento n°1\nDocumento n°2\nCédula de identidad'
  },
  {
    id: 3,
    idSolicitud: 87,
    tituloSolicitud: 'Solicitud n°87',
    textoPrincipal: 'Tu solicitud "Solicitud n°87" fue ACEPTADA por ',
    funcionario: 'Funcionario n°3',
    textoSecundario: '',
    fecha: '09-04-2026 12:43 pm',
    estadoSolicitud: 'Aprobada',
    comentarioDetalle:
      '[Funcionario n°3 - 09-04-2026 12:43 pm]\n\nLa solicitud fue revisada y aprobada correctamente.'
  },
  {
    id: 4,
    idSolicitud: 1,
    tituloSolicitud: 'Solicitud inicial',
    textoPrincipal: 'Tu solicitud "Solicitud inicial" fue vista por ',
    funcionario: 'Funcionario n°1',
    textoSecundario: ' y cambió a su estado a EN PROCESO',
    fecha: '08-04-2026 11:43 pm',
    estadoSolicitud: 'En revisión',
    comentarioDetalle:
      '[Funcionario n°1 - 08-04-2026 11:43 pm]\n\nLa solicitud fue revisada y actualmente se encuentra en revisión.'
  }
];