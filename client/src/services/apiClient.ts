export interface ApiErrorItem {
  field?: string;
  code: string;
  message?: string;
}

export interface ApiResponse<T> {
  ok: boolean;
  message: string;
  data?: T;
  errors?: ApiErrorItem[];
}

export class ApiClientError extends Error {
  status: number;
  errors?: ApiErrorItem[];

  constructor(message: string, status: number, errors?: ApiErrorItem[]) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.errors = errors;
  }
}

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export function getToken(): string | null {
  return localStorage.getItem("auth_token");
}

export function setToken(token: string): void {
  localStorage.setItem("auth_token", token);
}

export function removeToken(): void {
  localStorage.removeItem("auth_token");
}

interface ApiRequestOptions extends RequestInit {
  auth?: boolean;
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  const token = getToken();

  const headers = new Headers(options.headers);

  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (options.auth !== false && token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });

  const json = (await response.json().catch(() => null)) as ApiResponse<T> | null;

  if (!json) {
    throw new ApiClientError(
      "El servidor no respondió con JSON válido",
      response.status
    );
  }

  if (!response.ok || !json.ok) {
    throw new ApiClientError(
      json.message || "Error en la solicitud",
      response.status,
      json.errors
    );
  }

  return json;
}