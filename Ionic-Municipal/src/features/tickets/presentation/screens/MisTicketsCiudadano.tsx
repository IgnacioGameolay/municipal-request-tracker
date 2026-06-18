import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonSpinner,
  IonToast,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonBadge,
  useIonViewWillEnter, // <-- IMPORTAMOS EL HOOK DE IONIC
} from "@ionic/react";
import { useHistory } from "react-router-dom";

import EncabezadoAplicacion from "../../../../core/presentation/components/common/EncabezadoAplicacion";
import ContenedorPagina from "../../../../core/presentation/components/common/ContenedorPagina";
import { obtenerMisTickets, type TicketSoporteApi } from "../../data/soporteApi";

const MisTicketsCiudadano: React.FC = () => {
  const history = useHistory();
  const [misTickets, setMisTickets] = useState<TicketSoporteApi[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeToast, setMensajeToast] = useState("");

  // Reemplazamos useEffect por useIonViewWillEnter
  useIonViewWillEnter(() => {
    let montado = true;

    const cargarHistorial = async () => {
      try {
        setCargando(true);
        const listaTickets = await obtenerMisTickets();
        
        if (montado) {
          if (Array.isArray(listaTickets)) {
            setMisTickets(listaTickets);
          } else {
            console.warn("La API no devolvió un Array válido:", listaTickets);
            setMisTickets([]); 
          }
        }
      } catch (error) {
        console.error("Error al cargar tickets:", error);
        if (montado) {
          setMensajeToast("No se pudo cargar el historial de tickets.");
          setMisTickets([]);
        }
      } finally {
        if (montado) {
          setCargando(false);
        }
      }
    };
    
    void cargarHistorial();

    return () => {
      montado = false;
    };
  });

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
          <div style={{ maxWidth: "900px", margin: "0 auto", paddingTop: "30px", paddingBottom: "30px" }}>
            <h2 style={{ color: "#000", fontWeight: "bold", marginBottom: "25px", fontSize: "1.6rem" }}>
              Mis Tickets de Soporte
            </h2>

            {cargando ? (
              <div style={{ textAlign: "center", padding: "40px" }}><IonSpinner name="crescent" /></div>
              
            ) : !Array.isArray(misTickets) || misTickets.length === 0 ? (
              <p style={{ color: "#666", textAlign: "center", marginTop: "40px", fontSize: "1.1rem" }}>
                No has enviado ningún ticket de soporte al municipio.
              </p>
              
            ) : (
              misTickets.map((ticket) => {
                if (!ticket || typeof ticket !== "object" || !ticket.id) return null;

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
                          {ticket.tipo || "General"}
                        </IonCardSubtitle>
                        
                        <div style={{ 
                          display: "flex", 
                          flexDirection: "column", 
                          alignItems: "center" 
                        }}>
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

                      <IonCardTitle style={{ fontSize: "1.2rem", marginTop: "5px", color: "#000" }}>
                        {ticket.titulo || "Sin título"}
                      </IonCardTitle>
                      <IonCardSubtitle style={{ textTransform: "none" }}>
                        Fecha de envío: {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : "S/N"}
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
                          marginTop: "4px" 
                        }}>
                          {ticket.comentario || "Sin detalles adicionales."}
                        </p>
                      </div>

                      {ticket.respuestaFuncionario ? (
                        <div style={{ backgroundColor: "#eef7ed", padding: "12px", borderRadius: "6px", borderLeft: "4px solid #2dd36f" }}>
                          <span style={{ fontSize: "0.85rem", color: "#2e7d32", fontWeight: "bold" }}>Respuesta recibida:</span>
                          <p style={{ color: "#1b5e20", marginTop: "4px", whiteSpace: "pre-wrap" }}>{ticket.respuestaFuncionario}</p>
                        </div>
                      ) : (
                        <p style={{ fontSize: "0.9rem", color: "#888", fontStyle: "italic", marginTop: "10px" }}>
                          El equipo técnico está revisando tu caso. Recibirás una respuesta pronto.
                        </p>
                      )}
                    </IonCardContent>
                  </IonCard>
                );
              })
            )}
          </div>
        </ContenedorPagina>

        <IonToast
          isOpen={mensajeToast !== ""}
          message={mensajeToast}
          duration={3000}
          color="danger"
          position="bottom"
          onDidDismiss={() => setMensajeToast("")}
        />
      </IonContent>
    </IonPage>
  );
};

export default MisTicketsCiudadano;
