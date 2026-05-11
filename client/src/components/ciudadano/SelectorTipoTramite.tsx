import React from "react";
import { IonSelect, IonSelectOption } from "@ionic/react";

interface Props {
  tipos: string[];
  tipoSeleccionado: string;
  onSeleccionarTipo: (tipo: string) => void;
}

const SelectorTipoTramite: React.FC<Props> = ({
  tipos,
  tipoSeleccionado,
  onSeleccionarTipo,
}) => {
  return (
    <div style={{ marginBottom: "35px" }}>
      <label
        style={{
          display: "block",
          fontSize: "1rem",
          fontWeight: "bold",
          marginBottom: "15px",
          color: "#000",
        }}
      >
        Seleccione tipo de trámite:
      </label>

      <IonSelect
        interface="popover"
        value={tipoSeleccionado}
        placeholder="Seleccione..."
        onIonChange={(e) => onSeleccionarTipo(e.detail.value || "")}
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #999",
          borderRadius: "6px",
          width: "200px",
          minHeight: "40px",
          paddingLeft: "5px",
          color: "#333",
        }}
      >
        {tipos.map((tipo) => (
          <IonSelectOption key={tipo} value={tipo}>
            {tipo}
          </IonSelectOption>
        ))}
      </IonSelect>
    </div>
  );
};

export default SelectorTipoTramite;
