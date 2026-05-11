import React from "react";
import {
  mostrarEstado,
  obtenerColorEstado,
} from "../../dominio/reglas/normalizarEstado";

interface Props {
  estado: string;
}

const ColorEstado: React.FC<Props> = ({ estado }) => {
  const colores = obtenerColorEstado(estado);

  return (
    <span
      style={{
        backgroundColor: colores.fondo,
        color: colores.texto,
        padding: "5px 16px",
        borderRadius: "20px",
        fontWeight: "bold",
        fontSize: "0.8rem",
        display: "inline-block",
        minWidth: "85px",
        textAlign: "center",
      }}
    >
      {mostrarEstado(estado)}
    </span>
  );
};

export default ColorEstado;
