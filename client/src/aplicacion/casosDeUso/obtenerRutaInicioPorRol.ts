export type RolSesion = 'solicitante' | 'funcionario';

export const obtenerRutaInicioPorRol = (rol: RolSesion): string => {
  if (rol === 'funcionario') {
    return '/funcionario/tramites';
  }

  return '/ciudadano/tramites';
};