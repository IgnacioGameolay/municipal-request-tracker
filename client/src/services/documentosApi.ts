import {
  API_URL,
  apiRequest,
  ApiClientError,
  getToken,
} from "./apiClient";

export interface DocumentoSolicitudApi {
  id: string;
  solicitudId: string;
  subidoPorUsuarioId: string;
  nombreOriginal: string;
  nombreAlmacenado: string;
  mimeType: string;
  sizeBytes: number;
  ruta: string;
  createdAt: string;
}

export async function obtenerDocumentosSolicitud(
  solicitudId: string,
): Promise<DocumentoSolicitudApi[]> {
  const response = await apiRequest<DocumentoSolicitudApi[]>(
    `/solicitudes/${solicitudId}/documentos`,
  );

  return response.data ?? [];
}

export async function subirDocumentoSolicitud(
  solicitudId: string,
  archivo: File,
): Promise<DocumentoSolicitudApi> {
  const formData = new FormData();
  formData.append("documento", archivo);

  const response = await apiRequest<DocumentoSolicitudApi>(
    `/solicitudes/${solicitudId}/documentos`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.data) {
    throw new Error("No se pudo subir el documento.");
  }

  return response.data;
}

export async function eliminarDocumentoSolicitud(
  solicitudId: string,
  documentoId: string,
): Promise<void> {
  await apiRequest<{ id: string }>(
    `/solicitudes/${solicitudId}/documentos/${documentoId}`,
    {
      method: "DELETE",
    },
  );
}

export async function descargarDocumentoSolicitud(
  solicitudId: string,
  documentoId: string,
  nombreOriginal: string,
): Promise<void> {
  const token = getToken();

  const response = await fetch(
    `${API_URL}/solicitudes/${solicitudId}/documentos/${documentoId}/descargar`,
    {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
    },
  );

  if (!response.ok) {
    const json = await response.json().catch(() => null);

    throw new ApiClientError(
      response.status,
      json?.message || "No se pudo descargar el documento.",
      json?.errors,
    );
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = nombreOriginal;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(url);
}