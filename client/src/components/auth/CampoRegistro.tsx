import React from "react";
import { IonInput } from "@ionic/react";

interface Props {
  placeholder: string;
  valor: string;
  tipo?: "text" | "email" | "password";
  obligatorio?: boolean;
  onCambiar: (valor: string) => void;
}

const CampoRegistro: React.FC<Props> = ({
  placeholder,
  valor,
  tipo = "text",
  obligatorio = true,
  onCambiar,
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        marginBottom: "15px",
        marginTop: "10px",
      }}
    >
      <IonInput
        placeholder={placeholder}
        type={tipo}
        value={valor}
        onIonInput={(e) => onCambiar(e.detail.value ?? "")}
        style={{
          backgroundColor: "#f2f2f2",
          border: "1px solid #d1d1d1",
          borderRadius: "4px",
          padding: "15px",
          height: "40px",
          width: "100%",
          color: "#666",
        }}
      />

      {obligatorio && (
        <span
          style={{
            position: "absolute",
            top: "-20px",
            left: "5px",
            padding: "0.5px",
            color: "red",
            fontSize: "0.75rem",
            zIndex: 1,
          }}
        >
          *(Obligatorio)
        </span>
      )}
    </div>
  );
};

export default CampoRegistro;