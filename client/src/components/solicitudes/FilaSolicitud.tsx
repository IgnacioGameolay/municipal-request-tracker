import React from "react";
import { IonIcon } from "@ionic/react";
import { createOutline, helpOutline, trashOutline } from "ionicons/icons";

import ColorEstado from "../common/ColorEstado";
import { Solicitud } from "../../dominio/entidades/Solicitud";
import { normalizarFechaVisual } from "../../dominio/reglas/formatearFecha";
interface Props {
  solicitud: Solicitud;
  onEditar: (id: Solicitud["id"]) => void;
  onDetalle: (id: Solicitud["id"]) => void;
  onEliminar: (id: Solicitud["id"]) => void;
}

const FilaSolicitud: React.FC<Props> = ({
  solicitud,
  onEditar,
  onDetalle,
  onEliminar,
}) => {
  return (
    <tr>
      <td style={estiloCelda}>{solicitud.id}</td>
      <td style={estiloCelda}>{solicitud.tipo || "Tipo 1"}</td>
      <td style={estiloCelda}>{solicitud.titulo}</td>
      <td style={estiloCelda}>{solicitud.encargado}</td>
      <td style={estiloCelda}>{normalizarFechaVisual(solicitud.fecha)}</td>

      <td style={{ padding: "13px 10px" }}>
        <ColorEstado estado={solicitud.estado} />
      </td>

      <td style={{ padding: "13px 10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <BotonTabla
            color="#0088ff"
            titulo="Editar"
            icono={createOutline}
            onClick={() => onEditar(solicitud.id)}
          />

          <BotonTabla
            color="#ff3b30"
            titulo="Borrar"
            icono={trashOutline}
            onClick={() => onEliminar(solicitud.id)}
          />

          <BotonTabla
            color="#ffcc00"
            titulo="Estado"
            icono={helpOutline}
            onClick={() => onDetalle(solicitud.id)}
          />
        </div>
      </td>
    </tr>
  );
};

interface PropsBotonTabla {
  color: string;
  titulo: string;
  icono: string;
  onClick: () => void;
}

const BotonTabla: React.FC<PropsBotonTabla> = ({
  color,
  titulo,
  icono,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      title={titulo}
      style={{
        backgroundColor: color,
        color: "white",
        width: "26px",
        height: "26px",
        borderRadius: "4px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <IonIcon icon={icono} />
    </div>
  );
};

const estiloCelda = {
  padding: "13px 10px",
  color: "#111",
};

export default FilaSolicitud;
