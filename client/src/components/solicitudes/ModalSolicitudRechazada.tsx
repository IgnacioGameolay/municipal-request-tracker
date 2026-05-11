import React from 'react';
import { IonModal } from '@ionic/react';

interface Props {
  abierto: boolean;
  onConfirmar: () => void;
  onCancelar: () => void;
}

const ModalSolicitudRechazada: React.FC<Props> = ({
  abierto,
  onConfirmar,
  onCancelar
}) => {
  return (
    <IonModal
      isOpen={abierto}
      onDidDismiss={onCancelar}
      style={{
        '--width': '400px',
        '--height': '300px',
        '--border-radius': '12px'
      }}
    >
      <div
        style={{
          padding: '40px 30px',
          textAlign: 'center',
          backgroundColor: '#f4f5f8',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <h2
          style={{
            color: '#000',
            fontWeight: 'bold',
            fontSize: '1.6rem',
            margin: 0,
            lineHeight: '1.3'
          }}
        >
          ¿Confirmar rechazo de<br />solicitud?
        </h2>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '30px'
          }}
        >
          <button
            onClick={onConfirmar}
            style={{
              backgroundColor: '#ff3b30',
              color: 'white',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '4px',
              padding: '15px',
              cursor: 'pointer',
              fontSize: '1.1rem'
            }}
          >
            Confirmar
          </button>

          <button
            onClick={onCancelar}
            style={{
              background: 'none',
              border: 'none',
              color: '#888',
              cursor: 'pointer',
              padding: '10px'
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </IonModal>
  );
};

export default ModalSolicitudRechazada;