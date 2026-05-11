export const normalizarEstado = (estado: string) => {
  return estado
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
};

export const mostrarEstado = (estado: string) => {
  const estadoNormalizado = normalizarEstado(estado);

  if (estadoNormalizado === "en proceso") return "En revisión";
  if (estadoNormalizado === "aceptada") return "Aprobada";

  return estado;
};

export const obtenerColorEstado = (estado: string) => {
  const estadoNormalizado = normalizarEstado(estado);

  switch (estadoNormalizado) {
    case "recibido":
      return { fondo: "#8e8e93", texto: "#ffffff" };

    case "aprobada":
    case "aceptada":
      return { fondo: "#22c55e", texto: "#ffffff" };

    case "rechazada":
    case "anulada":
      return { fondo: "#ff3b30", texto: "#ffffff" };

    case "pendiente":
    case "observado":
      return { fondo: "#f1c40f", texto: "#ffffff" };

    case "en revision":
    case "en proceso":
      return { fondo: "#00a8e8", texto: "#ffffff" };

    default:
      return { fondo: "#8e8e93", texto: "#ffffff" };
  }
};
