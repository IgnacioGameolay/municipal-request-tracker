import { 
  IonCard, IonCardContent, IonCardHeader, 
  IonCardSubtitle, IonCardTitle, IonBadge, 
  IonFab, IonFabButton, IonIcon 
} from '@ionic/react';
import { add } from 'ionicons/icons';

const DashboardCiudadano: React.FC = () => {
  return (
    <div className="dashboard-container">
      <h2>Mis Solicitudes</h2>
      
      {/* Ejemplo de un trámite OBSERVADO (Caso crítico del PDF) */}
      <IonCard routerLink="/ciudadano/tramites/1">
        <IonCardHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <IonCardSubtitle>Folio: #10293</IonCardSubtitle>
            <IonBadge color="warning">OBSERVADO</IonBadge>
          </div>
          <IonCardTitle>Patente Comercial</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          Tienes documentos pendientes de corrección. Haz clic para revisar las observaciones.
        </IonCardContent>
      </IonCard>

      {/* Botón flotante para nueva solicitud */}
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
    </div>
  );
};

export default DashboardCiudadano;