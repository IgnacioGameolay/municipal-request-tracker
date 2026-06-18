import React, { useEffect, useRef, useState } from "react";
import {
  IonButton,
  IonIcon,
  IonSpinner,
  IonToast,
} from "@ionic/react";
import {
  cloudUploadOutline,
  documentTextOutline,
  downloadOutline,
  trashOutline,
} from "ionicons/icons";

import {
  descargarDocumentoSolicitud,
  DocumentoSolicitudApi,
  eliminarDocumentoSolicitud,
  obtenerDocumentosSolicitud,
  subirDocumentoSolicitud,
} from "../../../documentos/data/documentosApi";
import { ApiClientError } from "../../../../network/apiClient";

const MAX_DOCUMENTOS_POR_SOLICITUD = 10;
const MAX_DOCUMENTO_SIZE_BYTES = 15 * 1024 * 1024;

interface Props {
  solicitudId: string;
  titulo?: string;
  permitirSubida?: boolean;
  permitirEliminar?: boolean;
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

function formatearFecha(fechaIso: string): string {
  const fecha = new Date(fechaIso);

  if (Number.isNaN(fecha.getTime())) {
    return fechaIso;
  }

  return fecha.toLocaleString("es-CL");
}

const DocumentosSolicitud: React.FC<Props> = ({
  solicitudId,
  titulo = "Documentos adjuntos",
  permitirSubida = true,
  permitirEliminar = true,
}) => {
  const inputArchivoRef = useRef<HTMLInputElement | null>(null);

  const [documentos, setDocumentos] = useState<DocumentoSolicitudApi[]>([]);
  const [cargando, setCargando] = useState(false);
  const [subiendo, setSubiendo] = useState(false);
  const [mensajeToast, setMensajeToast] = useState("");
  const [colorToast, setColorToast] = useState<"success" | "danger" | "dark">(
    "dark",
  );

  const cargarDocumentos = async () => {
    try {
      setCargando(true);

      const documentosApi = await obtenerDocumentosSolicitud(solicitudId);
      setDocumentos(documentosApi);
    } catch (error) {
      if (error instanceof ApiClientError) {
        setColorToast("danger");
        setMensajeToast(error.message);
        return;
      }

      setColorToast("danger");
      setMensajeToast("No se pudieron cargar los documentos.");
    } finally {
      setCargando(false);
    }
  };

  const abrirSelectorArchivos = () => {
    inputArchivoRef.current?.click();
  };

  const subirArchivosSeleccionados = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const archivos = Array.from(event.target.files ?? []);

    if (archivos.length === 0) {
      return;
    }

    if (documentos.length + archivos.length > MAX_DOCUMENTOS_POR_SOLICITUD) {
      setColorToast("danger");
      setMensajeToast(
        `No se pueden adjuntar más de ${MAX_DOCUMENTOS_POR_SOLICITUD} documentos por solicitud.`,
      );
      event.target.value = "";
      return;
    }

    const archivoMuyGrande = archivos.find(
      (archivo) => archivo.size > MAX_DOCUMENTO_SIZE_BYTES,
    );

    if (archivoMuyGrande) {
      setColorToast("danger");
      setMensajeToast(
        `El archivo "${archivoMuyGrande.name}" supera el máximo permitido de 15 MB.`,
      );
      event.target.value = "";
      return;
    }

    try {
      setSubiendo(true);

      for (const archivo of archivos) {
        await subirDocumentoSolicitud(solicitudId, archivo);
      }

      setColorToast("success");
      setMensajeToast("Documento(s) incorporado(s) correctamente.");

      await cargarDocumentos();
    } catch (error) {
      if (error instanceof ApiClientError) {
        setColorToast("danger");
        setMensajeToast(error.message);
        return;
      }

      setColorToast("danger");
      setMensajeToast("No se pudo subir el documento.");
    } finally {
      setSubiendo(false);
      event.target.value = "";
    }
  };

  const descargarDocumento = async (documento: DocumentoSolicitudApi) => {
    try {
      await descargarDocumentoSolicitud(
        solicitudId,
        documento.id,
        documento.nombreOriginal,
      );
    } catch (error) {
      if (error instanceof ApiClientError) {
        setColorToast("danger");
        setMensajeToast(error.message);
        return;
      }

      setColorToast("danger");
      setMensajeToast("No se pudo descargar el documento.");
    }
  };

  const eliminarDocumento = async (documento: DocumentoSolicitudApi) => {
    const confirmar = window.confirm(
      `¿Eliminar el documento "${documento.nombreOriginal}"?`,
    );

    if (!confirmar) {
      return;
    }

    try {
      await eliminarDocumentoSolicitud(solicitudId, documento.id);

      setDocumentos((actuales) =>
        actuales.filter((item) => item.id !== documento.id),
      );

      setColorToast("success");
      setMensajeToast("Documento eliminado correctamente.");
    } catch (error) {
      if (error instanceof ApiClientError) {
        setColorToast("danger");
        setMensajeToast(error.message);
        return;
      }

      setColorToast("danger");
      setMensajeToast("No se pudo eliminar el documento.");
    }
  };

  useEffect(() => {
    void cargarDocumentos();
  }, [solicitudId]);

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
            {titulo}
          </h3>

          <p
            style={{
              color: "#666",
              fontSize: "0.9rem",
              margin: "6px 0 0 0",
            }}
          >
            Máximo 10 documentos por solicitud. Cada archivo no debe superar 15
            MB.
          </p>
        </div>

        {permitirSubida && (
          <>
            <input
              ref={inputArchivoRef}
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,application/pdf,image/jpeg,image/png,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={subirArchivosSeleccionados}
              style={{ display: "none" }}
            />

            <IonButton
              size="small"
              onClick={abrirSelectorArchivos}
              disabled={
                subiendo ||
                cargando ||
                documentos.length >= MAX_DOCUMENTOS_POR_SOLICITUD
              }
            >
              <IonIcon icon={cloudUploadOutline} slot="start" />
              Adjuntar
            </IonButton>
          </>
        )}
      </div>

      {cargando && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <IonSpinner name="crescent" />
        </div>
      )}

      {!cargando && documentos.length === 0 && (
        <div
          style={{
            backgroundColor: "#f4f5f8",
            borderRadius: "8px",
            padding: "16px",
            color: "#555",
          }}
        >
          No hay documentos adjuntos para esta solicitud.
        </div>
      )}

      {!cargando && documentos.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {documentos.map((documento) => (
            <div
              key={documento.id}
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
                    {documento.nombreOriginal}
                  </p>

                  <p
                    style={{
                      color: "#666",
                      margin: "4px 0 0 0",
                      fontSize: "0.85rem",
                    }}
                  >
                    {formatearTamano(documento.sizeBytes)} ·{" "}
                    {formatearFecha(documento.createdAt)}
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  flexShrink: 0,
                }}
              >
                <IonButton
                  size="small"
                  fill="clear"
                  onClick={() => descargarDocumento(documento)}
                >
                  <IonIcon icon={downloadOutline} />
                </IonButton>

                {permitirEliminar && (
                  <IonButton
                    size="small"
                    fill="clear"
                    color="danger"
                    onClick={() => eliminarDocumento(documento)}
                  >
                    <IonIcon icon={trashOutline} />
                  </IonButton>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {subiendo && (
        <p
          style={{
            color: "#555",
            fontSize: "0.9rem",
            marginTop: "12px",
          }}
        >
          Subiendo documento...
        </p>
      )}

      <IonToast
        isOpen={mensajeToast !== ""}
        message={mensajeToast}
        duration={2500}
        color={colorToast}
        position="bottom"
        onDidDismiss={() => setMensajeToast("")}
      />
    </div>
  );
};

export default DocumentosSolicitud;