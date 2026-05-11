import React from 'react';

import { Solicitud } from '../../dominio/entidades/Solicitud';

interface Props {
  solicitud: Solicitud;
}

const ComentariosSolicitud: React.FC<Props> = ({ solicitud }) => {
  const obtenerComentariosFuncionario = () => {
    if (
      solicitud.comentariosFuncionario &&
      solicitud.comentariosFuncionario.trim() !== ''
    ) {
      return solicitud.comentariosFuncionario;
    }

    if (
      solicitud.descripcion &&
      solicitud.descripcion.includes('[Funcionario')
    ) {
      return solicitud.descripcion;
    }

    return 'No hay observaciones registradas por el funcionario aún.';
  };

  return (
    <>
      <h3
        style={{
          color: '#000',
          fontWeight: 'bold',
          marginBottom: '20px',
          fontSize: '1.5rem'
        }}
      >
        Comentarios
      </h3>

      <div
        style={{
          backgroundColor: '#f4f5f8',
          borderRadius: '8px',
          padding: '25px',
          marginBottom: '30px'
        }}
      >
        <div
          style={{
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '25px',
            minHeight: '260px',
            color: '#333',
            fontSize: '1rem',
            lineHeight: '1.6',
            whiteSpace: 'pre-wrap'
          }}
        >
          {obtenerComentariosFuncionario()}
        </div>
      </div>
    </>
  );
};

export default ComentariosSolicitud;