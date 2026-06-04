import React, { useEffect, useState } from "react";
import { IonContent, IonPage, IonSpinner, IonToast } from "@ionic/react";
import { useHistory } from "react-router-dom";

import EncabezadoAplicacion from "../../components/common/EncabezadoAplicacion";
import ContenedorPagina from "../../components/common/ContenedorPagina";
import SelectorTipoTramite from "../../components/ciudadano/SelectorTipoTramite";
import DocumentosRequeridosTramite from "../../components/ciudadano/DocumentosRequeridosTramite";
import ResumenInformacionTramite from "../../components/ciudadano/ResumenInformacionTramite";
import { ApiClientError } from "../../services/apiClient";
import {
  obtenerTramitesMunicipales,
  TramiteMunicipalApi,
} from "../../services/tramitesApi";

const InfoSolicitudes: React.FC = () => {
  const history = useHistory();

  const [tramites, setTramites] = useState<TramiteMunicipalApi[]>([]);
  const [tipoTramite, setTipoTramite] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const cargarTramites = async () => {
    try {
      setCargando(true);
      setMensajeError("");

      const tramitesApi = await obtenerTramitesMunicipales();

      setTramites(tramitesApi);

      if (!tipoTramite && tramitesApi.length > 0) {
        setTipoTramite(tramitesApi[0].tipo);
      }
    } catch (error) {
      if (error instanceof ApiClientError) {
        setMensajeError(error.message);
        return;
      }

      setMensajeError("No se pudo cargar la información de trámites.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    void cargarTramites();
  }, []);

  const informacionSeleccionada =
    tramites.find((tramite) => tramite.tipo === tipoTramite) ?? tramites[0];

  return (
    <IonPage>
      <EncabezadoAplicacion
        rol="solicitante"
        rutaNotificaciones="/ciudadano/notificaciones"
        rutaPerfil="/ciudadano/tramites"
        onNavegar={(ruta) => history.push(ruta)}
      />

      <IonContent style={{ "--background": "#ffffff" }}>
        <ContenedorPagina>
          <div
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              paddingTop: "10px",
              paddingBottom: "40px",
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
              Información sobre solicitudes
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

            {!cargando && informacionSeleccionada && (
              <div
                style={{
                  backgroundColor: "#eeeeee",
                  borderRadius: "8px",
                  padding: "30px",
                  color: "#000",
                }}
              >
                <SelectorTipoTramite
                  tipos={tramites.map((tramite) => tramite.tipo)}
                  tipoSeleccionado={tipoTramite}
                  onSeleccionarTipo={setTipoTramite}
                />

                <DocumentosRequeridosTramite
                  documentos={informacionSeleccionada.documentos}
                />

                <ResumenInformacionTramite
                  tiempoEstimado={informacionSeleccionada.tiempoEstimado}
                  areaResponsable={informacionSeleccionada.areaResponsable}
                />
              </div>
            )}

            {!cargando && !informacionSeleccionada && (
              <p style={{ color: "#333" }}>No hay trámites disponibles.</p>
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

export default InfoSolicitudes;