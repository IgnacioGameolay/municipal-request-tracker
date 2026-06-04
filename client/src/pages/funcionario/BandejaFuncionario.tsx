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
import FiltrosBandejaFuncionario from "../../components/funcionario/FiltrosBandejaFuncionario";
import TablaBandejaFuncionario from "../../components/funcionario/TablaBandejaFuncionario";

import { Solicitud } from "../../dominio/entidades/Solicitud";
import { obtenerSolicitudes } from "../../services/solicitudesApi";
import { mapSolicitudesApiToSolicitudes } from "../../services/solicitudesMapper";
import { ApiClientError } from "../../services/apiClient";

const BandejaFuncionario: React.FC = () => {
  const history = useHistory();

  const [todasLasSolicitudes, setTodasLasSolicitudes] = useState<Solicitud[]>(
    [],
  );
  const [solicitudesMostrar, setSolicitudesMostrar] = useState<Solicitud[]>([]);
  const [cargando, setCargando] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const cargarSolicitudes = async () => {
    try {
      setCargando(true);
      setMensajeError("");

      const solicitudesApi = await obtenerSolicitudes();
      const solicitudes = mapSolicitudesApiToSolicitudes(solicitudesApi);

      setTodasLasSolicitudes(solicitudes);
      setSolicitudesMostrar(solicitudes);
    } catch (error) {
      if (error instanceof ApiClientError) {
        setMensajeError(error.message);
        return;
      }

      if (error instanceof Error) {
        setMensajeError(error.message);
        return;
      }

      setMensajeError("No se pudieron cargar las solicitudes.");
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
              Bandeja de Gestión de Solicitudes
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
                <FiltrosBandejaFuncionario
                  solicitudes={todasLasSolicitudes}
                  onFiltrar={setSolicitudesMostrar}
                />

                <TablaBandejaFuncionario
                  solicitudes={solicitudesMostrar}
                  onRevisar={(id) =>
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

export default BandejaFuncionario;