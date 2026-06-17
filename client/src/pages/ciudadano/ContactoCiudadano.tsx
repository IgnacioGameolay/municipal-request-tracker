import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonSpinner,
  IonToast,
  IonInput,
  IonSelect,
  IonSelectOption,
  useIonViewWillEnter, // <-- IMPORTAMOS EL HOOK AQUÍ
} from "@ionic/react";
import { useHistory } from "react-router-dom";

import EncabezadoAplicacion from "../../components/common/EncabezadoAplicacion";
import ContenedorPagina from "../../components/common/ContenedorPagina";
import { ApiClientError } from "../../services/apiClient";
import { enviarTicketSoporte } from "../../services/soporteApi";
import { obtenerSolicitudes, type SolicitudApi } from "../../services/solicitudesApi";

const ContactoCiudadano: React.FC = () => {
  const history = useHistory();

  const [solicitudesUsuario, setSolicitudesUsuario] = useState<SolicitudApi[]>([]);
  const [cargandoSolicitudes, setCargandoSolicitudes] = useState(false);

  const [solicitudId, setSolicitudId] = useState<string | undefined>(undefined);
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [comentario, setComentario] = useState("");

  const [enviando, setEnviando] = useState(false);
  const [mensajeToast, setMensajeToast] = useState("");
  const [colorToast, setColorToast] = useState<"success" | "danger">("danger");

  const estiloEtiqueta = {
    display: "block",
    fontSize: "0.9rem",
    color: "#333",
    marginBottom: "8px",
    fontWeight: "500",
  };

  const estiloControl = {
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "4px",
    minHeight: "40px",
    width: "100%",
    paddingLeft: "10px",
    color: "#555",
    fontSize: "0.9rem",
  };

  // Reemplazamos useEffect por useIonViewWillEnter
  useIonViewWillEnter(() => {
    const cargarSolicitudesPrevias = async () => {
      try {
        setCargandoSolicitudes(true);
        const listaSolicitudes = await obtenerSolicitudes();
        if (Array.isArray(listaSolicitudes)) {
          setSolicitudesUsuario(listaSolicitudes);
        }
      } catch (error) {
        console.error("Error al cargar solicitudes previas:", error);
        setSolicitudesUsuario([]);
      } finally {
        setCargandoSolicitudes(false);
      }
    };

    void cargarSolicitudesPrevias();
    
    // Limpiar estado al entrar a la vista para evitar valores de tickets anteriores
    setSolicitudId(undefined);
    setTitulo("");
    setTipo("");
    setComentario("");
  });

  const manejarCambioSolicitud = (idSeleccionado: string | undefined) => {
    if (!idSeleccionado || idSeleccionado === "") {
      setSolicitudId(undefined);
      setTitulo("");
      setTipo("");
      return;
    }

    const solicitudEncontrada = solicitudesUsuario.find((s) => s.id === idSeleccionado);
    if (solicitudEncontrada) {
      setSolicitudId(idSeleccionado);
      setTitulo(solicitudEncontrada.titulo);
      setTipo(solicitudEncontrada.categoria);
    } else {
      setSolicitudId(undefined);
      setTitulo("");
      setTipo("");
    }
  };

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!solicitudId || !comentario.trim()) {
      setColorToast("danger");
      setMensajeToast("Por favor, selecciona una solicitud y escribe el detalle de tu problema.");
      return;
    }

    if (!titulo || !tipo) {
      setColorToast("danger");
      setMensajeToast("Error al cargar los datos de la solicitud. Por favor intenta seleccionarla de nuevo.");
      return;
    }

    try {
      setEnviando(true);

      await enviarTicketSoporte({
        solicitudId,
        titulo,
        tipo,
        comentario,
      });

      setColorToast("success");
      setMensajeToast("Tu ticket ha sido enviado a soporte exitosamente.");

      setSolicitudId(undefined);
      setTitulo("");
      setTipo("");
      setComentario("");

    } catch (error) {
      setColorToast("danger");
      if (error instanceof ApiClientError) {
        setMensajeToast(error.message);
      } else {
        setMensajeToast("No se pudo enviar el ticket. Intenta nuevamente más tarde.");
      }
    } finally {
      setEnviando(false);
    }
  };

  return (
    <IonPage>
      <style>
        {`.custom-select-popover { --width: 100%; max-width: 550px; }`}
      </style>

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
              maxWidth: "600px",
              margin: "0 auto",
              paddingTop: "30px",
              paddingBottom: "30px",
            }}
          >
            <h2
              style={{
                color: "#000",
                fontWeight: "bold",
                marginBottom: "20px",
                fontSize: "1.6rem",
              }}
            >
              Enviar ticket al soporte
            </h2>

            <div
              style={{
                backgroundColor: "#f9fafb",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "25px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <p style={{ marginTop: "0", marginBottom: "20px", color: "#666" }}>
                Si tienes problemas con una solicitud o necesitas ayuda, crea un ticket detallando tu situación.
              </p>

              <form onSubmit={manejarEnvio} autoComplete="off">
                <div style={{ marginBottom: "20px" }}>
                  <label style={estiloEtiqueta}>Nro. Solicitud *</label>
                  {cargandoSolicitudes ? (
                    <div style={{ padding: "10px 0" }}>
                      <IonSpinner name="dots" />
                    </div>
                  ) : (
                    <IonSelect
                      className="custom-select"
                      interface="popover"
                      interfaceOptions={{
                        cssClass: "custom-select-popover",
                        alignment: "start",
                        matchWidth: true,
                      }}
                      placeholder="Seleccione una solicitud..."
                      value={solicitudId}
                      onIonChange={(e) => manejarCambioSolicitud(e.detail.value)}
                      okText="Aceptar"
                      cancelText="Cancelar"
                      style={{
                        ...estiloControl,
                        paddingLeft: "10px",
                      }}
                    >
                      <IonSelectOption key="limpiar" value="">
                        Seleccione una solicitud...
                      </IonSelectOption>
                      {solicitudesUsuario.map((solicitud) => {
                        const idCorto = solicitud?.id?.split("-")[0] ?? "S/N";
                        return (
                          <IonSelectOption key={solicitud.id} value={solicitud.id}>
                            {idCorto} - {solicitud.titulo}
                          </IonSelectOption>
                        );
                      })}
                    </IonSelect>
                  )}
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={estiloEtiqueta}>Título de la solicitud</label>
                  <IonInput
                    type="text"
                    value={titulo}
                    disabled={true}
                    readonly={true}
                    style={{
                      ...estiloControl,
                      backgroundColor: "#e9ecef",
                      color: "#555",
                      opacity: 1,
                    }}
                  />
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={estiloEtiqueta}>Tipo de Solicitud</label>
                  <IonInput
                    type="text"
                    value={tipo}
                    disabled={true}
                    readonly={true}
                    style={{
                      ...estiloControl,
                      backgroundColor: "#e9ecef",
                      color: "#555",
                      opacity: 1,
                    }}
                  />
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={estiloEtiqueta}>Comentario / Detalles *</label>
                  <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    rows={5}
                    style={{
                      width: "100%",
                      height: "150px",
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      padding: "10px",
                      resize: "none",
                      color: "#000",
                      fontFamily: "inherit",
                      fontSize: "0.9rem",
                    }}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                  <button
                    type="submit"
                    disabled={enviando}
                    style={{
                      backgroundColor: "#5124cc",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      border: "none",
                      borderRadius: "4px",
                      padding: "15px 40px",
                      cursor: enviando ? "not-allowed" : "pointer",
                      width: "300px",
                      opacity: enviando ? 0.7 : 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {enviando ? <IonSpinner name="crescent" color="light" /> : "Enviar Ticket"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </ContenedorPagina>

        <IonToast
          isOpen={mensajeToast !== ""}
          message={mensajeToast}
          duration={3000}
          color={colorToast}
          position="bottom"
          onDidDismiss={() => setMensajeToast("")}
        />
      </IonContent>
    </IonPage>
  );
};

export default ContactoCiudadano;