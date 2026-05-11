import React from "react";
import { IonIcon } from "@ionic/react";
import { documentOutline } from "ionicons/icons";

const DocumentacionSolicitud: React.FC = () => {
  return (
    <div style={{ marginBottom: "30px" }}>
      <label
        style={{
          display: "block",
          fontSize: "0.9rem",
          color: "#333",
          marginBottom: "15px",
          fontWeight: "500",
        }}
      >
        Documentación de la solicitud
      </label>

      <div
        style={{
          display: "flex",
          gap: "15px",
          backgroundColor: "#d3d3d3",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <div style={{ textAlign: "center", opacity: 0.7 }}>
          <IonIcon
            icon={documentOutline}
            style={{ fontSize: "2.5rem", color: "#333" }}
          />

          <span
            style={{
              display: "block",
              fontSize: "0.7rem",
              color: "#333",
              marginTop: "5px",
            }}
          >
            Permiso...
          </span>
        </div>

        <div style={{ textAlign: "center", opacity: 0.7 }}>
          <IonIcon
            icon={documentOutline}
            style={{ fontSize: "2.5rem", color: "#333" }}
          />

          <span
            style={{
              display: "block",
              fontSize: "0.7rem",
              color: "#333",
              marginTop: "5px",
            }}
          >
            Datos p...
          </span>
        </div>
      </div>
    </div>
  );
};

export default DocumentacionSolicitud;
