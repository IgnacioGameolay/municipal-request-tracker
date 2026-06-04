import { apiRequest } from "./apiClient";
import type { RolApi } from "./authApi";

export interface FuncionarioContactoApi {
  id: string;
  nombre: string;
  rut: string;
  email: string;
  region: string;
  comuna: string;
  rol: RolApi;
  createdAt: string;
}

export async function obtenerFuncionariosContacto(): Promise<FuncionarioContactoApi[]> {
  const response = await apiRequest<FuncionarioContactoApi[]>(
    "/usuarios/funcionarios",
  );

  return response.data ?? [];
}


