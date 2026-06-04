import React, { useEffect, useState } from "react";
import { IonContent, IonPage, IonToast } from "@ionic/react";
import { useHistory, useParams } from "react-router-dom";

import EncabezadoAplicacion from "../../components/common/EncabezadoAplicacion";
import ContenedorPagina from "../../components/common/ContenedorPagina";
import FormularioCrearYEditarSolicitudes from "../../components/solicitudes/FormularioCrearYEditarSolicitudes";
import AccionesEnFomularioSolicitud from "../../components/solicitudes/AccionesEnFomularioSolicitud";
import SelectorDocumentosPendientes from "../../components/solicitudes/SelectorDocumentosPendientes";

import { validarFormularioSolicitud } from "../../dominio/reglas/validarFormularioSolicitud";
import {
  actualizarSolicitud,
  crearSolicitud,
  obtenerSolicitudPorId,
} from "../../services/solicitudesApi";
import { ApiClientError } from "../../services/apiClient";
import { subirDocumentoSolicitud } from "../../services/documentosApi";
import { obtenerTramitesMunicipales } from "../../services/tramitesApi";
import { useAuth } from "../../context/AuthContext";

const DESCRIPCION_EDICION_VACIA =
  "No hay descripción registrada para esta solicitud.";

function construirDescripcionEditada(
  descripcionOriginal: string,
  descripcionAgregada: string,
): string {
  const original = descripcionOriginal.trim();
  const agregado = descripcionAgregada.trim();

  if (!agregado) {
    return original;
  }

  return `${original}\n\nInformación adicional del solicitante:\n${agregado}`;
}

const RealizarSolicitud: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { user } = useAuth();

  const esEdicion = !!id;

  const [tipo, setTipo] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcionOriginal, setDescripcionOriginal] = useState("");
  const [descripcionAgregada, setDescripcionAgregada] = useState("");
  const [opcionesTramites, setOpcionesTramites] = useState<string[]>([]);
  const [mensajeError, setMensajeError] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [archivosPendientes, setArchivosPendientes] = useState<File[]>([]);

  const cargarTramites = async () => {
    try {
      const tramites = await obtenerTramitesMunicipales();
      setOpcionesTramites(tramites.map((tramite) => tramite.tipo));
    } catch (error) {
      if (error instanceof ApiClientError) {
        setMensajeError(error.message);
        return;
      }

      setMensajeError("No se pudieron cargar los tipos de trámite.");
    }
  };

  const guardarFormulario = async () => {
    const error = validarFormularioSolicitud({
      tipo,
      titulo,
      descripcionOriginal,
      descripcionAgregada,
      esEdicion,
    });

    if (error) {
      setMensajeError(error);
      return;
    }

    if (!user) {
      setMensajeError("No se pudo obtener la sesión del usuario autenticado.");
      return;
    }

    try {
      setGuardando(true);
      setMensajeError("");

      let solicitudIdParaDocumentos = id;

      if (esEdicion) {
        const solicitudActualizada = await actualizarSolicitud(id, {
          titulo: titulo.trim(),
          categoria: tipo.trim(),
          descripcion: construirDescripcionEditada(
            descripcionOriginal,
            descripcionAgregada,
          ),
        });

        solicitudIdParaDocumentos = solicitudActualizada.id.toString();
      } else {
        const solicitudCreada = await crearSolicitud({
          titulo: titulo.trim(),
          categoria: tipo.trim(),
          descripcion: descripcionOriginal.trim(),
          direccion: `${user.comuna}, ${user.region}`,
          comuna: user.comuna,
          prioridad: "media",
        });

        solicitudIdParaDocumentos = solicitudCreada.id.toString();
      }

      for (const archivo of archivosPendientes) {
        await subirDocumentoSolicitud(String(solicitudIdParaDocumentos), archivo);
      }

      setArchivosPendientes([]);

      history.push("/ciudadano/historial");
    } catch (error) {
      if (error instanceof ApiClientError) {
        setMensajeError(error.message);
        return;
      }

      if (error instanceof Error) {
        setMensajeError(error.message);
        return;
      }

      setMensajeError("No se pudo guardar la solicitud.");
    } finally {
      setGuardando(false);
    }
  };

  useEffect(() => {
    void cargarTramites();
  }, []);

  useEffect(() => {
    const cargarSolicitudEdicion = async () => {
      if (!esEdicion) {
        return;
      }

      try {
        const solicitudEncontrada = await obtenerSolicitudPorId(id);

        if (solicitudEncontrada.estado !== "pendiente") {
          setMensajeError(
            "Solo puedes editar solicitudes pendientes. Esta solicitud ya está en revisión, resuelta o rechazada.",
          );
          history.replace("/ciudadano/historial");
          return;
        }

        setTitulo(solicitudEncontrada.titulo);
        setTipo(solicitudEncontrada.categoria || "");
        setDescripcionOriginal(
          solicitudEncontrada.descripcion || DESCRIPCION_EDICION_VACIA,
        );
      } catch (error) {
        if (error instanceof ApiClientError) {
          setMensajeError(error.message);
          return;
        }

        setMensajeError("No se encontró la solicitud que quieres editar.");
      }
    };

    void cargarSolicitudEdicion();
  }, [id, esEdicion, history]);

  useEffect(() => {
    if (!esEdicion) {
      setTipo("");
      setTitulo("");
      setDescripcionOriginal("");
      setDescripcionAgregada("");
      setArchivosPendientes([]);
    }
  }, [esEdicion]);

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
              maxWidth: "900px",
              margin: "0 auto",
              paddingBottom: "20px",
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
              {esEdicion ? "Editar solicitud" : "Realizar nueva solicitud"}
            </h2>

            <div
              style={{
                backgroundColor: "#f4f5f8",
                borderRadius: "8px",
                padding: "30px",
                border: "1px solid #e0e0e0",
                opacity: guardando ? 0.7 : 1,
                pointerEvents: guardando ? "none" : "auto",
              }}
            >
              <FormularioCrearYEditarSolicitudes
                tipo={tipo}
                titulo={titulo}
                descripcionOriginal={descripcionOriginal}
                descripcionAgregada={descripcionAgregada}
                esEdicion={esEdicion}
                opcionesTramites={opcionesTramites}
                onCambiarTipo={setTipo}
                onCambiarTitulo={setTitulo}
                onCambiarDescripcionOriginal={setDescripcionOriginal}
                onCambiarDescripcionAgregada={setDescripcionAgregada}
              />

              <SelectorDocumentosPendientes
                archivos={archivosPendientes}
                onCambiarArchivos={setArchivosPendientes}
                onError={setMensajeError}
                disabled={guardando}
              />

              <AccionesEnFomularioSolicitud
                esEdicion={esEdicion}
                onGuardar={guardarFormulario}
                onVolver={() => history.goBack()}
              />
            </div>
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

export default RealizarSolicitud;