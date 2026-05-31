import React from "react";
import { IonIcon } from "@ionic/react";
import { helpOutline } from "ionicons/icons";

import { Notificacion } from "../../dominio/entidades/Notificacion";

// Función auxiliar para formatear la fecha que viene de la base de datos
function formatearFechaCorto(fechaIso: string): string {
  const fecha = new Date(fechaIso);
  if (Number.isNaN(fecha.getTime())) return fechaIso;
  
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const anio = fecha.getFullYear();
  let hora = fecha.getHours();
  const minutos = String(fecha.getMinutes()).padStart(2, "0");
  const periodo = hora >= 12 ? "pm" : "am";
  
  hora = hora % 12;
  hora = hora === 0 ? 12 : hora;
  
  return `${dia}-${mes}-${anio} ${String(hora).padStart(2, "0")}:${minutos} ${periodo}`;
}

interface Props {
  notificacion: Notificacion;
  onVerDetalle: (notificacion: Notificacion) => void;
}

const ItemNotificacion: React.FC<Props> = ({ notificacion, onVerDetalle }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto auto",
        alignItems: "center",
        gap: "20px",
        backgroundColor: "#f4f5f8",
        borderRadius: "8px",
        padding: "18px 25px",
        border: "1px solid #eee",
      }}
    >
      {/* Contenedor para el título y el mensaje */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px"
        }}
      >
        <span
          style={{
            color: "#0da6f2",
            fontSize: "1rem",
            fontWeight: "bold",
            lineHeight: "1.4",
          }}
        >
          {notificacion.titulo}
        </span>
        <span
          style={{
            color: "#333",
            fontSize: "0.95rem",
            fontWeight: "500",
            lineHeight: "1.4",
          }}
        >
          {notificacion.mensaje}
        </span>
      </div>

      <span
        style={{
          color: "#555",
          fontSize: "0.9rem",
          fontWeight: "500",
          whiteSpace: "nowrap",
        }}
      >
        {formatearFechaCorto(String(notificacion.fecha))}
      </span>

      <button
        onClick={() => onVerDetalle(notificacion)}
        title="Ver detalle de la solicitud"
        style={{
          backgroundColor: "#ffcc00",
          color: "white",
          width: "38px",
          height: "38px",
          borderRadius: "6px",
          border: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          fontSize: "1.3rem",
        }}
      >
        <IonIcon icon={helpOutline} />
      </button>
    </div>
  );
};

export default ItemNotificacion;