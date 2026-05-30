import React, { useEffect, useState } from "react";
import { IonContent, IonPage, IonToast } from "@ionic/react";
import { useHistory, useParams } from "react-router-dom";

import EncabezadoAplicacion from "../../components/common/EncabezadoAplicacion";
import ContenedorPagina from "../../components/common/ContenedorPagina";
import FormularioCrearYEditarSolicitudes from "../../components/solicitudes/FormularioCrearYEditarSolicitudes";
import DocumentacionSolicitud from "../../components/solicitudes/DocumentacionSolicitud";
import AccionesEnFomularioSolicitud from "../../components/solicitudes/AccionesEnFomularioSolicitud";

import { validarFormularioSolicitud } from "../../dominio/reglas/validarFormularioSolicitud";
import {
  actualizarSolicitud,
  crearSolicitud,
  obtenerSolicitudPorId,
} from "../../services/solicitudesApi";
import { ApiClientError } from "../../services/apiClient";
import SelectorDocumentosPendientes from "../../components/solicitudes/SelectorDocumentosPendientes";
import { subirDocumentoSolicitud } from "../../services/documentosApi";

const DESCRIPCION_EDICION_VACIA =
  "Esta es la descripción de la solicitud original. Para motivos de transparencia, no se puede editar lo que ya fue enviado, sino que solo tiene permitido agregar más información.";

function obtenerComunaUsuarioActual(): string {
  try {
    const usuarioGuardado = localStorage.getItem("usuario_actual");

    if (!usuarioGuardado) {
      return "No especificada";
    }

    const usuario = JSON.parse(usuarioGuardado) as { comuna?: string };

    return usuario.comuna || "No especificada";
  } catch {
    return "No especificada";
  }
}

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

  const esEdicion = !!id;

  const [tipo, setTipo] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcionOriginal, setDescripcionOriginal] = useState("");
  const [descripcionAgregada, setDescripcionAgregada] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [archivosPendientes, setArchivosPendientes] = useState<File[]>([]);

  const cambiarRolManual = () => {
    const rolActual = localStorage.getItem("rol_actual") || "solicitante";
    const nuevoRol =
      rolActual === "solicitante" ? "funcionario" : "solicitante";

    localStorage.setItem("rol_actual", nuevoRol);
    window.dispatchEvent(new Event("rolCambiado"));

    history.push(
      nuevoRol === "solicitante"
        ? "/ciudadano/tramites"
        : "/funcionario/tramites",
    );
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

        solicitudIdParaDocumentos = solicitudActualizada.id;
      } else {
        const solicitudCreada = await crearSolicitud({
          titulo: titulo.trim(),
          categoria: tipo.trim(),
          descripcion: descripcionOriginal.trim(),
          direccion: "Dirección no especificada",
          comuna: obtenerComunaUsuarioActual(),
          prioridad: "media",
        });

        solicitudIdParaDocumentos = solicitudCreada.id;
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
    const cargarSolicitudEdicion = async () => {
      if (!esEdicion) {
        return;
      }

      try {
        const solicitudEncontrada = await obtenerSolicitudPorId(id);

        setTitulo(solicitudEncontrada.titulo);
        setTipo(solicitudEncontrada.categoria || "Tipo 1");
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
  }, [id, esEdicion]);

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
        permitirCambioManualRol
        onCambiarRolManual={cambiarRolManual}
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

              <DocumentacionSolicitud />

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