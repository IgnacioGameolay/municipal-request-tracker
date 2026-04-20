import { 
  IonContent, IonHeader, IonMenu, IonMenuButton, 
  IonPage, IonTitle, IonToolbar, IonList, 
  IonItem, IonIcon, IonLabel, IonMenuToggle 
} from '@ionic/react';
import { homeOutline, documentTextOutline, logOutOutline } from 'ionicons/icons';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>MRT - Menú</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonMenuToggle autoHide={false}>
              <IonItem button routerLink="/ciudadano/tramites">
                <IonIcon slot="start" icon={homeOutline} />
                <IonLabel>Mis Trámites</IonLabel>
              </IonItem>
              <IonItem button routerLink="/login">
                <IonIcon slot="start" icon={logOutOutline} />
                <IonLabel>Cerrar Sesión</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>

      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonMenuButton slot="start" />
            <IonTitle>Municipal Request Tracker</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {children}
        </IonContent>
      </IonPage>
    </>
  );
};

export default DashboardLayout;