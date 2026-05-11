import React from "react";

interface Props {
  onRechazar: () => void;
  onActualizar: () => void;
  onVolver: () => void;
}

const RevisionSolicitud: React.FC<Props> = ({
  onRechazar,
  onActualizar,
  onVolver,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "40px",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        <button
          onClick={onRechazar}
          style={{
            backgroundColor: "#ff3b30",
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            border: "none",
            borderRadius: "4px",
            padding: "15px 30px",
            cursor: "pointer",
            width: "250px",
          }}
        >
          Rechazar solicitud
        </button>

        <button
          onClick={onActualizar}
          style={{
            backgroundColor: "#0088ff",
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            border: "none",
            borderRadius: "4px",
            padding: "15px 30px",
            cursor: "pointer",
            width: "250px",
          }}
        >
          Actualizar solicitud
        </button>
      </div>

      <button
        onClick={onVolver}
        style={{
          background: "none",
          border: "none",
          color: "#555",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Volver
      </button>
    </div>
  );
};

export default RevisionSolicitud;
