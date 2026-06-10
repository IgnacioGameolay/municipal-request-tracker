import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonIcon,
  IonMenuButton,
  IonButton,
  IonPopover,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react';
import {
  notificationsOutline,
  personCircleOutline,
  logOutOutline,
  personOutline
} from 'ionicons/icons';

import LogoMunicipal from './LogoMunicipal';
import BarraRol from './BarraRol';
import { RolUsuario } from '../../dominio/constantes/roles';

interface Props {
  rol: RolUsuario;
  rutaNotificaciones: string;
  rutaPerfil: string;
  onNavegar: (ruta: string) => void;
  permitirCambioManualRol?: boolean;
  onCambiarRolManual?: () => void;
  onCerrarSesion?: () => void;
}

const EncabezadoAplicacion: React.FC<Props> = ({
  rol,
  rutaNotificaciones,
  rutaPerfil,
  onNavegar,
  onCerrarSesion
}) => {
  const history = useHistory();

  const [popoverEvent, setPopoverEvent] = useState<Event | undefined>();

  const irANotificaciones = () => {
    onNavegar(rutaNotificaciones);
  };

  const irAPerfil = () => {
    setPopoverEvent(undefined);
    onNavegar(rutaPerfil);
  };

  const cerrarSesion = () => {
    setPopoverEvent(undefined);

    if (onCerrarSesion) {
      onCerrarSesion();
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('rol_actual');
      history.push('/login');
    }
  };

  const abrirPopover = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPopoverEvent(e.nativeEvent);
  };

  return (
    <IonHeader className="ion-no-border">
      <IonToolbar
        style={{
          '--background': '#0084D8',
          color: 'white',
          '--padding-end': '0',
          '--min-height': '56px'
        }}
      >
        <IonButtons slot="start">
          <IonMenuButton style={{ color: 'white' }} />
        </IonButtons>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <LogoMunicipal />

          <IonTitle
            style={{
              fontWeight: 'bold',
              fontSize: '1.4rem',
              padding: 0
            }}
          >
            Gestor de solicitudes
          </IonTitle>
        </div>

        <IonButtons
          slot="end"
          style={{
            margin: '0',
            height: '56px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <IonButton
            fill="clear"
            onClick={irANotificaciones}
            style={{
              '--color': 'white',
              '--padding-start': '6px',
              '--padding-end': '6px',
              marginRight: '8px'
            }}
          >
            <IonIcon
              icon={notificationsOutline}
              style={{ fontSize: '1.5rem' }}
            />
          </IonButton>

          <IonButton
            fill="clear"
            onClick={abrirPopover}
            style={{
              '--color': 'white',
              '--padding-start': '6px',
              '--padding-end': '6px',
              marginRight: '8px'
            }}
          >
            <IonIcon
              icon={personCircleOutline}
              style={{ fontSize: '1.8rem' }}
            />
          </IonButton>

          <IonPopover
            isOpen={!!popoverEvent}
            event={popoverEvent}
            onDidDismiss={() => setPopoverEvent(undefined)}
            side="bottom"
            alignment="end"
            showBackdrop={false}
            backdropDismiss={true}
            reference="event"
          >
            <IonList lines="none">
              <IonItem button onClick={irAPerfil}>
                <IonIcon icon={personOutline} slot="start" />
                <IonLabel>Ver perfil</IonLabel>
              </IonItem>

              <IonItem button onClick={cerrarSesion}>
                <IonIcon icon={logOutOutline} slot="start" />
                <IonLabel>Cerrar sesión</IonLabel>
              </IonItem>
            </IonList>
          </IonPopover>

          <BarraRol
            rol={rol}
            permitirCambioManual={false}
          />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default EncabezadoAplicacion;