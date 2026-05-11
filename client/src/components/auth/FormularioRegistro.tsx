import React from "react";
import { IonButton, IonCheckbox, IonLabel, IonText } from "@ionic/react";

import CampoRegistro from "./CampoRegistro";
import type { DatosRegistro } from "../../dominio/reglas/validarRegistro";

interface Props {
  datos: DatosRegistro;
  error: string;
  onCambiarCampo: (campo: keyof DatosRegistro, valor: string | boolean) => void;
  onCrearCuenta: () => void;
}

const FormularioRegistro: React.FC<Props> = ({
  datos,
  error,
  onCambiarCampo,
  onCrearCuenta,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "500px",
        margin: "20px auto",
      }}
    >
      <h2
        style={{
          fontWeight: "900",
          marginBottom: "20px",
          color: "#000",
        }}
      >
        Crear cuenta
      </h2>

      <CampoRegistro
        placeholder="Ingresa tu nombre"
        valor={datos.nombre}
        onCambiar={(valor) => onCambiarCampo("nombre", valor)}
      />

      <CampoRegistro
        placeholder="Ingresa tu apellido"
        valor={datos.apellido}
        onCambiar={(valor) => onCambiarCampo("apellido", valor)}
      />

      <CampoRegistro
        placeholder="Ingresa tu RUT con guión y sin punto"
        valor={datos.rut}
        onCambiar={(valor) => onCambiarCampo("rut", valor)}
      />

      <CampoRegistro
        placeholder="Ingresa tu región"
        valor={datos.region}
        onCambiar={(valor) => onCambiarCampo("region", valor)}
      />

      <CampoRegistro
        placeholder="Ingresa tu comuna"
        valor={datos.comuna}
        onCambiar={(valor) => onCambiarCampo("comuna", valor)}
      />

      <CampoRegistro
        placeholder="Correo electrónico"
        tipo="email"
        valor={datos.correo}
        onCambiar={(valor) => onCambiarCampo("correo", valor)}
      />

      <CampoRegistro
        placeholder="Contraseña"
        tipo="password"
        valor={datos.password}
        onCambiar={(valor) => onCambiarCampo("password", valor)}
      />

      <CampoRegistro
        placeholder="Confirmar contraseña"
        tipo="password"
        valor={datos.confirmarPassword}
        onCambiar={(valor) => onCambiarCampo("confirmarPassword", valor)}
      />

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          width: "100%",
          marginTop: "10px",
          marginBottom: "20px",
        }}
      >
        <IonCheckbox
          checked={datos.aceptaTerminos}
          onIonChange={(e) =>
            onCambiarCampo("aceptaTerminos", e.detail.checked)
          }
          style={{ marginRight: "10px" }}
        />

        <IonLabel
          style={{
            fontSize: "0.85rem",
            color: "#000",
          }}
        >
          <span style={{ color: "red" }}>[Obligatorio]</span> Leí y acepto la{" "}
          <span style={{ color: "#007bff" }}>Política de privacidad</span> y los{" "}
          <span style={{ color: "#007bff" }}>Términos de servicio</span>.
        </IonLabel>
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

      <IonButton
        expand="block"
        onClick={onCrearCuenta}
        style={{
          "--background": "#a3a8ff",
          "--border-radius": "4px",
          width: "100%",
          fontWeight: "bold",
          height: "50px",
        }}
      >
        Crear cuenta
      </IonButton>
    </div>
  );
};

export default FormularioRegistro;
