import React, { useRef } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import {
  cloudUploadOutline,
  documentTextOutline,
  trashOutline,
} from "ionicons/icons";

const MAX_DOCUMENTOS_POR_SOLICITUD = 10;
const MAX_DOCUMENTO_SIZE_BYTES = 15 * 1024 * 1024;

const MIME_TYPES_PERMITIDOS = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

interface Props {
  archivos: File[];
  onCambiarArchivos: (archivos: File[]) => void;
  onError: (mensaje: string) => void;
  disabled?: boolean;
}

function formatearTamano(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const SelectorDocumentosPendientes: React.FC<Props> = ({
  archivos,
  onCambiarArchivos,
  onError,
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const abrirSelector = () => {
    inputRef.current?.click();
  };

  const seleccionarArchivos = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nuevosArchivos = Array.from(event.target.files ?? []);

    if (nuevosArchivos.length === 0) {
      return;
    }

    if (archivos.length + nuevosArchivos.length > MAX_DOCUMENTOS_POR_SOLICITUD) {
      onError(
        `No se pueden adjuntar más de ${MAX_DOCUMENTOS_POR_SOLICITUD} documentos por solicitud.`,
      );
      event.target.value = "";
      return;
    }

    const archivoMuyGrande = nuevosArchivos.find(
      (archivo) => archivo.size > MAX_DOCUMENTO_SIZE_BYTES,
    );

    if (archivoMuyGrande) {
      onError(
        `El archivo "${archivoMuyGrande.name}" supera el máximo permitido de 15 MB.`,
      );
      event.target.value = "";
      return;
    }

    const archivoNoPermitido = nuevosArchivos.find(
      (archivo) => !MIME_TYPES_PERMITIDOS.includes(archivo.type),
    );

    if (archivoNoPermitido) {
      onError(
        `El archivo "${archivoNoPermitido.name}" tiene un formato no permitido. Solo se aceptan PDF, JPG, PNG, DOC y DOCX.`,
      );
      event.target.value = "";
      return;
    }

    onCambiarArchivos([...archivos, ...nuevosArchivos]);
    event.target.value = "";
  };

  const eliminarArchivo = (index: number) => {
    onCambiarArchivos(archivos.filter((_, posicion) => posicion !== index));
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "20px",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "15px",
          marginBottom: "15px",
        }}
      >
        <div>
          <h3
            style={{
              color: "#000",
              fontSize: "1.1rem",
              margin: 0,
              fontWeight: "bold",
            }}
          >
            Documentos de respaldo
          </h3>

          <p
            style={{
              color: "#666",
              fontSize: "0.9rem",
              margin: "6px 0 0 0",
            }}
          >
            Puedes adjuntar hasta 10 documentos. Cada archivo debe pesar máximo
            15 MB.
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,application/pdf,image/jpeg,image/png,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={seleccionarArchivos}
          style={{ display: "none" }}
        />

        <IonButton
          size="small"
          onClick={abrirSelector}
          disabled={disabled || archivos.length >= MAX_DOCUMENTOS_POR_SOLICITUD}
        >
          <IonIcon icon={cloudUploadOutline} slot="start" />
          Adjuntar
        </IonButton>
      </div>

      {archivos.length === 0 && (
        <div
          style={{
            backgroundColor: "#f4f5f8",
            borderRadius: "8px",
            padding: "16px",
            color: "#555",
          }}
        >
          No has seleccionado documentos.
        </div>
      )}

      {archivos.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {archivos.map((archivo, index) => (
            <div
              key={`${archivo.name}-${archivo.size}-${index}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#f4f5f8",
                borderRadius: "8px",
                padding: "12px 14px",
                border: "1px solid #eee",
                gap: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  minWidth: 0,
                }}
              >
                <IonIcon
                  icon={documentTextOutline}
                  style={{
                    fontSize: "1.4rem",
                    color: "#0da6f2",
                    flexShrink: 0,
                  }}
                />

                <div style={{ minWidth: 0 }}>
                  <p
                    style={{
                      color: "#222",
                      fontWeight: "600",
                      margin: 0,
                      wordBreak: "break-word",
                    }}
                  >
                    {archivo.name}
                  </p>

                  <p
                    style={{
                      color: "#666",
                      margin: "4px 0 0 0",
                      fontSize: "0.85rem",
                    }}
                  >
                    {formatearTamano(archivo.size)}
                  </p>
                </div>
              </div>

              <IonButton
                size="small"
                fill="clear"
                color="danger"
                disabled={disabled}
                onClick={() => eliminarArchivo(index)}
              >
                <IonIcon icon={trashOutline} />
              </IonButton>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectorDocumentosPendientes;