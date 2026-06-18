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
import FiltrarSolicitudes from "../components/FiltrarSolicitudes";
import TablaSolicitudes from "../components/TablaSolicitudes";
import ModalEliminarSolicitud from "../components/ModalEliminarSolicitud";

import { Solicitud } from "../../domain/entities/Solicitud";
import {
  eliminarSolicitud as eliminarSolicitudApi,
  obtenerSolicitudes,
} from "../../data/solicitudesApi";
import { mapSolicitudesApiToSolicitudes } from "../../data/solicitudesMapper";
import { ApiClientError } from "../../../../network/apiClient";

const SolicitudesRealizadas: React.FC = () => {
  const history = useHistory();

  const [todasLasSolicitudes, setTodasLasSolicitudes] = useState<Solicitud[]>(
    [],
  );
  const [solicitudesMostrar, setSolicitudesMostrar] = useState<Solicitud[]>([]);

  const [mostrarAlertaBorrar, setMostrarAlertaBorrar] = useState(false);
  const [solicitudABorrar, setSolicitudABorrar] =
    useState<Solicitud["id"] | null>(null);

  const [mensajeToast, setMensajeToast] = useState("");
  const [errorCarga, setErrorCarga] = useState("");
  const [cargando, setCargando] = useState(false);

  const cargarSolicitudes = async (): Promise<Solicitud[]> => {
  try {
    setCargando(true);
    setErrorCarga("");

    const respuestaApi = await obtenerSolicitudes();
    
    const objetoBase = (respuestaApi as any).data || respuestaApi;
    const lista = objetoBase.solicitudes || (Array.isArray(objetoBase) ? objetoBase : []);

    const solicitudes = mapSolicitudesApiToSolicitudes(lista);

    setTodasLasSolicitudes(solicitudes);
    setSolicitudesMostrar(solicitudes);

    return solicitudes;
  } catch (error) {
    if (error instanceof ApiClientError) {
      setErrorCarga(error.message);
      return [];
    }

    if (error instanceof Error) {
      setErrorCarga(error.message);
      return [];
    }

    setErrorCarga("No se pudieron cargar las solicitudes.");
    return [];
  } finally {
    setCargando(false);
  }

};

  const cambiarRolManual = () => {
    localStorage.setItem("rol_actual", "solicitante");
    window.dispatchEvent(new Event("rolCambiado"));
    history.push("/ciudadano/tramites");
  };

  const abrirModalBorrar = (id: Solicitud["id"]) => {
    setSolicitudABorrar(id);
    setMostrarAlertaBorrar(true);
  };

  const cancelarBorrado = () => {
    setSolicitudABorrar(null);
    setMostrarAlertaBorrar(false);
  };

  const confirmarBorrado = async () => {
    if (solicitudABorrar === null) {
      return;
    }

    try {
      await eliminarSolicitudApi(String(solicitudABorrar));

      const solicitudesActualizadas = todasLasSolicitudes.filter(
        (solicitud) => solicitud.id !== solicitudABorrar,
      );

      setTodasLasSolicitudes(solicitudesActualizadas);
      setSolicitudesMostrar(solicitudesActualizadas);
      setSolicitudABorrar(null);
      setMostrarAlertaBorrar(false);
      setMensajeToast("Solicitud eliminada correctamente");
    } catch (error) {
      if (error instanceof ApiClientError) {
        setMensajeToast(error.message);
        return;
      }

      setMensajeToast("No se pudo eliminar la solicitud.");
    }
  };

  useEffect(() => {
    void cargarSolicitudes();
  }, []);

  useIonViewWillEnter(() => {
    void cargarSolicitudes();
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
        <div
          style={{
            maxWidth: "1220px",
            margin: "0 auto",
            paddingTop: "10px",
            paddingBottom: "30px",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <h2
            style={{
              color: "#000",
              fontWeight: "500",
              marginBottom: "10px",
              fontSize: "1.8rem",
            }}
          >
            Solicitudes
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

          {errorCarga && !cargando && (
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
              {errorCarga}
            </div>
          )}

          {!cargando && !errorCarga && (
            <>
              <FiltrarSolicitudes
                solicitudes={todasLasSolicitudes}
                onFiltrar={setSolicitudesMostrar}
                onRecargar={cargarSolicitudes}
              />

              <TablaSolicitudes
                solicitudes={solicitudesMostrar}
                onEditar={(id) =>
                  history.push(`/ciudadano/editar-solicitud/${id}`)
                }
                onDetalle={(id) => history.push(`/ciudadano/solicitud/${id}`)}
                onEliminar={abrirModalBorrar}
              />
            </>
          )}
        </div>

        <ModalEliminarSolicitud
          abierto={mostrarAlertaBorrar}
          onCancelar={cancelarBorrado}
          onConfirmar={confirmarBorrado}
        />

        <IonToast
          isOpen={!!mensajeToast}
          onDidDismiss={() => setMensajeToast("")}
          message={mensajeToast}
          duration={2000}
          color="dark"
          position="bottom"
        />
      </IonContent>
    </IonPage>
  );
};

export default SolicitudesRealizadas;
