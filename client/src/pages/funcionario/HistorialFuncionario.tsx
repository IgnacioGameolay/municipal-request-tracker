import React, { useEffect, useState } from "react";
import { IonContent, IonPage, useIonViewWillEnter } from "@ionic/react";
import { useHistory } from "react-router-dom";

import EncabezadoAplicacion from "../../components/common/EncabezadoAplicacion";
import ContenedorPagina from "../../components/common/ContenedorPagina";
import FiltrosHistorialFuncionario from "../../components/funcionario/FiltrosHistorialFuncionario";
import TablaHistorialFuncionario from "../../components/funcionario/TablaHistorialFuncionario";

import { Solicitud } from "../../dominio/entidades/Solicitud";
import { obtenerSolicitudesGuardadas } from "../../infraestructura/almacenamiento/repositorioLocalSolicitudes";

const HistorialFuncionario: React.FC = () => {
  const history = useHistory();

  const [todasLasSolicitudes, setTodasLasSolicitudes] = useState<Solicitud[]>(
    [],
  );
  const [solicitudesMostrar, setSolicitudesMostrar] = useState<Solicitud[]>([]);

  const cargarSolicitudes = () => {
    const solicitudes = obtenerSolicitudesGuardadas();

    setTodasLasSolicitudes(solicitudes);
    setSolicitudesMostrar(solicitudes);
  };

  const cambiarRolManual = () => {
    localStorage.setItem("rol_actual", "solicitante");
    window.dispatchEvent(new Event("rolCambiado"));
    history.push("/ciudadano/tramites");
  };

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  useIonViewWillEnter(() => {
    cargarSolicitudes();
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
          <div
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
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
              Solicitudes
            </h2>

            <FiltrosHistorialFuncionario
              solicitudes={todasLasSolicitudes}
              onFiltrar={setSolicitudesMostrar}
            />

            <TablaHistorialFuncionario
              solicitudes={solicitudesMostrar}
              onComentar={(id) => history.push(`/funcionario/solicitud/${id}`)}
            />
          </div>
        </ContenedorPagina>
      </IonContent>
    </IonPage>
  );
};

export default HistorialFuncionario;
