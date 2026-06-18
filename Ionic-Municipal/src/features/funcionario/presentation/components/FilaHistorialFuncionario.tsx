import React from "react";
import { IonIcon } from "@ionic/react";
import { createOutline } from "ionicons/icons";

import ColorEstado from "../../../../core/presentation/components/common/ColorEstado";
import { Solicitud } from "../../../solicitudes/domain/entities/Solicitud";
import { normalizarFechaVisual } from "../../../solicitudes/domain/rules/formatearFecha";

interface Props {
  solicitud: Solicitud;
  onComentar: (id: Solicitud["id"]) => void;
}

const FilaHistorialFuncionario: React.FC<Props> = ({
  solicitud,
  onComentar,
}) => {
  return (
    <tr style={{ borderBottom: "1px solid #ddd" }}>
      <td style={estiloCelda}>{solicitud.id}</td>
      <td style={estiloCelda}>{solicitud.tipo}</td>
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
          onClick={() => onComentar(solicitud.id)}
          title="Comentar solicitud"
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
          <IonIcon icon={createOutline} />
          Comentar
        </button>
      </td>
    </tr>
  );
};

const estiloCelda = {
  padding: "15px 10px",
  color: "#333",
};

export default FilaHistorialFuncionario;
