import React from "react";
import { IonModal } from "@ionic/react";
import { obtenerColorEstado } from "../../dominio/reglas/normalizarEstado";
import { Solicitud } from "../../dominio/entidades/Solicitud";

interface Props {
  abierto: boolean;
  solicitud: Solicitud;
  estadoSeleccionado: string;
  onCambiarEstado: (estado: string) => void;
  onConfirmar: () => void;
  onCancelar: () => void;
}

const ModalCambioDeEstado: React.FC<Props> = ({
  abierto,
  solicitud,
  estadoSeleccionado,
  onCambiarEstado,
  onConfirmar,
  onCancelar,
}) => {
  const { fondo, texto } = obtenerColorEstado(solicitud.estado);
  return (
    <IonModal
      isOpen={abierto}
      onDidDismiss={onCancelar}
      style={{
        "--width": "450px",
        "--height": "375px",
        "--border-radius": "12px",
      }}
    >
      <div
        style={{
          backgroundColor: "#f4f5f8",
          borderRadius: "14px",
          padding: "35px 45px",
          width: "100%",
          height: "100%",
          maxWidth: "520px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
        }}
      >
        <h2
          style={{
            color: "#000",
            textAlign: "center",
            marginBottom: "35px",
            fontSize: "1.6rem",
            fontWeight: "bold",
          }}
        >
          Cambiar estado de la solicitud
        </h2>
        
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "flex-start",
            gap: "30px",
            marginBottom: "45px",
          }}
        >
          <div
            style={{ textAlign: "center" }}>
              <p
                style={{
                  color: "#222",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Estado actual
              </p>
              <span
                
                style={{
                  
                  display: "inline-block",
                  backgroundColor: fondo,
                  color: "#ffffff",
                  fontWeight: "bold",
                  borderRadius: "18px",
                  padding: "8px 22px",
                }}
              >
                {solicitud.estado}
              </span>                        
            </div>
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  color: "#222",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Estado nuevo
              </p>

              <select
                value={estadoSeleccionado}
                onChange={(event) => onCambiarEstado(event.target.value)}
                style={{
                  padding: "9px 14px",
                  borderRadius: "4px",
                  border: "1px solid #bbb",
                  backgroundColor: "#fff",
                  color: "#222",
                  fontSize: "1rem",
                  minWidth: "145px",
                }}
              >
                <option value="">Seleccionar</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En revisión">En revisión</option>
                <option value="Resuelta">Resuelta</option>
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={onConfirmar}
            style={{
              width: "100%",
              backgroundColor: "#63d11f",
              color: "#ffffff",
              border: "1px solid #2c8a00",
              borderRadius: "5px",
              padding: "16px",
              fontWeight: "bold",
              fontSize: "1.15rem",
              cursor: "pointer",
              marginBottom: "25px",
            }}
          >
            Confirmar cambios
          </button>

          <button
            type="button"
            onClick={onCancelar}
            style={{
              display: "block",
              margin: "0 auto",
              background: "none",
              border: "none",
              color: "#777",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>
      </div>


    </IonModal>
  );
};
export default ModalCambioDeEstado;