import { apiRequest, clearStoredSession } from "./apiClient";
import { Role } from "../context/AuthContext";

export type RolApi = "ciudadano" | "funcionario";

export interface UsuarioApi {
  id: string;
  nombre: string;
  rut: string;
  email: string;
  region: string;
  comuna: string;
  rol: RolApi;
  createdAt: string;
}

export interface AuthSession {
  user: UsuarioApi;
  token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  nombre: string;
  rut: string;
  email: string;
  password: string;
  region: string;
  comuna: string;
}

const TOKEN_KEY = "auth_token";
const USER_KEY = "usuario_actual";
const ROLE_KEY = "rol_actual";

export function rolApiToFrontend(rol: RolApi): Role {
  return rol === "funcionario" ? "funcionario" : "solicitante";
}

export function rolFrontendToApi(rol: Role): RolApi {
  return rol === "funcionario" ? "funcionario" : "ciudadano";
}

export function guardarSesion(session: AuthSession) {
  localStorage.setItem(TOKEN_KEY, session.token);
  localStorage.setItem(USER_KEY, JSON.stringify(session.user));
  localStorage.setItem(ROLE_KEY, rolApiToFrontend(session.user.rol));

  // Sincroniza layout, menú y rutas dependientes del rol.
  window.dispatchEvent(new Event("rolCambiado"));
}

export function obtenerUsuarioSesion(): UsuarioApi | null {
  const rawUser = localStorage.getItem(USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as UsuarioApi;
  } catch {
    clearStoredSession();
    return null;
  }
}

export function obtenerTokenSesion(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function cerrarSesionApi() {
  clearStoredSession();
}

export async function loginApi(payload: LoginPayload): Promise<AuthSession> {
  const response = await apiRequest<AuthSession>("/auth/login", {
    method: "POST",
    auth: false,
    body: JSON.stringify(payload),
  });

  if (!response.data) {
    throw new Error("No se pudo iniciar sesión");
  }

  return response.data;
}

export async function registerApi(
  payload: RegisterPayload
): Promise<AuthSession> {
  const response = await apiRequest<AuthSession>("/auth/register", {
    method: "POST",
    auth: false,
    body: JSON.stringify(payload),
  });

  if (!response.data) {
    throw new Error("No se pudo registrar el usuario");
  }

  return response.data;
}

export async function meApi(): Promise<UsuarioApi> {
  const response = await apiRequest<UsuarioApi>("/auth/me");

  if (!response.data) {
    throw new Error("No se pudo validar la sesión");
  }

  return response.data;
}

// Nombres antiguos que tus páginas ya estaban usando.
export const login = loginApi;
export const register = registerApi;
export const logout = cerrarSesionApi;