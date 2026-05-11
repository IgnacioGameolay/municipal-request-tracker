import React from 'react';

import type { Solicitante } from '../../dominio/entidades/Solicitante';
import AvatarSolicitante from './AvatarSolicitante';
import CampoDatoSolicitante from './CampoDatoSolicitante';

interface Props {
  solicitante: Solicitante;
}

const TarjetaPerfilSolicitante: React.FC<Props> = ({ solicitante }) => {
  return (
    <div
      style={{
        backgroundColor: '#eeeeee',
        borderRadius: '8px',
        padding: '30px',
        marginBottom: '20px'
      }}
    >
      <h3
        style={{
          color: '#666',
          marginTop: 0,
          marginBottom: '25px',
          fontSize: '1.1rem'
        }}
      >
        Datos personales
      </h3>

      <div
        style={{
          display: 'flex',
          gap: '40px',
          flexWrap: 'wrap'
        }}
      >
        <AvatarSolicitante />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '20px',
            flex: 1,
            minWidth: '500px'
          }}
        >
          <CampoDatoSolicitante
            etiqueta="Nombre"
            valor={solicitante.nombre}
          />

          <CampoDatoSolicitante
            etiqueta="Rut"
            valor={solicitante.rut}
          />

          <CampoDatoSolicitante
            etiqueta="Teléfono"
            valor={solicitante.telefono}
          />

          <CampoDatoSolicitante
            etiqueta="Email"
            valor={solicitante.email}
          />

          <CampoDatoSolicitante
            etiqueta="ROL"
            valor={solicitante.rol}
            columnas={2}
          />
        </div>
      </div>
    </div>
  );
};

export default TarjetaPerfilSolicitante;