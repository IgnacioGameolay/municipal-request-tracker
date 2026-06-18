export interface EmpresaSolicitante {
  nombre: string;
  direccion: string;
  comuna: string;
  region: string;
  telefono: string;
  correo: string;
  sitioWeb: string;
}

export interface Solicitante {
  nombre: string;
  rut: string;
  telefono: string;
  email: string;
  rol: string;
  empresa: EmpresaSolicitante;
}
