import React from 'react';

interface Props {
  esEdicion: boolean;
  onGuardar: () => void;
  onVolver: () => void;
}

const AccionesEnFomularioSolicitud: React.FC<Props> = ({
  esEdicion,
  onGuardar,
  onVolver
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '40px'
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <button
          onClick={onGuardar}
          style={{
            backgroundColor: '#68cc24',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            border: 'none',
            borderRadius: '4px',
            padding: '15px 40px',
            cursor: 'pointer',
            width: '300px'
          }}
        >
          {esEdicion ? 'Editar Solicitud' : 'Enviar Solicitud'}
        </button>
      </div>

      <button
        onClick={onVolver}
        style={{
          background: 'none',
          border: 'none',
          color: '#555',
          fontSize: '1rem',
          cursor: 'pointer',
          textDecoration: 'none'
        }}
      >
        Volver
      </button>
    </div>
  );
};

export default AccionesEnFomularioSolicitud;