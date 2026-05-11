import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonIcon,
  IonMenuButton
} from '@ionic/react';
import { notificationsOutline, personCircleOutline } from 'ionicons/icons';

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
}

const EncabezadoAplicacion: React.FC<Props> = ({
  rol,
  rutaNotificaciones,
  rutaPerfil,
  onNavegar,
  permitirCambioManualRol = false,
  onCambiarRolManual
}) => {
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

          <IonTitle style={{ fontWeight: 'bold', fontSize: '1.4rem', padding: 0 }}>
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
          <IonIcon
            icon={notificationsOutline}
            onClick={() => onNavegar(rutaNotificaciones)}
            style={{
              fontSize: '1.5rem',
              marginRight: '15px',
              cursor: 'pointer'
            }}
          />

          <IonIcon
            icon={personCircleOutline}
            onClick={() => onNavegar(rutaPerfil)}
            style={{
              fontSize: '1.8rem',
              marginRight: '15px',
              cursor: 'pointer'
            }}
          />

          <BarraRol
            rol={rol}
            permitirCambioManual={permitirCambioManualRol}
            onClick={onCambiarRolManual}
          />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default EncabezadoAplicacion;