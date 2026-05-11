import React, { useEffect, useState } from "react";
import { IonReactRouter } from "@ionic/react-router";
import { IonRouterOutlet } from "@ionic/react";
import { Route, Redirect } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

import LoginPage from "../pages/auth/LoginPage";
import CambiarPassword from "../pages/auth/CambiarPassword";
import RegisterPage from "../pages/auth/RegisterPage";

import { MenuCiudadano } from "../components/MenuCiudadano";
import { MenuFuncionario } from "../components/MenuFuncionario";

import DashboardCiudadano from "../pages/ciudadano/DashboardCiudadano";
import RealizarSolicitud from "../pages/ciudadano/RealizarSolicitud";
import SolicitudesRealizadas from "../pages/ciudadano/SolicitudesRealizadas";
import DetalleSolicitud from "../pages/ciudadano/DetalleSolicitud";
import InfoSolicitudes from "../pages/ciudadano/InfoSolicitudes";
import NotificacionesCiudadano from "../pages/ciudadano/NotificacionesCiudadano";
import ContactoCiudadano from "../pages/ciudadano/ContactoCiudadano";

import DashboardFuncionario from "../pages/funcionario/DashboardFuncionario";
import HistorialFuncionario from "../pages/funcionario/HistorialFuncionario";
import BandejaFuncionario from "../pages/funcionario/BandejaFuncionario";
import RevisarSolicitudFuncionario from "../pages/funcionario/RevisarSolicitudFuncionario";
import NotificacionesFuncionario from "../pages/funcionario/NotificacionesFuncionario";

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

        <Route exact path="/">
          <Redirect to="/login" />
        </Route>

      </IonRouterOutlet>
    </IonReactRouter>
  );
};
