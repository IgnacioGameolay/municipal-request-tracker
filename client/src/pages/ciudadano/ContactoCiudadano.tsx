import React, { useEffect, useState } from "react";
import { IonContent, IonPage, IonSpinner, IonToast } from "@ionic/react";
import { useHistory } from "react-router-dom";

import EncabezadoAplicacion from "../../components/common/EncabezadoAplicacion";
import ContenedorPagina from "../../components/common/ContenedorPagina";
import ListaContactosFuncionarios from "../../components/ciudadano/ListaContactosFuncionarios";
import type { ContactoFuncionario } from "../../dominio/entidades/ContactoFuncionario";
import { ApiClientError } from "../../services/apiClient";
import { obtenerFuncionariosContacto } from "../../services/usuariosApi";

const ContactoCiudadano: React.FC = () => {
  const history = useHistory();

  const [funcionarios, setFuncionarios] = useState<ContactoFuncionario[]>([]);
  const [cargando, setCargando] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const cargarFuncionarios = async () => {
    try {
      setCargando(true);
      setMensajeError("");

      const funcionariosApi = await obtenerFuncionariosContacto();

      setFuncionarios(
        funcionariosApi.map((funcionario) => ({
          id: funcionario.id,
          nombre: funcionario.nombre,
          rut: funcionario.rut,
          email: funcionario.email,
          region: funcionario.region,
          comuna: funcionario.comuna,
          rol: funcionario.rol,
        })),
      );
    } catch (error) {
      if (error instanceof ApiClientError) {
        setMensajeError(error.message);
        return;
      }

      setMensajeError("No se pudieron cargar los contactos de funcionarios.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    void cargarFuncionarios();
  }, []);

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
              paddingTop: "30px",
              paddingBottom: "30px",
            }}
          >
            <h2
              style={{
                color: "#000",
                fontWeight: "bold",
                marginBottom: "25px",
                fontSize: "1.6rem",
              }}
            >
              Contacto
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

            {!cargando && (
              <ListaContactosFuncionarios funcionarios={funcionarios} />
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

export default ContactoCiudadano;