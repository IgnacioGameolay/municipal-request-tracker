import React from 'react';

interface Props {
  etiqueta: string;
  valor: string;
  anchoEtiqueta?: string;
}

const FilaDatoEmpresa: React.FC<Props> = ({
  etiqueta,
  valor,
  anchoEtiqueta = '230px'
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '30px',
        flexWrap: 'wrap'
      }}
    >
      <strong
        style={{
          color: '#555',
          minWidth: anchoEtiqueta
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

export default FilaDatoEmpresa;