import { apiRequest } from "../../../network/apiClient";

export interface DatosTicket {
  solicitudId?: string;
  titulo: string;
  tipo: string;
  comentario: string;
}

export interface TicketSoporteApi {
  id: string;
  solicitudId?: string | null;
  titulo: string;
  tipo: string;
  comentario: string;
  respuestaFuncionario?: string | null;
  estado: string;
  createdAt: string;
  usuario?: {
    nombre: string;
    rut: string;
    email: string;
  };
}

// 1. Crear ticket (Ciudadano)
export const enviarTicketSoporte = async (datos: DatosTicket) => {
  const response = await apiRequest("/tickets", {
    method: "POST",
    body: JSON.stringify(datos),
  });
  return response.data;
};

// 2. Obtener tickets propios (Ciudadano)
export const obtenerMisTickets = async (): Promise<TicketSoporteApi[]> => {
  const response = await apiRequest<TicketSoporteApi[]>("/tickets/mis-tickets", { 
    method: "GET" 
  });
  return response.data || [];
};

// 3. Obtener todos los tickets (Funcionario)
export const obtenerTodosLosTickets = async (): Promise<TicketSoporteApi[]> => {
  const response = await apiRequest<TicketSoporteApi[]>("/tickets", { 
    method: "GET" 
  });
  return response.data || [];
};

// 4. Responder ticket (Funcionario)
export const responderTicketSoporte = async (id: string, respuesta: string) => {
  const response = await apiRequest(`/tickets/${id}/responder`, {
    method: "PATCH",
    body: JSON.stringify({ respuesta }),
  });
  return response.data;
};