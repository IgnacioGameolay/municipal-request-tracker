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
import FiltrosHistorialFuncionario from "../../../funcionario/presentation/components/FiltrosHistorialFuncionario";
import TablaHistorialFuncionario from "../../../funcionario/presentation/components/TablaHistorialFuncionario";

import { Solicitud } from "../../domain/entities/Solicitud";
import { obtenerSolicitudes } from "../../data/solicitudesApi";
import { mapSolicitudesApiToSolicitudes } from "../../data/solicitudesMapper";
import { ApiClientError } from "../../../../network/apiClient";

const HistorialFuncionario: React.FC = () => {
  const history = useHistory();

  const [todasLasSolicitudes, setTodasLasSolicitudes] = useState<Solicitud[]>(
    [],
  );
  const [solicitudesMostrar, setSolicitudesMostrar] = useState<Solicitud[]>([]);
  const [cargando, setCargando] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const cargarSolicitudes = async (): Promise<Solicitud[]> => {
  try {
    setCargando(true);
    setMensajeError("");

    const solicitudesApi = await obtenerSolicitudes();
    const solicitudes = mapSolicitudesApiToSolicitudes(solicitudesApi);

    setTodasLasSolicitudes(solicitudes);
    setSolicitudesMostrar(solicitudes);

    return solicitudes;
  } catch (error) {
    if (error instanceof ApiClientError) {
      setMensajeError(error.message);
      return [];
    }

    if (error instanceof Error) {
      setMensajeError(error.message);
      return [];
    }

    setMensajeError("No se pudieron cargar las solicitudes.");
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

  useEffect(() => {
    void cargarSolicitudes();
  }, []);

  useIonViewWillEnter(() => {
    void cargarSolicitudes();
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
                marginBottom: "20px",
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

            {!cargando && !mensajeError && (
              <>
                <FiltrosHistorialFuncionario
                  solicitudes={todasLasSolicitudes}
                  onFiltrar={setSolicitudesMostrar}
                  onRecargar={cargarSolicitudes}
                />

                <TablaHistorialFuncionario
                  solicitudes={solicitudesMostrar}
                  onComentar={(id) =>
                    history.push(`/funcionario/solicitud/${id}`)
                  }
                />
              </>
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

export default HistorialFuncionario;
