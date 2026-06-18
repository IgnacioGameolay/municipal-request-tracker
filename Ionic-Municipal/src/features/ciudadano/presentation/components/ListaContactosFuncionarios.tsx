import React from "react";

import type { ContactoFuncionario } from "../../../funcionario/domain/entities/ContactoFuncionario";
import TarjetaContactoFuncionario from "./TarjetaContactoFuncionario";

interface Props {
  funcionarios: ContactoFuncionario[];
}

const ListaContactosFuncionarios: React.FC<Props> = ({ funcionarios }) => {
  if (funcionarios.length === 0) {
    return (
      <div
        style={{
          backgroundColor: "#eeeeee",
          borderRadius: "8px",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <p style={{ margin: 0, color: "#333", fontWeight: "bold" }}>
          No hay contactos disponibles.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "25px",
      }}
    >
      {funcionarios.map((funcionario) => (
        <TarjetaContactoFuncionario
          key={funcionario.id}
          funcionario={funcionario}
        />
      ))}
    </div>
  );
};

export default ListaContactosFuncionarios;
