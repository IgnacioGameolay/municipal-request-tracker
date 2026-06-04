import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router-dom";

import EncabezadoAplicacion from "../../components/common/EncabezadoAplicacion";
import ContenedorPagina from "../../components/common/ContenedorPagina";
import TarjetaPerfilFuncionario from "../../components/funcionario/TarjetaPerfilFuncionario";
import { useAuth } from "../../context/AuthContext";

const DashboardFuncionario: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();

  return (
    <IonPage>
      <EncabezadoAplicacion
        rol="funcionario"
        rutaNotificaciones="/funcionario/notificaciones"
        rutaPerfil="/funcionario/tramites"
        onNavegar={(ruta) => history.push(ruta)}
      />

      <IonContent style={{ "--background": "#ffffff" }}>
        <ContenedorPagina>
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              paddingTop: "10px",
            }}
          >
            <h2
              style={{
                color: "#000",
                fontWeight: "bold",
                marginBottom: "20px",
                fontSize: "1.5rem",
              }}
            >
              Información personal
            </h2>

            {user ? (
              <TarjetaPerfilFuncionario usuario={user} />
            ) : (
              <p style={{ color: "#333" }}>
                No se pudo cargar la información del usuario autenticado.
              </p>
            )}
          </div>
        </ContenedorPagina>
      </IonContent>
    </IonPage>
  );
};

export default DashboardFuncionario;