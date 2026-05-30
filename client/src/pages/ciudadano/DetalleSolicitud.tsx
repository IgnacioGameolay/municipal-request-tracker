import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  IonSpinner,
  IonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { useHistory, useParams } from "react-router-dom";

import EncabezadoAplicacion from "../../components/common/EncabezadoAplicacion";
import ContenedorPagina from "../../components/common/ContenedorPagina";
import ResumenSolicitud from "../../components/solicitudes/ResumenSolicitud";
import ComentariosSolicitud from "../../components/solicitudes/ComentariosSolicitud";

import { Solicitud } from "../../dominio/entidades/Solicitud";
import { obtenerSolicitudPorId } from "../../services/solicitudesApi";
import { mapSolicitudApiToSolicitud } from "../../services/solicitudesMapper";
import { ApiClientError } from "../../services/apiClient";
import DocumentosSolicitud from "../../components/solicitudes/DocumentosSolicitud";


const DetalleSolicitud: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [solicitud, setSolicitud] = useState<Solicitud | null>(null);
  const [cargando, setCargando] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const cargarSolicitud = async () => {
    try {
      setCargando(true);
      setMensajeError("");

      const solicitudApi = await obtenerSolicitudPorId(id);
      const solicitudVista = mapSolicitudApiToSolicitud(solicitudApi);

      setSolicitud(solicitudVista);
    } catch (error) {
      setSolicitud(null);

      if (error instanceof ApiClientError) {
        setMensajeError(error.message);
        return;
      }

      if (error instanceof Error) {
        setMensajeError(error.message);
        return;
      }

      setMensajeError("No se pudo cargar la solicitud.");
    } finally {
      setCargando(false);
    }
  };

  const cambiarRolManual = () => {
    localStorage.setItem("rol_actual", "solicitante");
    window.dispatchEvent(new Event("rolCambiado"));
    history.push("/ciudadano/tramites");
  };

  useEffect(() => {
    void cargarSolicitud();
  }, [id]);

  useIonViewWillEnter(() => {
    void cargarSolicitud();
  });

  return (
    <IonPage>
      <EncabezadoAplicacion
        rol="solicitante"
        rutaNotificaciones="/ciudadano/notificaciones"
        rutaPerfil="/ciudadano/tramites"
        onNavegar={(ruta) => history.push(ruta)}
        permitirCambioManualRol
        onCambiarRolManual={cambiarRolManual}
      />

      <IonContent style={{ "--background": "#ffffff" }}>
        <ContenedorPagina>
          <h2
            style={{
              color: "#000",
              fontWeight: "bold",
              marginBottom: "25px",
              fontSize: "1.8rem",
            }}
          >
            Información de la solicitud
          </h2>

          {cargando && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "30px",
              }}
            >
              <IonSpinner name="crescent" />
            </div>
          )}

          {!cargando && mensajeError && (
            <div
              style={{
                backgroundColor: "#ffe5e5",
                color: "#a00000",
                padding: "12px 16px",
                borderRadius: "8px",
                marginBottom: "16px",
                border: "1px solid #ffb3b3",
              }}
            >
              {mensajeError}
            </div>
          )}

          {!cargando && !mensajeError && solicitud && (
            <>
              <ResumenSolicitud solicitud={solicitud} />

              <DocumentosSolicitud
                solicitudId={id}
                titulo="Documentos adjuntos al expediente"
                permitirSubida
                permitirEliminar
              />

              <ComentariosSolicitud solicitud={solicitud} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={() => history.goBack()}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#333",
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                >
                  Volver
                </button>
              </div>
            </>
          )}

          {!cargando && !mensajeError && !solicitud && (
            <p style={{ color: "#333", fontSize: "1rem" }}>
              No se encontró la solicitud.
            </p>
          )}
        </ContenedorPagina>

        <IonToast
          isOpen={mensajeError !== ""}
          message={mensajeError}
          duration={2500}
          color="danger"
          position="bottom"
          onDidDismiss={() => setMensajeError("")}
        />
      </IonContent>
    </IonPage>
  );
};

export default DetalleSolicitud;