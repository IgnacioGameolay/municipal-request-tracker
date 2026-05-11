export interface Notificacion {
  id: number;
  idSolicitud: number;
  tituloSolicitud: string;
  textoPrincipal: string;
  funcionario: string;
  textoSecundario: string;
  fecha: string;
  estadoSolicitud: string;
  comentarioDetalle: string;
}