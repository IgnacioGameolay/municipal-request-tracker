import React from "react";

import { Solicitud } from "../../dominio/entidades/Solicitud";
import FilaBandejaFuncionario from "./FilaBandejaFuncionario";

interface Props {
  solicitudes: Solicitud[];
  onRevisar: (id: Solicitud["id"]) => void;
}

const TablaBandejaFuncionario: React.FC<Props> = ({
  solicitudes,
  onRevisar,
}) => {
  if (solicitudes.length === 0) {
    return (
      <div
        style={{
          backgroundColor: "#f4f5f8",
          borderRadius: "8px",
          height: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #e0e0e0",
        }}
      >
        <p
          style={{
            fontWeight: "bold",
            color: "#000",
            textAlign: "center",
            margin: 0,
            fontSize: "1rem",
          }}
        >
          No hay datos que
          <br />
          mostrar
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#f4f5f8",
        borderRadius: "8px",
        border: "1px solid #e0e0e0",
        padding: "20px",
        overflowX: "auto",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
          fontSize: "0.9rem",
        }}
      >
        <thead>
          <tr
            style={{
              borderBottom: "2px solid #ddd",
              color: "#000",
            }}
          >
            <th style={estiloCabecera}>Nro. Solicitud</th>
            <th style={estiloCabecera}>Título solicitud</th>
            <th style={estiloCabecera}>Encargado de revisión</th>
            <th style={estiloCabecera}>Fecha de solicitud</th>
            <th style={estiloCabecera}>Estado</th>
            <th style={estiloCabecera}>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {solicitudes.map((solicitud) => (
            <FilaBandejaFuncionario
              key={solicitud.id}
              solicitud={solicitud}
              onRevisar={onRevisar}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const estiloCabecera = {
  padding: "15px 10px",
};

export default TablaBandejaFuncionario;
