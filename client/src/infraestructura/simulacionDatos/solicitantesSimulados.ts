import type { Solicitante } from '../../dominio/entidades/Solicitante';

export const solicitantesSimulados: Solicitante = {
  nombre: 'Solicitante n°1',
  rut: '12.345.678-9',
  telefono: '+56 9 1234 5678',
  email: 'correo@gmail.com',
  rol: 'Solicitante',
  empresa: {
    nombre: '"Nombre"',
    direccion: 'Dirección',
    comuna: 'Valparaíso',
    region: 'Valparaíso',
    telefono: '+56 xxx xxxx xxxx',
    correo: 'correo@gmail.com',
    sitioWeb: 'www.pagina.com'
  }
};