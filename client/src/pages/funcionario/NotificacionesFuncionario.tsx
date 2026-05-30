import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonIcon,
  IonPage,
  IonSpinner,
  IonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { helpOutline } from "ionicons/icons";

import EncabezadoAplicacion from "../../components/common/EncabezadoAplicacion";
import ContenedorPagina from "../../components/common/ContenedorPagina";

import {
  obtenerSolicitudes,
  SolicitudApi,
} from "../../services/solicitudesApi";
import { ApiClientError } from "../../services/apiClient";

function formatearFecha(fechaIso: string): string {
  const fecha = new Date(fechaIso);

  if (Number.isNaN(fecha.getTime())) {
    return fechaIso;
  }

  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const anio = fecha.getFullYear();

  let hora = fecha.getHours();
  const minutos = String(fecha.getMinutes()).padStart(2, "0");
  const periodo = hora >= 12 ? "pm" : "am";

  hora = hora % 12;
  hora = hora === 0 ? 12 : hora;

  return `${dia}-${mes}-${anio} ${String(hora).padStart(2, "0")}:${minutos} ${periodo}`;
}

function textoEstado(estado: SolicitudApi["estado"]): string {
  const estados: Record<SolicitudApi["estado"], string> = {
    pendiente: "Pendiente",
    en_revision: "En revisión",
    resuelta: "Resuelta",
    rechazada: "Rechazada",
  };

  return estados[estado];
}

const NotificacionesFuncionario: React.FC = () => {
  const history = useHistory();

  const [notificaciones, setNotificaciones] = useState<SolicitudApi[]>([]);
  const [cargando, setCargando] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const cargarNotificaciones = async () => {
    try {
      setCargando(true);
      setMensajeError("");

      const solicitudes = await obtenerSolicitudes();

      const solicitudesQueRequierenAtencion = solicitudes
        .filter(
          (solicitud) =>
            solicitud.estado === "pendiente" ||
            solicitud.estado === "en_revision",
        )
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

      setNotificaciones(solicitudesQueRequierenAtencion);
    } catch (error) {
      if (error instanceof ApiClientError) {
        setMensajeError(error.message);
        return;
      }

      if (error instanceof Error) {
        setMensajeError(error.message);
        return;
      }

      setMensajeError("No se pudieron cargar las notificaciones.");
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
    void cargarNotificaciones();
  }, []);

  useIonViewWillEnter(() => {
    void cargarNotificaciones();
  });

  return (
    <IonPage>
      <EncabezadoAplicacion
        rol="funcionario"
        rutaNotificaciones="/funcionario/notificaciones"
        rutaPerfil="/funcionario/tramites"
        onNavegar={(ruta) => history.push(ruta)}
        permitirCambioManualRol
        onCambiarRolManual={cambiarRolManual}
      />

      <IonContent style={{ "--background": "#ffffff" }}>
        <ContenedorPagina>
          <div
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
            }}
          >
            <h2
              style={{
                color: "#000",
                fontWeight: "bold",
                marginBottom: "25px",
                fontSize: "1.8rem",
              }}
            >
              Bandeja de notificaciones
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

            {!cargando && !mensajeError && notificaciones.length === 0 && (
              <div
                style={{
                  backgroundColor: "#f4f5f8",
                  borderRadius: "8px",
                  height: "150px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid #eee",
                }}
              >
                <p style={{ color: "#555", fontWeight: "500" }}>
                  No tienes solicitudes nuevas pendientes de revisión.
                </p>
              </div>
            )}

            {!cargando && !mensajeError && notificaciones.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                {notificaciones.map((noti) => (
                  <div
                    key={noti.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "#f4f5f8",
                      borderRadius: "8px",
                      padding: "15px 25px",
                      border: "1px solid #eee",
                    }}
                  >
                    <span
                      style={{
                        color: "#333",
                        fontSize: "0.95rem",
                        fontWeight: "500",
                      }}
                    >
                      Solicitud requiere atención:{" "}
                      <strong style={{ color: "#0da6f2" }}>
                        "{noti.titulo}"
                      </strong>{" "}
                      <span style={{ color: "#666" }}>
                        ({textoEstado(noti.estado)} · ID: {noti.id})
                      </span>
                    </span>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      <span
                        style={{
                          color: "#555",
                          fontSize: "0.9rem",
                          fontWeight: "500",
                        }}
                      >
                        {formatearFecha(noti.createdAt)}
                      </span>

                      <div
                        onClick={() =>
                          history.push(`/funcionario/solicitud/${noti.id}`)
                        }
                        title="Ver detalles de solicitud"
                        style={{
                          backgroundColor: "#ffcc00",
                          color: "white",
                          width: "32px",
                          height: "32px",
                          borderRadius: "6px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                          fontSize: "1.2rem",
                        }}
                      >
                        <IonIcon icon={helpOutline} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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

export default NotificacionesFuncionario;