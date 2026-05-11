import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router-dom";

import EncabezadoAplicacion from "../../components/common/EncabezadoAplicacion";
import ContenedorPagina from "../../components/common/ContenedorPagina";
import TarjetaPerfilFuncionario from "../../components/funcionario/TarjetaPerfilFuncionario";

import { funcionariosSimulados } from "../../infraestructura/simulacionDatos/funcionariosSimulados";

const DashboardFuncionario: React.FC = () => {
  const history = useHistory();

  const cambiarRolManual = () => {
    localStorage.setItem("rol_actual", "solicitante");
    window.dispatchEvent(new Event("rolCambiado"));
    history.push("/ciudadano/tramites");
  };

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

            <TarjetaPerfilFuncionario funcionario={funcionariosSimulados} />
          </div>
        </ContenedorPagina>
      </IonContent>
    </IonPage>
  );
};

export default DashboardFuncionario;
