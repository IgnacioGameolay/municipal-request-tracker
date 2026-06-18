import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonSpinner,
  IonToast,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonBadge,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonItem,
  IonLabel,
  IonTextarea,
  useIonViewWillEnter,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

import EncabezadoAplicacion from "../../../../core/presentation/components/common/EncabezadoAplicacion";
import ContenedorPagina from "../../../../core/presentation/components/common/ContenedorPagina";
import { obtenerTodosLosTickets, responderTicketSoporte, type TicketSoporteApi } from "../../data/soporteApi";

const TicketsFuncionario: React.FC = () => {
  const history = useHistory();
  const [tickets, setTickets] = useState<TicketSoporteApi[]>([]);
  const [cargando, setCargando] = useState(false);
  const [ticketSeleccionado, setTicketSeleccionado] = useState<TicketSoporteApi | null>(null);
  const [respuestaStr, setRespuestaStr] = useState("");
  const [enviando, setEnviando] = useState(false);
  
  const [filtroTipo, setFiltroTipo] = useState<string>("Todos");

  const [mensajeToast, setMensajeToast] = useState("");
  const [colorToast, setColorToast] = useState<"success" | "danger">("success");

  const cargarTickets = async () => {
    try {
      setCargando(true);
      const data = await obtenerTodosLosTickets();
      if (Array.isArray(data)) {
        setTickets(data);
      }
    } catch (error) {
      console.error(error);
      mostrarToast("Error al cargar los tickets", "danger");
    } finally {
      setCargando(false);
    }
  };

  useIonViewWillEnter(() => {
    void cargarTickets();
  });

  const mostrarToast = (mensaje: string, color: "success" | "danger") => {
    setMensajeToast(mensaje);
    setColorToast(color);
  };

  const abrirModalRespuesta = (ticket: TicketSoporteApi) => {
    setTicketSeleccionado(ticket);
    setRespuestaStr(ticket.respuestaFuncionario || "");
  };

  const manejarEnvioRespuesta = async () => {
    if (!ticketSeleccionado || !respuestaStr.trim()) return;

    try {
      setEnviando(true);
      await responderTicketSoporte(ticketSeleccionado.id, respuestaStr);
      mostrarToast("Respuesta enviada exitosamente", "success");
      setTicketSeleccionado(null);
      await cargarTickets(); 
    } catch (error) {
      mostrarToast("No se pudo enviar la respuesta", "danger");
    } finally {
      setEnviando(false);
    }
  };

  const tiposUnicos = Array.from(
    new Set(tickets.map((t) => t.tipo).filter(Boolean))
  );

  const ticketsFiltrados = filtroTipo === "Todos" 
    ? tickets 
    : tickets.filter(t => t.tipo === filtroTipo);

  return (
    <IonPage>

      <EncabezadoAplicacion
        rol="funcionario"
        rutaNotificaciones="/funcionario/notificaciones"
        rutaPerfil="/funcionario/bandeja"
        onNavegar={(ruta) => history.push(ruta)}
      />

      <IonContent style={{ "--background": "#ffffff" }}>
        <ContenedorPagina>
          <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px 0" }}>
            
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              marginBottom: "20px",
              flexWrap: "wrap",
              gap: "10px"
            }}>
              <h2 style={{ color: "#000", fontWeight: "bold", margin: 0 }}>
                Bandeja de Soporte de Tickets
              </h2>

              {!cargando && tickets.length > 0 && (
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  backgroundColor: "#f4f5f8", 
                  borderRadius: "8px", 
                  padding: "2px 10px",
                  border: "1px solid #e0e0e0"
                }}>
                  <span style={{ fontSize: "0.85rem", color: "#666", marginRight: "5px", fontWeight: "bold" }}>
                    Filtrar:
                  </span>
                  <IonSelect
                    interface="popover"
                    value={filtroTipo}
                    onIonChange={(e) => setFiltroTipo(e.detail.value)}
                    style={{ minWidth: "150px" }}
                  >
                    <IonSelectOption value="Todos">Todos los tipos</IonSelectOption>
                    {tiposUnicos.map((tipo) => (
                      <IonSelectOption key={tipo} value={tipo}>
                        {tipo}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </div>
              )}
            </div>

            {cargando ? (
              <div style={{ textAlign: "center", padding: "40px" }}><IonSpinner /></div>
            ) : tickets.length === 0 ? (
              <p style={{ textAlign: "center", color: "#666" }}>No hay tickets de soporte en el sistema.</p>
            ) : ticketsFiltrados.length === 0 ? (
              <p style={{ textAlign: "center", color: "#666" }}>No hay tickets que coincidan con el tipo seleccionado.</p>
            ) : (
              ticketsFiltrados.map((ticket) => {
                const estadoRaw = ticket.estado || "pendiente";
                const estadoFormateado = estadoRaw
                  .replace(/_/g, " ")
                  .charAt(0).toUpperCase() + estadoRaw.replace(/_/g, " ").slice(1).toLowerCase();

                return (
                  <IonCard key={ticket.id} style={{
                    backgroundColor: "#f4f5f8",
                    margin: "0 0 20px 0",
                    border: "1px solid #e0e0e0",
                    boxShadow: "none" 
                  }}>
                    <IonCardHeader>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                        }}>
                        <IonCardSubtitle style={{ color: "#145079", fontWeight: "bold" }}>
                          {ticket.tipo}
                        </IonCardSubtitle>
                        
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                          <span style={{ 
                            fontSize: "0.75rem", 
                            color: "#666", 
                            marginBottom: "4px",
                            fontWeight: "500",
                            textAlign: "center"
                          }}>
                            Estado del ticket
                          </span>
                          <IonBadge 
                            color={ticket.estado === "pendiente" ? "warning" : "success"}
                            style={{ 
                              color: "#ffffff", 
                              padding: "6px 12px", 
                              borderRadius: "8px",
                              fontSize: "0.85rem"
                            }}
                          >
                            {estadoFormateado}
                          </IonBadge>
                        </div>
                      </div>

                      <IonCardTitle style={{ fontSize: "1.2rem", marginTop: "2px", marginBottom: "5px", color: "#000" }}>
                        {ticket.titulo}
                      </IonCardTitle>
                      
                      {ticket.solicitudId && (
                        <IonCardSubtitle style={{ textTransform: "none", color: "#707070" }}>
                          <strong>Nro. Solicitud:</strong> {ticket.solicitudId.split("-")[0]}
                        </IonCardSubtitle>
                      )}

                      <IonCardSubtitle style={{ textTransform: "none", color: "#707070" }}>
                        <strong>Enviado por:</strong> {ticket.usuario?.nombre || "Desconocido"} ({ticket.usuario?.rut || "Sin RUT"})
                      </IonCardSubtitle>
                    </IonCardHeader>
                    
                    <IonCardContent>
                      <div style={{
                        backgroundColor: "#dfdfdf",
                        padding: "12px",
                        borderRadius: "6px",
                        marginBottom: "15px" 
                      }}>
                        <span style={{
                          fontSize: "0.85rem",
                          color: "#333",
                          fontWeight: "bold" 
                        }}>
                          Mensaje adjunto:
                        </span>
                        <p style={{
                          color: "#333",
                          marginTop: "4px",
                          whiteSpace: "pre-wrap"
                        }}>
                          {ticket.comentario || "Sin detalles adicionales."}
                        </p>
                      </div>
                      <IonButton fill="outline" onClick={() => abrirModalRespuesta(ticket)}>
                        {ticket.estado === "pendiente" ? "Responder Ticket" : "Ver Detalles"}
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                );
              })
            )}
          </div>
        </ContenedorPagina>

        <IonModal 
          isOpen={!!ticketSeleccionado} 
          onDidDismiss={() => setTicketSeleccionado(null)}
          style={{
            '--width': '100%',
            '--max-width': '750px',
            '--border-radius': '14px',
            '--box-shadow': 'none', 
            '--background': 'transparent', 
          }}
        >
          <IonContent 
            scrollY={false}
            style={{ 
              '--background': 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            {ticketSeleccionado && (
              <div
                style={{
                  backgroundColor: "#f4f5f8",
                  borderRadius: "14px",
                  padding: "35px 45px",
                  width: "calc(100% - 40px)",
                  maxWidth: "700px",
                  maxHeight: "85vh",
                  overflowY: "auto",
                  position: "relative",
                  boxSizing: "border-box"
                }}
              >
                <button
                  onClick={() => setTicketSeleccionado(null)}
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "20px",
                    background: "transparent",
                    border: "none",
                    fontSize: "28px",
                    fontWeight: "bold",
                    color: "#666",
                    cursor: "pointer",
                    lineHeight: 1,
                  }}
                  aria-label="Cerrar"
                >
                  ×
                </button>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                  <h2 style={{ margin: 0, color: "#000", fontWeight: "bold", fontSize: "1.4rem", paddingRight: "10px" }}>
                    {ticketSeleccionado.titulo}
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <span style={{ fontSize: "0.75rem", color: "#666", marginBottom: "4px", fontWeight: "500" }}>
                      Estado del ticket
                    </span>
                    <IonBadge
                      color={ticketSeleccionado.estado === "pendiente" ? "warning" : "success"}
                      style={{ color: "#ffffff", padding: "6px 12px", borderRadius: "8px", fontSize: "0.85rem" }}
                    >
                      {ticketSeleccionado.estado.replace(/_/g, " ").charAt(0).toUpperCase() +
                        ticketSeleccionado.estado.replace(/_/g, " ").slice(1).toLowerCase()}
                    </IonBadge>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid #ddd", paddingTop: "15px", marginBottom: "20px", display: "grid", gap: "10px" }}>
                  <div style={{ display: "flex" }}>
                    <span style={{ width: "130px", fontWeight: "bold", color: "#555", fontSize: "0.9rem" }}>Tipo de Solicitud:</span>
                    <span style={{ color: "#333", fontSize: "0.9rem" }}>{ticketSeleccionado.tipo}</span>
                  </div>
                  <div style={{ display: "flex" }}>
                    <span style={{ width: "130px", fontWeight: "bold", color: "#555", fontSize: "0.9rem" }}>Solicitante:</span>
                    <span style={{ color: "#333", fontSize: "0.9rem" }}>
                      {ticketSeleccionado.usuario?.nombre || "Desconocido"} ({ticketSeleccionado.usuario?.rut || "Sin RUT"})
                    </span>
                  </div>
                  {ticketSeleccionado.solicitudId && (
                    <div style={{ display: "flex" }}>
                      <span style={{ width: "130px", fontWeight: "bold", color: "#555", fontSize: "0.9rem" }}>Nro. Solicitud:</span>
                      <span style={{ color: "#333", fontSize: "0.9rem" }}>{ticketSeleccionado.solicitudId.split("-")[0]}</span>
                    </div>
                  )}
                </div>

                <div
                  style={{
                    backgroundColor: "#dfdfdf",
                    padding: "16px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                  }}
                >
                  <span style={{ fontSize: "0.9rem", color: "#333", fontWeight: "bold" }}>Mensaje adjunto:</span>
                  <p
                    style={{
                      color: "#333",
                      marginTop: "8px",
                      whiteSpace: "pre-wrap",
                      lineHeight: "1.5",
                    }}
                  >
                    {ticketSeleccionado.comentario || "Sin detalles adicionales."}
                  </p>
                </div>

                <div>
                  <label style={{ display: "block", fontWeight: "bold", color: "#333", marginBottom: "10px" }}>
                    Tu Respuesta
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Escribe la solución o respuesta aquí..."
                    value={respuestaStr}
                    onChange={(e) => setRespuestaStr(e.target.value)}
                    disabled={ticketSeleccionado.estado !== "pendiente"}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      backgroundColor: ticketSeleccionado.estado !== "pendiente" ? "#e9ecef" : "#fff",
                      color: "#333",
                      fontSize: "0.95rem",
                      fontFamily: "inherit",
                      resize: "vertical",
                    }}
                  />

                  {ticketSeleccionado.estado === "pendiente" && (
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                      <button
                        onClick={manejarEnvioRespuesta}
                        disabled={enviando || !respuestaStr.trim()}
                        style={{
                          backgroundColor: enviando || !respuestaStr.trim() ? "#a49cdb" : "#5124cc",
                          color: "white",
                          fontWeight: "bold",
                          fontSize: "1rem",
                          border: "none",
                          borderRadius: "6px",
                          padding: "12px 30px",
                          cursor: enviando || !respuestaStr.trim() ? "not-allowed" : "pointer",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "background-color 0.2s",
                        }}
                      >
                        {enviando ? <IonSpinner name="dots" color="light" /> : "Enviar respuesta"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </IonContent>
        </IonModal>

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

export default TicketsFuncionario;
