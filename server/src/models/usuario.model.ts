export type RolUsuario = "ciudadano" | "funcionario";

export interface Usuario {
  id: string;
  nombre: string;
  rut: string;
  email: string;
  passwordHash: string;
  region: string;
  comuna: string;
  rol: RolUsuario;
  createdAt: string;
}

export type UsuarioPublico = Omit<Usuario, "passwordHash">;