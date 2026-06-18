import React from "react";
import { IonInput, IonSelect, IonSelectOption } from "@ionic/react";

interface Props {
  tipo: string;
  titulo: string;
  descripcionOriginal: string;
  descripcionAgregada: string;
  esEdicion: boolean;
  opcionesTramites: string[];
  onCambiarTipo: (valor: string) => void;
  onCambiarTitulo: (valor: string) => void;
  onCambiarDescripcionOriginal: (valor: string) => void;
  onCambiarDescripcionAgregada: (valor: string) => void;
}

const FormularioCrearYEditarSolicitudes: React.FC<Props> = ({
  tipo,
  titulo,
  descripcionOriginal,
  descripcionAgregada,
  esEdicion,
  opcionesTramites,
  onCambiarTipo,
  onCambiarTitulo,
  onCambiarDescripcionOriginal,
  onCambiarDescripcionAgregada,
}) => {
   const dBgColor = "#bbbbbb";
  return (
    <>
    <style>
        {`.custom-select-popover {--width: 400px;}`}
    </style>

      <div style={{ marginBottom: "20px" }}>
        <label style={estiloEtiqueta}>Tipo de solicitud</label>

        <IonSelect
          className="custom-select"
          interface="popover"
          interfaceOptions={{
            cssClass: "custom-select-popover",
            alignment: 'start',
            matchWidth: true,
          }}
          value={tipo}
          placeholder={
            opcionesTramites.length > 0
              ? "Seleccione..."
              : "Cargando trámites..."
          }
          onIonChange={(e) => onCambiarTipo(e.detail.value || "")}
          disabled={esEdicion || opcionesTramites.length === 0}
          style={{
            backgroundColor: esEdicion ? dBgColor : "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            minHeight: "40px",
            width: "400px", //260px antes
            paddingLeft: "10px",
            opacity: 1,
            color: "#555",
          }}
        >
          {opcionesTramites.map((opcion) => (
            <IonSelectOption key={opcion} value={opcion}>
              {opcion}
            </IonSelectOption>
          ))}
        </IonSelect>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={estiloEtiqueta}>Título de la solicitud</label>

        <IonInput
          value={titulo}
          onIonChange={(e) => onCambiarTitulo(e.detail.value || "")}
          disabled={esEdicion}
          style={{
            backgroundColor: esEdicion ? dBgColor : "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            minHeight: "40px",
            paddingLeft: "10px",
            color: esEdicion ? "#555" : "#000",
            opacity: 1,
          }}
        />
      </div>

      {esEdicion ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div>
            <label style={estiloEtiqueta}>Descripción de la solicitud</label>

            <textarea
              value={descripcionOriginal}
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
            <label style={estiloEtiqueta}>
              Agregar a la descripción de la solicitud
            </label>

            <textarea
              placeholder="Describe la información adicional que quieres agregar a esta solicitud."
              value={descripcionAgregada}
              onChange={(e) => onCambiarDescripcionAgregada(e.target.value)}
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
      ) : (
        <div style={{ marginBottom: "30px" }}>
          <label style={estiloEtiqueta}>Descripción de la solicitud</label>

          <textarea
            value={descripcionOriginal}
            onChange={(e) => onCambiarDescripcionOriginal(e.target.value)}
            style={{
              width: "100%",
              height: "150px",
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
      )}
    </>
  );
};

const estiloEtiqueta = {
  display: "block",
  fontSize: "0.9rem",
  color: "#333",
  marginBottom: "8px",
  fontWeight: "500",
};

export default FormularioCrearYEditarSolicitudes;