import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonIcon,
  IonMenuButton,
  IonButton
} from '@ionic/react';
import { notificationsOutline, personCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

import LogoMunicipal from './LogoMunicipal';
import BarraRol from './BarraRol';
import { RolUsuario } from '../../dominio/constantes/roles';
import { useAuth } from '../../context/AuthContext';

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
  permitirCambioManualRol = false
}) => {
  const history = useHistory();
  const { cambiarRol } = useAuth();

  const irANotificaciones = () => {
    onNavegar(rutaNotificaciones);
  };

  const irAPerfil = () => {
    onNavegar(rutaPerfil);
  };

  const cambiarRolDesdeEncabezado = () => {
    if (!permitirCambioManualRol) {
      return;
    }

    if (rol === 'solicitante') {
      cambiarRol('funcionario');
      history.replace('/funcionario/tramites');
      return;
    }

    cambiarRol('solicitante');
    history.replace('/ciudadano/tramites');
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
            onClick={irAPerfil}
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

          <BarraRol
            rol={rol}
            permitirCambioManual={permitirCambioManualRol}
            onClick={cambiarRolDesdeEncabezado}
          />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default EncabezadoAplicacion;