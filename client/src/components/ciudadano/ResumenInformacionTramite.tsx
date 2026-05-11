import React from 'react';

interface Props {
  tiempoEstimado: string;
  areaResponsable: string;
}

const ResumenInformacionTramite: React.FC<Props> = ({
  tiempoEstimado,
  areaResponsable
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        marginTop: '20px'
      }}
    >
      <CajaResumen
        titulo="Tiempo estimado de revisión:"
        valor={tiempoEstimado}
      />

      <CajaResumen
        titulo="Área responsable:"
        valor={areaResponsable}
      />
    </div>
  );
};

interface PropsCaja {
  titulo: string;
  valor: string;
}

const CajaResumen: React.FC<PropsCaja> = ({
  titulo,
  valor
}) => {
  return (
    <div>
      <h3
        style={{
          fontSize: '1.1rem',
          fontWeight: 'bold',
          marginBottom: '10px',
          color: '#000'
        }}
      >
        {titulo}
      </h3>

      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #999',
          borderRadius: '6px',
          padding: '10px',
          minHeight: '45px',
          color: '#222'
        }}
      >
        {valor}
      </div>
    </div>
  );
};

export default ResumenInformacionTramite;