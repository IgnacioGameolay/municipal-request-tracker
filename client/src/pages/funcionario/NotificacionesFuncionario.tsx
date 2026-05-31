import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  IonSpinner,
  IonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

import EncabezadoAplicacion from "../../components/common/EncabezadoAplicacion";
import ContenedorPagina from "../../components/common/ContenedorPagina";
import ListaNotificacion from "../../components/notificaciones/ListaNotificacion";

import { Notificacion } from "../../dominio/entidades/Notificacion";
import {
  NotificacionApi,
  obtenerNotificaciones,
} from "../../services/notificaciones";
import { ApiClientError } from "../../services/apiClient";

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

const NotificacionesFuncionario: React.FC = () => {
  const history = useHistory();

  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [cargando, setCargando] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const cargarNotificaciones = async () => {
    try {
      setCargando(true);
      setMensajeError("");

      // Leemos la tabla real de Notificaciones
      const notificacionesApi = await obtenerNotificaciones();
      
      // Filtramos solo las NO leídas (las que el backend aún no ha limpiado)
      const notificacionesNoLeidas = notificacionesApi.filter((n) => !n.leida);
      
      const notificacionesVista = notificacionesNoLeidas.map(
        mapNotificacionApiToNotificacion,
      );

      setNotificaciones(notificacionesVista);
    } catch (error) {
      if (error instanceof ApiClientError) {
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

  const verDetalleSolicitud = (notificacion: Notificacion) => {
    if (!notificacion.idSolicitud) {
      void cargarNotificaciones();
      setMensajeError("Esta solicitud fue eliminada.");
      return;
    }
    history.push(`/funcionario/solicitud/${notificacion.idSolicitud}`);
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
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2 style={{ color: "#000", fontWeight: "bold", marginBottom: "25px", fontSize: "1.8rem" }}>
              Bandeja de notificaciones
            </h2>

            {cargando && (
              <div style={{ display: "flex", justifyContent: "center", padding: "30px" }}>
                <IonSpinner name="crescent" />
              </div>
            )}

            {!cargando && !mensajeError && notificaciones.length === 0 && (
              <div style={{ backgroundColor: "#f4f5f8", borderRadius: "8px", height: "150px", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #eee" }}>
                <p style={{ color: "#555", fontWeight: "500" }}>
                  No tienes notificaciones pendientes.
                </p>
              </div>
            )}

            {!cargando && !mensajeError && notificaciones.length > 0 && (
              <ListaNotificacion
                notificaciones={notificaciones}
                onVerDetalle={verDetalleSolicitud}
              />
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