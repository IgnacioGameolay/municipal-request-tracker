import React from "react";

import { Solicitud } from "../../dominio/entidades/Solicitud";
import FilaSolicitud from "./FilaSolicitud";

interface Props {
  solicitudes: Solicitud[];
  onEditar: (id: Solicitud["id"]) => void;
  onDetalle: (id: Solicitud["id"]) => void;
  onEliminar: (id: Solicitud["id"]) => void;
}

const TablaSolicitudes: React.FC<Props> = ({
  solicitudes,
  onEditar,
  onDetalle,
  onEliminar,
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
        padding: "16px 24px",
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
          <tr style={{ color: "#000" }}>
            <th style={estiloCabecera}>Nro. Solicitud</th>
            <th style={estiloCabecera}>Tipo solicitud</th>
            <th style={estiloCabecera}>Título solicitud</th>
            <th style={estiloCabecera}>
              Ult. Encargado de
              <br />
              revisión
            </th>
            <th style={estiloCabecera}>Fecha de la solicitud</th>
            <th style={estiloCabecera}>Estado</th>
            <th style={estiloCabecera}>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {solicitudes.map((solicitud) => (
            <FilaSolicitud
              key={solicitud.id}
              solicitud={solicitud}
              onEditar={onEditar}
              onDetalle={onDetalle}
              onEliminar={onEliminar}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const estiloCabecera = {
  padding: "13px 10px",
  fontWeight: "bold",
};

export default TablaSolicitudes;
