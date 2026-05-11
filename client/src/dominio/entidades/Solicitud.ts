import { HistorialRevision } from './HistorialRevision';

export interface Solicitud {
  id: number;
  titulo: string;
  encargado: string;
  fecha: string;
  estado: string;
  tipo?: string;
  descripcion?: string;
  descripcionAgregada?: string;
  comentariosFuncionario?: string;
  ultimaRevision?: string;
  historialRevisiones?: HistorialRevision[];
}