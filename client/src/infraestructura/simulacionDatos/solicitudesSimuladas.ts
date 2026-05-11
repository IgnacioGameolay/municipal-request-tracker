import { Solicitud } from '../../dominio/entidades/Solicitud';

export const solicitudesSimuladas: Solicitud[] = [
  {
    id: 1,
    tipo: 'Tipo 1',
    titulo: 'Solicitud inicial',
    encargado: 'Funcionario n°1',
    fecha: '08-04-2026 11:43 pm',
    estado: 'En revisión',
    descripcion: 'Solicitud inicial registrada en el sistema.',
    ultimaRevision: '08-04-2026 11:43 pm'
  },
  {
    id: 6,
    tipo: 'Tipo 1',
    titulo: 'Solicitud n°6',
    encargado: 'Funcionario n°2',
    fecha: '09-04-2026 12:43 pm',
    estado: 'Pendiente',
    descripcion: 'Solicitud pendiente por documentación incompleta.',
    ultimaRevision: '09-04-2026 12:43 pm'
  },
  {
    id: 45,
    tipo: 'Tipo 1',
    titulo: 'Solicitud n°45',
    encargado: 'Funcionario n°2',
    fecha: '08-04-2026 11:43 pm',
    estado: 'Anulada',
    descripcion: 'Solicitud anulada por falta de corrección.',
    ultimaRevision: '08-04-2026 11:43 pm'
  },
  {
    id: 87,
    tipo: 'Tipo 1',
    titulo: 'Solicitud n°87',
    encargado: 'Funcionario n°3',
    fecha: '09-04-2026 12:43 pm',
    estado: 'Aprobada',
    descripcion: 'Solicitud aprobada correctamente.',
    ultimaRevision: '09-04-2026 12:43 pm'
  }
];