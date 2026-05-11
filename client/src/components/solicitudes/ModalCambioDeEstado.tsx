import React from 'react';
import { IonModal, IonSelect, IonSelectOption } from '@ionic/react';

import ColorEstado from '../common/ColorEstado';
import { Solicitud } from '../../dominio/entidades/Solicitud';

interface Props {
  abierto: boolean;
  solicitud: Solicitud;
  estadoSeleccionado: string;
  onCambiarEstado: (estado: string) => void;
  onConfirmar: () => void;
  onCancelar: () => void;
}

const ModalCambioDeEstado: React.FC<Props> = ({
  abierto,
  solicitud,
  estadoSeleccionado,
  onCambiarEstado,
  onConfirmar,
  onCancelar
}) => {
  return (
    <IonModal
      isOpen={abierto}
      onDidDismiss={onCancelar}
      style={{
        '--width': '400px',
        '--height': '350px',
        '--border-radius': '12px'
      }}
    >
      <div
        style={{
          padding: '30px',
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
            fontSize: '1.4rem',
            marginTop: 0
          }}
        >
          Cambiar estado de la solicitud
        </h2>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            margin: '30px 0'
          }}
        >
          <div>
            <span
              style={{
                display: 'block',
                fontSize: '0.8rem',
                color: '#333',
                fontWeight: 'bold',
                marginBottom: '10px'
              }}
            >
              Estado actual
            </span>

            <ColorEstado estado={solicitud.estado} />
          </div>

          <div>
            <span
              style={{
                display: 'block',
                fontSize: '0.8rem',
                color: '#333',
                fontWeight: 'bold',
                marginBottom: '10px'
              }}
            >
              Estado nuevo
            </span>

            <IonSelect
              interface="popover"
              value={estadoSeleccionado}
              placeholder="Seleccione..."
              onIonChange={e => onCambiarEstado(e.detail.value!)}
              style={{
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '4px',
                minHeight: '30px',
                padding: '0 10px',
                fontSize: '0.8rem'
              }}
            >
              <IonSelectOption value="Recibido">Recibido</IonSelectOption>
              <IonSelectOption value="En revisión">En revisión</IonSelectOption>
              <IonSelectOption value="Pendiente">Pendiente</IonSelectOption>
              <IonSelectOption value="Aprobada">Aprobada</IonSelectOption>
              <IonSelectOption value="Rechazada">Rechazada</IonSelectOption>
            </IonSelect>
          </div>
        </div>

        <button
          onClick={onConfirmar}
          disabled={!estadoSeleccionado}
          style={{
            backgroundColor: estadoSeleccionado ? '#68cc24' : '#bfbfbf',
            color: 'white',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '4px',
            padding: '15px',
            cursor: estadoSeleccionado ? 'pointer' : 'not-allowed',
            fontSize: '1.1rem'
          }}
        >
          Confirmar cambios
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
    </IonModal>
  );
};

export default ModalCambioDeEstado;