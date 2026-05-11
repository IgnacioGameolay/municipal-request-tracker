import React from 'react';

interface Props {
  etiqueta: string;
  valor: string;
  columnas?: number;
}

const CampoDatoFuncionario: React.FC<Props> = ({
  etiqueta,
  valor,
  columnas = 1
}) => {
  return (
    <div style={{ gridColumn: `span ${columnas}` }}>
      <strong
        style={{
          display: 'block',
          color: '#333',
          marginBottom: '5px'
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

export default CampoDatoFuncionario;