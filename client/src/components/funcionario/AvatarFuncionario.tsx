import React from 'react';
import { IonIcon } from '@ionic/react';
import { person } from 'ionicons/icons';

const AvatarFuncionario: React.FC = () => {
  return (
    <div
      style={{
        width: '130px',
        height: '160px',
        backgroundColor: '#a9a9a9',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        overflow: 'hidden'
      }}
    >
      <IonIcon
        icon={person}
        style={{
          fontSize: '9rem',
          color: '#444',
          marginBottom: '-25px'
        }}
      />
    </div>
  );
};

export default AvatarFuncionario;