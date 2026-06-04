export const normalizarEstado = (estado: string) => {
  return estado
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
};

export const mostrarEstado = (estado: string) => {
  const estadoNormalizado = normalizarEstado(estado);

  if (estadoNormalizado === "en_revision") return "En revisión";
  if (estadoNormalizado === "en revision") return "En revisión";
  if (estadoNormalizado === "resuelta") return "Resuelta";
  if (estadoNormalizado === "pendiente") return "Pendiente";
  if (estadoNormalizado === "rechazada") return "Rechazada";

  return estado;
};

export const obtenerColorEstado = (estado: string) => {
  const estadoNormalizado = normalizarEstado(estado);

  switch (estadoNormalizado) {
    case "pendiente":
      return { fondo: "#f1c40f", texto: "#ffffff" };

    case "en revision":
      return { fondo: "#00a8e8", texto: "#ffffff" };

    case "resuelta":
      return { fondo: "#22c55e", texto: "#ffffff" };

    case "rechazada":
      return { fondo: "#ff3b30", texto: "#ffffff" };

    default:
      return { fondo: "#8e8e93", texto: "#ffffff" };
  }
};