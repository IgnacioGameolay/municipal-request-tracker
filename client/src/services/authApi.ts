import { apiRequest, removeToken, setToken } from "./apiClient";

export type RolBackend = "ciudadano" | "funcionario";
export type RolFrontend = "solicitante" | "funcionario";

export interface UsuarioApi {
  id: string;
  nombre: string;
  rut: string;
  email: string;
  region: string;
  comuna: string;
  rol: RolBackend;
  createdAt: string;
}

export interface LoginResponse {
  user: UsuarioApi;
  token: string;
}

export interface RegisterData {
  nombre: string;
  rut: string;
  email: string;
  password: string;
  region: string;
  comuna: string;
  rol?: RolBackend;
}

function mapRolToFrontend(rol: RolBackend): RolFrontend {
  return rol === "ciudadano" ? "solicitante" : "funcionario";
}

function saveSession(data: LoginResponse) {
  setToken(data.token);

  localStorage.setItem("usuario_actual", JSON.stringify(data.user));
  localStorage.setItem("rol_actual", mapRolToFrontend(data.user.rol));
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    auth: false,
    body: JSON.stringify({ email, password })
  });

  if (!response.data) {
    throw new Error("La API no devolvió datos de sesión");
  }

  saveSession(response.data);
  return response.data;
}

export async function register(data: RegisterData): Promise<LoginResponse> {
  const response = await apiRequest<LoginResponse>("/auth/register", {
    method: "POST",
    auth: false,
    body: JSON.stringify(data)
  });

  if (!response.data) {
    throw new Error("La API no devolvió datos de registro");
  }

  saveSession(response.data);
  return response.data;
}

export async function me(): Promise<UsuarioApi> {
  const response = await apiRequest<UsuarioApi>("/auth/me");

  if (!response.data) {
    throw new Error("No se pudo obtener el usuario autenticado");
  }

  return response.data;
}

export function logout() {
  removeToken();
  localStorage.removeItem("usuario_actual");
  localStorage.removeItem("rol_actual");
}