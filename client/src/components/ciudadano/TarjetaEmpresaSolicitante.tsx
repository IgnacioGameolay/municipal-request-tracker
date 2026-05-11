import React from 'react';

import type { EmpresaSolicitante } from '../../dominio/entidades/Solicitante';
import FilaDatoEmpresa from './FilaDatoEmpresa';

interface Props {
  empresa: EmpresaSolicitante;
}

const TarjetaEmpresaSolicitante: React.FC<Props> = ({ empresa }) => {
  return (
    <div
      style={{
        backgroundColor: '#eeeeee',
        borderRadius: '8px',
        padding: '30px',
        marginBottom: '30px'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '28px'
        }}
      >
        <FilaDatoEmpresa
          etiqueta="Nombre de la empresa:"
          valor={empresa.nombre}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr 1fr',
            gap: '30px'
          }}
        >
          <DatoEmpresaInline
            etiqueta="Dirección:"
            valor={empresa.direccion}
          />

          <DatoEmpresaInline
            etiqueta="Comuna:"
            valor={empresa.comuna}
          />

          <DatoEmpresaInline
            etiqueta="Región:"
            valor={empresa.region}
          />
        </div>

        <FilaDatoEmpresa
          etiqueta="Número telefónico:"
          valor={empresa.telefono}
        />

        <FilaDatoEmpresa
          etiqueta="Correo electrónico:"
          valor={empresa.correo}
        />

        <FilaDatoEmpresa
          etiqueta="Sitio web:"
          valor={empresa.sitioWeb}
        />
      </div>
    </div>
  );
};

interface PropsInline {
  etiqueta: string;
  valor: string;
}

const DatoEmpresaInline: React.FC<PropsInline> = ({
  etiqueta,
  valor
}) => {
  return (
    <div>
      <strong
        style={{
          display: 'inline-block',
          color: '#555',
          marginRight: '20px'
        }}
      >
        {etiqueta}
      </strong>

      <span style={{ color: '#666' }}>
        {valor}
      </span>
    </div>
  );
};

export default TarjetaEmpresaSolicitante;