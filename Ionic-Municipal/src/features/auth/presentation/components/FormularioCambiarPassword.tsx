import React from "react";
import { IonButton, IonInput, IonLabel, IonText } from "@ionic/react";

import CampoAuthConEtiqueta from "./CampoAuthConEtiqueta";
import CodigoVerificacion from "./CodigoVerificacion";

interface Props {
  correo: string;
  codigo: string[];
  nuevaPassword: string;
  confirmarPassword: string;
  error: string;
  mensajeExito: string;
  onCambiarCorreo: (valor: string) => void;
  onCambiarCodigo: (indice: number, valor: string) => void;
  onCambiarNuevaPassword: (valor: string) => void;
  onCambiarConfirmarPassword: (valor: string) => void;
  onEnviarCodigo: () => void;
  onContinuar: () => void;
}

const FormularioCambiarPassword: React.FC<Props> = ({
  correo,
  codigo,
  nuevaPassword,
  confirmarPassword,
  error,
  mensajeExito,
  onCambiarCorreo,
  onCambiarCodigo,
  onCambiarNuevaPassword,
  onCambiarConfirmarPassword,
  onEnviarCodigo,
  onContinuar,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "400px",
        margin: "40px auto 0 auto",
      }}
    >
      <h2
        style={{
          fontWeight: "900",
          marginBottom: "30px",
          color: "#000",
        }}
      >
        Cambiar contraseña
      </h2>

      <div style={{ width: "100%", marginBottom: "20px" }}>
        <IonLabel
          style={{
            fontWeight: "bold",
            fontSize: "0.8rem",
            marginBottom: "5px",
            display: "block",
            color: "#000",
          }}
        >
          Ingrese su correo
        </IonLabel>

        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <IonInput
            placeholder="Correo electrónico"
            type="email"
            value={correo}
            onIonInput={(e) => onCambiarCorreo(e.detail.value ?? "")}
            style={{
              backgroundColor: "#f2f2f2",
              border: "1px solid #d1d1d1",
              borderRadius: "4px",
              paddingLeft: "15px",
              height: "40px",
              flex: 1,
              color: "#666",
            }}
          />

          <IonButton
            onClick={onEnviarCodigo}
            style={{
              "--background": "#ff4d4d",
              "--border-radius": "6px",
              height: "40px",
              margin: 0,
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "0.85rem",
            }}
          >
            Enviar código
          </IonButton>
        </div>
      </div>

      <CodigoVerificacion codigo={codigo} onCambiarCodigo={onCambiarCodigo} />

      <div style={{ width: "100%", marginBottom: "20px" }}>
        <CampoAuthConEtiqueta
          etiqueta="Ingrese su nueva contraseña"
          placeholder="Contraseña"
          tipo="password"
          valor={nuevaPassword}
          onCambiar={onCambiarNuevaPassword}
        />

        <CampoAuthConEtiqueta
          etiqueta=""
          placeholder="Confirmar contraseña"
          tipo="password"
          valor={confirmarPassword}
          onCambiar={onCambiarConfirmarPassword}
        />
      </div>

      {error && (
        <IonText
          color="danger"
          style={{
            width: "100%",
            marginBottom: "15px",
            fontSize: "0.85rem",
          }}
        >
          {error}
        </IonText>
      )}

      {mensajeExito && (
        <IonText
          color="success"
          style={{
            width: "100%",
            marginBottom: "15px",
            fontSize: "0.85rem",
          }}
        >
          {mensajeExito}
        </IonText>
      )}

      <IonButton
        expand="block"
        onClick={onContinuar}
        style={{
          "--background": "#a3a8ff",
          "--box-shadow": "none",
          "--border-radius": "4px",
          width: "100%",
          fontWeight: "bold",
          textTransform: "none",
          fontSize: "1rem",
          height: "45px",
        }}
      >
        Continuar
      </IonButton>
    </div>
  );
};

export default FormularioCambiarPassword;
