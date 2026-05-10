export interface SolicitudMock {
  id: number;
  tipo: string;
  estado: string;
  fechaIngreso: string;
  ultimaActualizacion: string;
}

export const obtenerSolicitudesMock = (): SolicitudMock[] => {
  return [
    {
      id: 1,
      tipo: 'Patente comercial',
      estado: 'Pendiente de documentos',
      fechaIngreso: '2026-04-08',
      ultimaActualizacion: '2026-04-10'
    },
    {
      id: 2,
      tipo: 'Permiso municipal',
      estado: 'En revisión',
      fechaIngreso: '2026-04-12',
      ultimaActualizacion: '2026-04-13'
    }
  ];
};