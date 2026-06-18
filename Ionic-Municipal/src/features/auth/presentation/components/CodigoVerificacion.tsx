import React from "react";
import { IonInput, IonLabel } from "@ionic/react";

interface Props {
  codigo: string[];
  onCambiarCodigo: (indice: number, valor: string) => void;
}

const CodigoVerificacion: React.FC<Props> = ({ codigo, onCambiarCodigo }) => {
  return (
    <div
      style={{
        width: "100%",
        marginBottom: "30px",
        textAlign: "center",
      }}
    >
      <IonLabel
        style={{
          fontWeight: "bold",
          fontSize: "0.8rem",
          marginBottom: "10px",
          display: "block",
          color: "#000",
        }}
      >
        Código de verificación
      </IonLabel>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        {codigo.map((valor, index) => (
          <IonInput
            key={index}
            value={valor}
            maxlength={1}
            onIonInput={(e) => onCambiarCodigo(index, e.detail.value ?? "")}
            style={{
              backgroundColor: "#f2f2f2",
              border: "1px solid #d1d1d1",
              borderRadius: "4px",
              width: "45px",
              height: "45px",
              textAlign: "center",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CodigoVerificacion;
