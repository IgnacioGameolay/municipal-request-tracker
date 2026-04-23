import React from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon, 
  IonMenuButton, IonRouterOutlet
} from '@ionic/react';
import { notificationsOutline, personCircleOutline } from 'ionicons/icons';
import { Route, Redirect } from 'react-router-dom';

import DashboardCiudadano from '../pages/ciudadano/DashboardCiudadano';

const DashboardLayout: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': '#2b2d5c', color: 'white' }}>
          <IonButtons slot="start">
            <IonMenuButton style={{ color: 'white' }} />
          </IonButtons>
          <IonTitle style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>
            Proyecto web y movil
          </IonTitle>
          <IonButtons slot="end" style={{ display: 'flex', alignItems: 'center' }}>
            <IonIcon icon={notificationsOutline} style={{ fontSize: '1.5rem', marginRight: '15px', cursor: 'pointer' }} />
            <IonIcon icon={personCircleOutline} style={{ fontSize: '1.8rem', marginRight: '15px', cursor: 'pointer' }} />
            <div style={{ backgroundColor: '#cddc39', color: 'white', padding: '0 20px', fontWeight: 'bold', fontSize: '0.9rem', height: '100%', display: 'flex', alignItems: 'center' }}>
              Rol: Solicitante
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* Aquí es donde se inyecta la tarjeta */}
      <IonRouterOutlet id="main-content">
        <Route exact path="/ciudadano/perfil" component={DashboardCiudadano} />
        <Route exact path="/ciudadano/tramites">
          <Redirect to="/ciudadano/perfil" />
        </Route>
        <Route exact path="/ciudadano">
          <Redirect to="/ciudadano/perfil" />
        </Route>
      </IonRouterOutlet>
    </IonPage>
  );
};

export default DashboardLayout;