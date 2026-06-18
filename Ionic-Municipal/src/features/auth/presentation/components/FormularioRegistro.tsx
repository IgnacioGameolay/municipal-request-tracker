import React from "react";
import { IonButton, IonCheckbox, IonLabel, IonText } from "@ionic/react";
import CampoRegistro from "./CampoRegistro";
import type { DatosRegistro } from "../../domain/rules/validarRegistro";

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
        maxWidth: "900px",
        width: "100%",
        margin: "30px auto",
        padding: "0 24px",
      }}
    >
      <h2
        style={{
          fontWeight: "900",
          marginBottom: "28px",
          color: "#000",
          textAlign: "center",
        }}
      >
        Crear cuenta
      </h2>

      {/* Grid de 2 columnas para escritorio */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px 30px",
          marginBottom: "24px",
        }}
      >
        <CampoRegistro

          placeholder="Ingrese su nombre"
          valor={datos.nombre}
          onCambiar={(valor) => onCambiarCampo("nombre", valor)}
        />
        <CampoRegistro
          placeholder="Ingrese su apellido"
          valor={datos.apellido}
          onCambiar={(valor) => onCambiarCampo("apellido", valor)}
        />
        <CampoRegistro
          placeholder="Ingrese su RUT con guión y sin punto"
          valor={datos.rut}
          onCambiar={(valor) => onCambiarCampo("rut", valor)}
        />
        <CampoRegistro
          placeholder="Ingrese su región"
          valor={datos.region}
          onCambiar={(valor) => onCambiarCampo("region", valor)}
        />
        <CampoRegistro
          placeholder="Correo electrónico"
          tipo="email"
          valor={datos.correo}
          onCambiar={(valor) => onCambiarCampo("correo", valor)}
        />
        <CampoRegistro
          placeholder="Ingrese su comuna"
          valor={datos.comuna}
          onCambiar={(valor) => onCambiarCampo("comuna", valor)}
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
      </div>

      {/* Checkbox - centrado con ancho controlado */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            maxWidth: "500px",
            width: "100%",
          }}
        >
          <IonCheckbox
            checked={datos.aceptaTerminos}
            onIonChange={(e) => onCambiarCampo("aceptaTerminos", e.detail.checked)}
            style={{ marginRight: "12px", marginTop: "2px" }}
          />
          <IonLabel style={{ fontSize: "0.85rem", color: "#000" }}>
            <span style={{ color: "red" }}>[Obligatorio]</span> Leí y acepto la{" "}
            <span style={{ color: "#007bff" }}>Política de privacidad</span> y los{" "}
            <span style={{ color: "#007bff" }}>Términos de servicio</span>.
          </IonLabel>
        </div>
      </div>

      {/* Mensaje de error */}
      {error && (
        <IonText
          color="danger"
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: "15px",
            fontSize: "0.85rem",
          }}
        >
          {error}
        </IonText>
      )}

      {/* Botón centrado */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <IonButton
          onClick={onCrearCuenta}
          style={{
            "--background": "#a3a8ff",
            "--border-radius": "8px",
            width: "100%",
            maxWidth: "300px",
            fontWeight: "bold",
            height: "50px",
          }}
        >
          Crear cuenta
        </IonButton>
      </div>
    </div>
  );
};

export default FormularioRegistro;