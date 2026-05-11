import { Role } from "../context/AuthContext";

export const guardarRolSesion = (role: Role) => {
  localStorage.setItem("rol_actual", role);
};

export const obtenerRolSesion = (): Role | null => {
  const role = localStorage.getItem("rol_actual");

  if (role === "solicitante" || role === "funcionario") {
    return role;
  }

  return null;
};

export const cerrarSesion = () => {
  localStorage.removeItem("rol_actual");
};
