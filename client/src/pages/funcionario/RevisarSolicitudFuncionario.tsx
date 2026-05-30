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
import FormularioSolicitud from "../../components/solicitudes/FormularioSolicitud";
import DocumentacionSolicitud from "../../components/solicitudes/DocumentacionSolicitud";
import RevisionSolicitud from "../../components/solicitudes/RevisionSolicitud";
import ModalCambioDeEstado from "../../components/solicitudes/ModalCambioDeEstado";
import ModalSolicitudRechazada from "../../components/solicitudes/ModalSolicitudRechazada";

import { Solicitud } from "../../dominio/entidades/Solicitud";
import {
  cambiarEstadoSolicitud,
  EstadoSolicitud,
  obtenerSolicitudPorId,
} from "../../services/solicitudesApi";
import { mapSolicitudApiToSolicitud } from "../../services/solicitudesMapper";
import { ApiClientError } from "../../services/apiClient";

function mapEstadoVisualToApi(estadoVisual: string): EstadoSolicitud | null {
  const estadoNormalizado = estadoVisual.trim().toLowerCase();

  const mapa: Record<string, EstadoSolicitud> = {
    pendiente: "pendiente",
    recibido: "pendiente",
    "en revisión": "en_revision",
    "en revision": "en_revision",
    aprobada: "resuelta",
    aprobado: "resuelta",
    resuelta: "resuelta",
    resuelto: "resuelta",
    rechazada: "rechazada",
    rechazado: "rechazada",
  };

  return mapa[estadoNormalizado] ?? null;
}

const RevisarSolicitudFuncionario: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [solicitud, setSolicitud] = useState<Solicitud | null>(null);
  const [comentario, setComentario] = useState("");
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");

  const [mostrarModalActualizar, setMostrarModalActualizar] = useState(false);
  const [mostrarModalRechazar, setMostrarModalRechazar] = useState(false);

  const [cargando, setCargando] = useState(false);
  const [guardando, setGuardando] = useState(false);
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

  const abrirModalActualizar = () => {
    setEstadoSeleccionado("");
    setMostrarModalActualizar(true);
  };

  const cerrarModalActualizar = () => {
    setMostrarModalActualizar(false);
    setEstadoSeleccionado("");
  };

  const cerrarModalRechazar = () => {
    setMostrarModalRechazar(false);
  };

  const cerrarModales = () => {
    setMostrarModalActualizar(false);
    setMostrarModalRechazar(false);
    setEstadoSeleccionado("");
  };

  const confirmarActualizacion = async (estadoFinalVisual: string) => {
    if (!estadoFinalVisual) {
      setMensajeError("Debes seleccionar un estado nuevo.");
      return;
    }

    const estadoApi = mapEstadoVisualToApi(estadoFinalVisual);

    if (!estadoApi) {
      setMensajeError(`Estado no válido: ${estadoFinalVisual}`);
      return;
    }

    try {
      setGuardando(true);
      setMensajeError("");

      const solicitudActualizadaApi = await cambiarEstadoSolicitud(id, {
        estado: estadoApi,
        comentarioFuncionario: comentario,
      });

      const solicitudActualizadaVista =
        mapSolicitudApiToSolicitud(solicitudActualizadaApi);

      setSolicitud(solicitudActualizadaVista);
      setComentario("");
      cerrarModales();

      history.push("/funcionario/bandeja");
    } catch (error) {
      if (error instanceof ApiClientError) {
        setMensajeError(error.message);
        return;
      }

      if (error instanceof Error) {
        setMensajeError(error.message);
        return;
      }

      setMensajeError("No se pudo actualizar la solicitud.");
    } finally {
      setGuardando(false);
    }
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
        rol="funcionario"
        rutaNotificaciones="/funcionario/notificaciones"
        rutaPerfil="/funcionario/tramites"
        onNavegar={(ruta) => history.push(ruta)}
        permitirCambioManualRol
        onCambiarRolManual={cambiarRolManual}
      />

      <IonContent style={{ "--background": "#ffffff" }}>
        <ContenedorPagina>
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

          {!cargando && !solicitud && (
            <>
              <p style={{ color: "#333", fontSize: "1rem" }}>
                {mensajeError || "No se encontró la solicitud solicitada."}
              </p>

              <button
                onClick={() => history.push("/funcionario/bandeja")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#333",
                  fontSize: "1rem",
                  cursor: "pointer",
                  padding: 0,
                  marginTop: "15px",
                }}
              >
                Volver a bandeja
              </button>
            </>
          )}

          {!cargando && solicitud && (
            <div
              style={{
                maxWidth: "900px",
                margin: "0 auto",
                paddingBottom: "20px",
                opacity: guardando ? 0.7 : 1,
                pointerEvents: guardando ? "none" : "auto",
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
                Información de la solicitud
              </h2>

              <div
                style={{
                  backgroundColor: "#f4f5f8",
                  borderRadius: "8px",
                  padding: "30px",
                  border: "1px solid #e0e0e0",
                }}
              >
                <ResumenSolicitud solicitud={solicitud} />

                <FormularioSolicitud
                  solicitud={solicitud}
                  comentario={comentario}
                  onCambiarComentario={setComentario}
                />

                <DocumentacionSolicitud />

                <RevisionSolicitud
                  onRechazar={() => setMostrarModalRechazar(true)}
                  onActualizar={abrirModalActualizar}
                  onVolver={() => history.goBack()}
                />
              </div>
            </div>
          )}

          {solicitud && (
            <>
              <ModalCambioDeEstado
                abierto={mostrarModalActualizar}
                solicitud={solicitud}
                estadoSeleccionado={estadoSeleccionado}
                onCambiarEstado={setEstadoSeleccionado}
                onConfirmar={() => confirmarActualizacion(estadoSeleccionado)}
                onCancelar={cerrarModalActualizar}
              />

              <ModalSolicitudRechazada
                abierto={mostrarModalRechazar}
                onConfirmar={() => confirmarActualizacion("Rechazada")}
                onCancelar={cerrarModalRechazar}
              />
            </>
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

export default RevisarSolicitudFuncionario;