import React, { useEffect, useState } from "react";
import { IonReactRouter } from "@ionic/react-router";
import { IonRouterOutlet } from "@ionic/react";
import { Route, Redirect } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

import LoginPage from "../../features/auth/presentation/screens/LoginPage";
import CambiarPassword from "../../features/auth/presentation/screens/CambiarPassword";
import RegisterPage from "../../features/auth/presentation/screens/RegisterPage";

import { MenuCiudadano } from "../presentation/components/layout/MenuCiudadano";
import { MenuFuncionario } from "../presentation/components/layout/MenuFuncionario";

import DashboardCiudadano from "../../features/ciudadano/presentation/screens/DashboardCiudadano";
import RealizarSolicitud from "../../features/solicitudes/presentation/screens/RealizarSolicitud";
import SolicitudesRealizadas from "../../features/solicitudes/presentation/screens/SolicitudesRealizadas";
import DetalleSolicitud from "../../features/solicitudes/presentation/screens/DetalleSolicitud";
import InfoSolicitudes from "../../features/solicitudes/presentation/screens/InfoSolicitudes";
import NotificacionesCiudadano from "../../features/notificaciones/presentation/screens/NotificacionesCiudadano";
import ContactoCiudadano from "../../features/ciudadano/presentation/screens/ContactoCiudadano";
import MisTicketsCiudadano from "../../features/tickets/presentation/screens/MisTicketsCiudadano";

import DashboardFuncionario from "../../features/funcionario/presentation/screens/DashboardFuncionario";
import HistorialFuncionario from "../../features/solicitudes/presentation/screens/HistorialFuncionario";
import BandejaFuncionario from "../../features/solicitudes/presentation/screens/BandejaFuncionario";
import RevisarSolicitudFuncionario from "../../features/solicitudes/presentation/screens/RevisarSolicitudFuncionario";
import NotificacionesFuncionario from "../../features/notificaciones/presentation/screens/NotificacionesFuncionario";
// NUEVA IMPORTACIÓN:
import TicketsFuncionario from "../../features/tickets/presentation/screens/TicketsFuncionario";

export const AppRouter: React.FC = () => {
  const [rolActual, setRolActual] = useState<string | null>(
    localStorage.getItem("rol_actual"),
  );

  useEffect(() => {
    const handleRolChange = () => {
      setRolActual(localStorage.getItem("rol_actual"));
    };

    window.addEventListener("rolCambiado", handleRolChange);

    return () => {
      window.removeEventListener("rolCambiado", handleRolChange);
    };
  }, []);

  return (
    <IonReactRouter>
      {rolActual === "solicitante" && <MenuCiudadano />}
      {rolActual === "funcionario" && <MenuFuncionario />}

      <IonRouterOutlet id="main-content">
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/recuperar" component={CambiarPassword} />
        <Route exact path="/registro" component={RegisterPage} />

        <ProtectedRoute
          exact
          path="/ciudadano/tramites"
          component={DashboardCiudadano}
          allowedRole="solicitante"
        />

        <ProtectedRoute
          exact
          path="/ciudadano/nueva-solicitud"
          component={RealizarSolicitud}
          allowedRole="solicitante"
        />

        <ProtectedRoute
          exact
          path="/ciudadano/historial"
          component={SolicitudesRealizadas}
          allowedRole="solicitante"
        />

        <ProtectedRoute
          exact
          path="/ciudadano/solicitud/:id"
          component={DetalleSolicitud}
          allowedRole="solicitante"
        />

        <ProtectedRoute
          exact
          path="/ciudadano/editar-solicitud/:id"
          component={RealizarSolicitud}
          allowedRole="solicitante"
        />

        <ProtectedRoute
          exact
          path="/ciudadano/notificaciones"
          component={NotificacionesCiudadano}
          allowedRole="solicitante"
        />

        <ProtectedRoute
          exact
          path="/ciudadano/contacto"
          component={ContactoCiudadano}
          allowedRole="solicitante"
        />

        {/* NUEVA RUTA PARA VER LOS TICKETS */}
        <ProtectedRoute
          exact
          path="/ciudadano/mis-tickets"
          component={MisTicketsCiudadano}
          allowedRole="solicitante"
        />

        <ProtectedRoute
          exact
          path="/ciudadano/informacion-solicitudes"
          component={InfoSolicitudes}
          allowedRole="solicitante"
        />

        <ProtectedRoute
          exact
          path="/funcionario/tramites"
          component={DashboardFuncionario}
          allowedRole="funcionario"
        />

        <ProtectedRoute
          exact
          path="/funcionario/bandeja"
          component={BandejaFuncionario}
          allowedRole="funcionario"
        />

        <ProtectedRoute
          exact
          path="/funcionario/historial"
          component={HistorialFuncionario}
          allowedRole="funcionario"
        />

        <ProtectedRoute
          exact
          path="/funcionario/solicitud/:id"
          component={RevisarSolicitudFuncionario}
          allowedRole="funcionario"
        />

        <ProtectedRoute
          exact
          path="/funcionario/notificaciones"
          component={NotificacionesFuncionario}
          allowedRole="funcionario"
        />
        
        <ProtectedRoute
          exact
          path="/funcionario/tickets"
          component={TicketsFuncionario}
          allowedRole="funcionario"
        />

        <Route exact path="/">
          <Redirect to="/login" />
        </Route>

      </IonRouterOutlet>
    </IonReactRouter>
  );
};
