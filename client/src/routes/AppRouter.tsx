import React from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

import LoginPage from '../pages/auth/LoginPage';
import CambiarPassword from '../pages/auth/CambiarPassword';
import RegisterPage from '../pages/auth/RegisterPage';

// AQUÍ ESTÁN LAS IMPORTACIONES CORRECTAS
import { MenuCiudadano } from '../components/MenuCiudadano';
import DashboardCiudadano from '../pages/ciudadano/DashboardCiudadano';
import RealizarSolicitud from '../pages/ciudadano/RealizarSolicitud';

const DummyBandejaAdmin: React.FC = () => <div>Bandeja Admin</div>;

export const AppRouter: React.FC = () => {
  return (
    <IonReactRouter>
      
      {/* El menú lateral que controla la navegación */}
      <MenuCiudadano />

      <IonRouterOutlet id="main-content">
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/recuperar" component={CambiarPassword} />
        <Route exact path="/registro" component={RegisterPage} />
        
        {/* Rutas del Ciudadano */}
        <Route exact path="/ciudadano/tramites" component={DashboardCiudadano} />
        <Route exact path="/ciudadano/nueva-solicitud" component={RealizarSolicitud} />
        
        {/* Redirección por defecto */}
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>

        <ProtectedRoute 
          exact 
          path="/admin/bandeja" 
          component={DummyBandejaAdmin} 
          allowedRole="funcionario" 
        />
      </IonRouterOutlet>
      
    </IonReactRouter>
  );
};