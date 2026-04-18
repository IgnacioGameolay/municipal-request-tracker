import React from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

//Nills, aquí te dejé componentes de prueba,
// tienes que que cambialos por las vistas que se usarán finalmente
const DummyLogin: React.FC = () => <div>Login Page</div>;
const DummyDashboardCiudadano: React.FC = () => <div>Dashboard Ciudadano</div>;
const DummyBandejaAdmin: React.FC = () => <div>Bandeja Admin</div>;

export const AppRouter: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login" component={DummyLogin} />
        
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