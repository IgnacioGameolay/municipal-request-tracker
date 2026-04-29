import React, { useState, useEffect } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

import LoginPage from '../pages/auth/LoginPage';
import CambiarPassword from '../pages/auth/CambiarPassword';
import RegisterPage from '../pages/auth/RegisterPage';

// IMPORTACIONES DE COMPONENTES
import { MenuCiudadano } from '../components/MenuCiudadano';
import { MenuFuncionario } from '../components/MenuFuncionario'; 
import DashboardCiudadano from '../pages/ciudadano/DashboardCiudadano';
import RealizarSolicitud from '../pages/ciudadano/RealizarSolicitud';
import SolicitudesRealizadas from '../pages/ciudadano/SolicitudesRealizadas';
import DetalleSolicitud from '../pages/ciudadano/DetalleSolicitud';
import DashboardFuncionario from '../pages/funcionario/DashboardFuncionario';
import HistorialFuncionario from '../pages/funcionario/HistorialFuncionario';

// IMPORTACIÓN DEL FUNCIONARIO
import BandejaFuncionario from '../pages/funcionario/BandejaFuncionario';

const DummyBandejaAdmin: React.FC = () => <div>Bandeja Admin</div>;

export const AppRouter: React.FC = () => {
  // Lógica mínima para detectar el cambio de rol y actualizar el menú
  const [rolActual, setRolActual] = useState(localStorage.getItem('rol_actual') || 'ciudadano');

  useEffect(() => {
    const handleRolChange = () => {
      setRolActual(localStorage.getItem('rol_actual') || 'ciudadano');
    };
    window.addEventListener('rolCambiado', handleRolChange);
    return () => window.removeEventListener('rolCambiado', handleRolChange);
  }, []);

  return (
    <IonReactRouter>
      
      {/* Cambia el menú según el rol actual */}
      {rolActual === 'ciudadano' ? <MenuCiudadano /> : <MenuFuncionario />}

      <IonRouterOutlet id="main-content">
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/recuperar" component={CambiarPassword} />
        <Route exact path="/registro" component={RegisterPage} />
        
        {/* Rutas del Ciudadano */}
        <Route exact path="/ciudadano/tramites" component={DashboardCiudadano} />
        <Route exact path="/ciudadano/nueva-solicitud" component={RealizarSolicitud} />
        <Route exact path="/ciudadano/historial" component={SolicitudesRealizadas} />
        <Route exact path="/ciudadano/solicitud/:id" component={DetalleSolicitud} />
        <Route exact path="/ciudadano/editar-solicitud/:id" component={RealizarSolicitud} />
        
        {/* Rutas del Funcionario */}
        <Route exact path="/funcionario/tramites" component={DashboardFuncionario} />
        <Route exact path="/funcionario/bandeja" component={BandejaFuncionario} />
        <Route exact path="/funcionario/historial" component={HistorialFuncionario} />

        {/* Redirección por defecto: SIEMPRE AL LOGIN PRIMERO */}
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>

        {/* Redirección por defecto: SIEMPRE AL LOGIN PRIMERO */}
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