import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router-dom";

import EncabezadoAplicacion from "../../components/common/EncabezadoAplicacion";
import ContenedorPagina from "../../components/common/ContenedorPagina";
import ListaNotificacion from "../../components/notificaciones/ListaNotificacion";

import { Notificacion } from "../../dominio/entidades/Notificacion";
import { notificacionesSimuladas } from "../../infraestructura/simulacionDatos/notificacionesSimuladas";
import { prepararSolicitudNotificacion } from "../../aplicacion/casosDeUso/prepararSolicitudNotificacion";

const NotificacionesCiudadano: React.FC = () => {
  const history = useHistory();

  const cambiarRolManual = () => {
    localStorage.setItem("rol_actual", "solicitante");
    window.dispatchEvent(new Event("rolCambiado"));
    history.push("/ciudadano/tramites");
  };

  const verDetalleSolicitud = (notificacion: Notificacion) => {
    prepararSolicitudNotificacion(notificacion);
    history.push(`/ciudadano/solicitud/${notificacion.idSolicitud}`);
  };

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

          <ListaNotificacion
            notificaciones={notificacionesSimuladas}
            onVerDetalle={verDetalleSolicitud}
          />
        </ContenedorPagina>
      </IonContent>
    </IonPage>
  );
};

export default NotificacionesCiudadano;
