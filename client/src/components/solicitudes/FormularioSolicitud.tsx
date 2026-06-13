import React from "react";
import { IonInput } from "@ionic/react";

import { Solicitud } from "../../dominio/entidades/Solicitud";

interface Props {
  solicitud: Solicitud;
  comentario: string;
  onCambiarComentario: (valor: string) => void;
}

const FormularioRevisionSolicitud: React.FC<Props> = ({
  solicitud,
  comentario,
  onCambiarComentario,
}) => {
  const dBgColor = "#bbbbbb";
  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            display: "block",
            fontSize: "0.9rem",
            color: "#333",
            marginBottom: "8px",
            fontWeight: "500",
          }}
        >
          Tipo de solicitud
        </label>

        <IonInput
          value={solicitud.tipo || "Sin tipo especificado"}
          disabled
          style={{
            backgroundColor: dBgColor,
            border: "1px solid #ccc",
            borderRadius: "4px",
            minHeight: "40px",
            width: "400px",
            paddingLeft: "10px",
            color: "#555",
            fontFamily: "inherit",
            opacity: 1,
          }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            display: "block",
            fontSize: "0.9rem",
            color: "#333",
            marginBottom: "8px",
            fontWeight: "500",
          }}
        >
          Título de la solicitud
        </label>

        <IonInput
          value={solicitud.titulo}
          disabled
          style={{
            backgroundColor: dBgColor,
            border: "1px solid #ccc",
            borderRadius: "4px",
            minHeight: "40px",
            paddingLeft: "10px",
            color: "#555",
            fontFamily: "inherit",
            opacity: 1,
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.9rem",
              color: "#333",
              marginBottom: "8px",
              fontWeight: "500",
            }}
          >
            Descripción de la solicitud
          </label>

          <textarea
            value={solicitud.descripcion || "Sin descripción"}
            disabled
            style={{
              width: "100%",
              height: "200px",
              backgroundColor: dBgColor,
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "10px",
              resize: "none",
              color: "#555",
              fontFamily: "inherit",
              opacity: 1,
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.9rem",
              color: "#333",
              marginBottom: "8px",
              fontWeight: "500",
            }}
          >
            Comentar solicitud
          </label>

          <textarea
            placeholder="Escribe tus observaciones aquí..."
            value={comentario}
            onChange={(e) => onCambiarComentario(e.target.value)}
            style={{
              width: "100%",
              height: "200px",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "10px",
              resize: "none",
              color: "#000",
              fontFamily: "inherit",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default FormularioRevisionSolicitud;