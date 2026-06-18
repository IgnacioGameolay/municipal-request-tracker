import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  IonSpinner,
  IonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

import EncabezadoAplicacion from "../../../../core/presentation/components/common/EncabezadoAplicacion";
import ContenedorPagina from "../../../../core/presentation/components/common/ContenedorPagina";
import ListaNotificacion from "../components/ListaNotificacion";

import { Notificacion } from "../../domain/entities/Notificacion";
import {
  NotificacionApi,
  marcarNotificacionLeida,
  obtenerNotificaciones,
} from "../../data/notificaciones";
import { ApiClientError } from "../../../../network/apiClient";

function mapNotificacionApiToNotificacion(api: NotificacionApi): Notificacion {
  return {
    id: api.id,
    idSolicitud: api.solicitudId ?? "",
    titulo: api.titulo,
    mensaje: api.mensaje,
    fecha: api.createdAt,
    leida: api.leida,
  } as unknown as Notificacion;
}

const NotificacionesCiudadano: React.FC = () => {
  const history = useHistory();

  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [cargando, setCargando] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const cargarNotificaciones = async () => {
    try {
      setCargando(true);
      setMensajeError("");

      const notificacionesApi = await obtenerNotificaciones();
      const notificacionesVista = notificacionesApi.map(
        mapNotificacionApiToNotificacion,
      );

      setNotificaciones(notificacionesVista);
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

  const verDetalleSolicitud = async (notificacion: Notificacion) => {
    try {
      await marcarNotificacionLeida(String(notificacion.id));

      if (!notificacion.idSolicitud) {
        setMensajeError("La notificación no tiene una solicitud asociada.");
        return;
      }

      history.push(`/ciudadano/solicitud/${notificacion.idSolicitud}`);
    } catch (error) {
      if (error instanceof ApiClientError) {
        setMensajeError(error.message);
        return;
      }

      history.push(`/ciudadano/solicitud/${notificacion.idSolicitud}`);
    }
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
            Notificaciones
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
                padding: "18px",
                color: "#555",
                border: "1px solid #eee",
              }}
            >
              No tienes notificaciones por el momento.
            </div>
          )}

          {!cargando && !mensajeError && notificaciones.length > 0 && (
            <ListaNotificacion
              notificaciones={notificaciones}
              onVerDetalle={verDetalleSolicitud}
            />
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

export default NotificacionesCiudadano;
