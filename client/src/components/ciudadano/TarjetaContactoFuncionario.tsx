import React from 'react';

import type { ContactoFuncionario } from '../../dominio/entidades/ContactoFuncionario';
import AvatarContactoFuncionario from './AvatarContactoFuncionario';
import CampoContactoFuncionario from './CampoContactoFuncionario';

interface Props {
  funcionario: ContactoFuncionario;
}

const TarjetaContactoFuncionario: React.FC<Props> = ({ funcionario }) => {
  return (
    <div
      style={{
        backgroundColor: '#eeeeee',
        borderRadius: '8px',
        padding: '25px',
        display: 'flex',
        gap: '40px',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '130px'
        }}
      >
        <AvatarContactoFuncionario />

        <span
          style={{
            color: '#555',
            fontSize: '0.95rem',
            fontWeight: '500',
            textAlign: 'center'
          }}
        >
          {funcionario.nombre}
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          flex: 1
        }}
      >
        <CampoContactoFuncionario
          etiqueta="Nombre"
          valor={funcionario.nombre}
        />

        <CampoContactoFuncionario
          etiqueta="Teléfono"
          valor={funcionario.telefono}
        />

        <CampoContactoFuncionario
          etiqueta="Email Institucional"
          valor={funcionario.email}
          columnas={2}
        />
      </div>
    </div>
  );
};

export default TarjetaContactoFuncionario;