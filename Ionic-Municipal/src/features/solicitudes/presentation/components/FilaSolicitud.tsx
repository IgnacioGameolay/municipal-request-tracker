import React from "react";
import { IonIcon } from "@ionic/react";
import { createOutline, helpOutline, trashOutline } from "ionicons/icons";

import ColorEstado from "../../../../core/presentation/components/common/ColorEstado";
import { Solicitud } from "../../domain/entities/Solicitud";
import { normalizarFechaVisual } from "../../domain/rules/formatearFecha";
import { normalizarEstado } from "../../domain/rules/normalizarEstado";

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
  const estadoNormalizado = normalizarEstado(solicitud.estado);
  const puedeModificar = estadoNormalizado === "pendiente";
  return (
    <tr>
      <td style={estiloCelda}>{solicitud.id}</td>
      <td style={estiloCelda}>{solicitud.tipo || "Sin categoría"}</td>
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
            titulo={puedeModificar ? "Editar" : "Solo se pueden editar solicitudes pendientes"}
            icono={createOutline}
            disabled={!puedeModificar}
            onClick={() => onEditar(solicitud.id)}
          />

          <BotonTabla
            color="#ff3b30"
            titulo={puedeModificar ? "Borrar" : "Solo se pueden eliminar solicitudes pendientes"}
            icono={trashOutline}
            disabled={!puedeModificar}
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
  disabled?: boolean;
}

const BotonTabla: React.FC<PropsBotonTabla> = ({
  color,
  titulo,
  icono,
  onClick,
  disabled = false,
}) => {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      title={titulo}
      aria-disabled={disabled}
      style={{
        backgroundColor: disabled ? "#b8b8b8" : color,
        color: "white",
        width: "26px",
        height: "26px",
        borderRadius: "4px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.55 : 1,
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
