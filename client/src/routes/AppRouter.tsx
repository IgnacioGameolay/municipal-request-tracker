import React from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

import LoginPage from '../pages/auth/LoginPage';
import CambiarPassword from '../pages/auth/CambiarPassword';
import RegisterPage from '../pages/auth/RegisterPage';
import DashboardLayout from '../components/DashboardLayout'; 
import { MenuCiudadano } from '../components/MenuCiudadano';

const DummyBandejaAdmin: React.FC = () => <div>Bandeja Admin</div>;

export const AppRouter: React.FC = () => {
  return (
    <IonReactRouter>
      
      {/* El menú sigue aquí, perfecto */}
      <MenuCiudadano />

      <IonRouterOutlet id="main-content">
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/recuperar" component={CambiarPassword} />
        <Route exact path="/registro" component={RegisterPage} />
        
        {/* Usamos el DashboardLayout que tú creaste */}
        <Route exact path="/ciudadano/tramites" component={DashboardLayout} />
        <Route path="/ciudadano" component={DashboardLayout} />
        
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