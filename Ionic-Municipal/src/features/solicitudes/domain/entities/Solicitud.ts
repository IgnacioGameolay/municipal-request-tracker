import { HistorialRevision } from "./HistorialRevision";

export type SolicitudId = string | number;

export interface Solicitud {
  id: SolicitudId;
  titulo: string;
  encargado: string;
  fecha: string;
  estado: string;
  tipo?: string;
  cliente?: string;
  descripcion?: string;
  descripcionAgregada?: string;
  comentariosFuncionario?: string;
  ultimaRevision?: string;
  historialRevisiones?: HistorialRevision[];
}