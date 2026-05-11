import React from 'react';
import { IonAlert } from '@ionic/react';

interface Props {
  abierto: boolean;
  onCancelar: () => void;
  onConfirmar: () => void;
}

const ModalEliminarSolicitud: React.FC<Props> = ({
  abierto,
  onCancelar,
  onConfirmar
}) => {
  return (
    <IonAlert
      isOpen={abierto}
      onDidDismiss={onCancelar}
      header="Eliminar solicitud"
      message="¿Estás seguro? No se podrá recuperar la solicitud una vez borrada."
      buttons={[
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: onCancelar
        },
        {
          text: 'Sí, eliminar',
          role: 'destructive',
          handler: onConfirmar
        }
      ]}
    />
  );
};

export default ModalEliminarSolicitud;