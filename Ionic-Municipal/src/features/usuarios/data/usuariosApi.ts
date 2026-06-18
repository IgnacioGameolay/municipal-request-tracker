import { apiRequest } from "../../../network/apiClient";
import type { RolApi } from "../../auth/data/authApi";

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


