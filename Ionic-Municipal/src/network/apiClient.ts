export interface ApiResponse<T> {
  ok: boolean;
  message: string;
  data?: T;
  errors?: Array<{
    field?: string;
    code: string;
    message?: string;
  }>;
}

export class ApiClientError extends Error {
  status: number;
  errors?: ApiResponse<unknown>["errors"];

  constructor(
    status: number,
    message: string,
    errors?: ApiResponse<unknown>["errors"]
  ) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.errors = errors;
  }
}

// Alias por compatibilidad si en algún archivo quedó ApiError.
export const ApiError = ApiClientError;

export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const TOKEN_KEY = "auth_token";
const USER_KEY = "usuario_actual";
const ROLE_KEY = "rol_actual";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearStoredSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(ROLE_KEY);
  window.dispatchEvent(new Event("rolCambiado"));
}

function handleUnauthorized() {
  clearStoredSession();

  // Avisamos a la app que la sesión expiró o el token ya no es válido.
  window.dispatchEvent(new Event("sesionExpirada"));
}

interface ApiRequestOptions extends RequestInit {
  auth?: boolean;
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  const { auth = true, headers, body, ...rest } = options;
  const token = getToken();
  const isFormData = body instanceof FormData;

  const finalHeaders: HeadersInit = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
    ...(headers || {}),
  };

  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...rest,
      headers: finalHeaders,
      body,
    });
  } catch {
    throw new ApiClientError(
      0,
      "No se pudo conectar con el servidor. Revisa que el backend esté ejecutándose."
    );
  }

  const contentType = response.headers.get("content-type") || "";

  const payload: ApiResponse<T> = contentType.includes("application/json")
    ? await response.json()
    : {
        ok: response.ok,
        message: response.ok ? "Operación realizada correctamente" : "Error al consumir la API",
      };

  if (!response.ok) {
    if (response.status === 401) {
      handleUnauthorized();
    }

    throw new ApiClientError(
      response.status,
      payload.message || "Error al consumir la API",
      payload.errors
    );
  }

  return payload;
}

export async function apiDownload(path: string): Promise<Blob> {
  const token = getToken();

  const response = await fetch(`${API_URL}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!response.ok) {
    if (response.status === 401) {
      handleUnauthorized();
    }

    throw new ApiClientError(response.status, "No se pudo descargar el archivo");
  }

  return response.blob();
}