import { apiRequest } from "./apiClient";

export interface TramiteMunicipalApi {
  id: string;
  tipo: string;
  documentos: string[];
  tiempoEstimado: string;
  areaResponsable: string;
}

export async function obtenerTramitesMunicipales(): Promise<TramiteMunicipalApi[]> {
  const response = await apiRequest<TramiteMunicipalApi[]>("/tramites");

  return response.data ?? [];
}