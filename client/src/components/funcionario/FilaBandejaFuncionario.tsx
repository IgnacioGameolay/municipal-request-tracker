import React from "react";
import { IonIcon } from "@ionic/react";
import { eyeOutline } from "ionicons/icons";

import ColorEstado from "../common/ColorEstado";
import { Solicitud } from "../../dominio/entidades/Solicitud";
import { normalizarFechaVisual } from "../../dominio/reglas/formatearFecha";

interface Props {
  solicitud: Solicitud;
  onRevisar: (id: Solicitud["id"]) => void;
}

const FilaBandejaFuncionario: React.FC<Props> = ({ solicitud, onRevisar }) => {
  return (
    <tr style={{ borderBottom: "1px solid #ddd" }}>
      <td style={estiloCelda}>{solicitud.id}</td>
      <td style={estiloCelda}>{solicitud.titulo}</td>
      <td style={estiloCelda}>{solicitud.encargado}</td>
      <td style={estiloCelda}>{normalizarFechaVisual(solicitud.fecha)}</td>

      <td style={{ padding: "15px 10px" }}>
        <ColorEstado estado={solicitud.estado} />
      </td>

      <td
        style={{
          padding: "15px 10px",
          display: "flex",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <button
          onClick={() => onRevisar(solicitud.id)}
          title="Revisar solicitud"
          style={{
            backgroundColor: "#0088ff",
            color: "white",
            padding: "5px 15px",
            borderRadius: "4px",
            border: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            fontWeight: "bold",
            gap: "5px",
          }}
        >
          <IonIcon icon={eyeOutline} />
          Revisar
        </button>
      </td>
    </tr>
  );
};

const estiloCelda = {
  padding: "15px 10px",
  color: "#333",
};

export default FilaBandejaFuncionario;
