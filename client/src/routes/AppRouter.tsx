import React from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

// 1. IMPORTAMOS AMBAS PÁGINAS AQUÍ
import LoginPage from '../pages/auth/LoginPage';
import CambiarPassword from '../pages/auth/CambiarPassword';
import RegisterPage from '../pages/auth/RegisterPage';

// Dummies para las otras vistas
const DummyDashboardCiudadano: React.FC = () => <div>Dashboard Ciudadano</div>;
const DummyBandejaAdmin: React.FC = () => <div>Bandeja Admin</div>;

export const AppRouter: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        
        {/* 2. CONECTAMOS AMBAS RUTAS */}
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/recuperar" component={CambiarPassword} />
        <Route exact path="/registro" component={RegisterPage} />
        
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>

        <ProtectedRoute 
          exact 
          path="/ciudadano/tramites" 
          component={DummyDashboardCiudadano} 
          allowedRole="solicitante" 
        />
        
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