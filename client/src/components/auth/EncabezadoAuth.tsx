import React from 'react';
import {
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/react';

interface Props {
  titulo?: string;
}

const EncabezadoAuth: React.FC<Props> = ({
  titulo = 'Proyecto web y movil'
}) => {
  return (
    <IonHeader className="ion-no-border">
      <IonToolbar style={{ '--background': '#0084D8' }}>
        <IonTitle
          className="ion-text-center"
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.4rem'
          }}
        >
          {titulo}
        </IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default EncabezadoAuth;