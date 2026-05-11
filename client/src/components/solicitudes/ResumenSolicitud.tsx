import React, { useState } from 'react';

import ColorEstado from '../common/ColorEstado';
import { Solicitud } from '../../dominio/entidades/Solicitud';
import { normalizarFechaVisual } from '../../dominio/reglas/formatearFecha';
import { mostrarEstado } from '../../dominio/reglas/normalizarEstado';

interface Props {
  solicitud: Solicitud;
}

const ResumenSolicitud: React.FC<Props> = ({ solicitud }) => {
  const [mostrarHistorial, setMostrarHistorial] = useState(false);

  const obtenerHistorialRevision = () => {
    if (solicitud.historialRevisiones && solicitud.historialRevisiones.length > 0) {
      return solicitud.historialRevisiones;
    }

    if (solicitud.ultimaRevision && solicitud.ultimaRevision.trim() !== '') {
      return [
        {
          funcionario: solicitud.encargado || '---',
          estadoNuevo: mostrarEstado(solicitud.estado) || '---',
          fechaRevision: solicitud.ultimaRevision
        }
      ];
    }

    return [
      {
        funcionario: '---',
        estadoNuevo: '---',
        fechaRevision: '---'
      }
    ];
  };

  return (
    <div
      style={{
        backgroundColor: '#f4f5f8',
        borderRadius: '8px',
        padding: '18px 30px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        alignItems: 'center',
        marginBottom: '45px',
        position: 'relative'
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <strong
          style={{
            display: 'block',
            fontSize: '0.9rem',
            color: '#000',
            marginBottom: '10px'
          }}
        >
          Estado
        </strong>

        <ColorEstado estado={solicitud.estado} />
      </div>

      <div style={{ textAlign: 'center' }}>
        <strong
          style={{
            display: 'block',
            fontSize: '0.9rem',
            color: '#000',
            marginBottom: '10px'
          }}
        >
          Ult. Encargado de revisión
        </strong>

        <span style={{ fontSize: '0.9rem', color: '#555' }}>
          {solicitud.encargado}
        </span>
      </div>

      <div style={{ textAlign: 'center', position: 'relative' }}>
        <strong
          style={{
            display: 'block',
            fontSize: '0.9rem',
            color: '#000',
            marginBottom: '10px'
          }}
        >
          Última revisión

          <span
            onClick={() => setMostrarHistorial(!mostrarHistorial)}
            style={{
              backgroundColor: '#8b5cf6',
              color: 'white',
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '20px',
              height: '20px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              marginLeft: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            ?
          </span>
        </strong>

        <span style={{ fontSize: '0.9rem', color: '#555' }}>
          {normalizarFechaVisual(solicitud.ultimaRevision)}
        </span>

        {mostrarHistorial && (
          <div
            style={{
              position: 'absolute',
              top: '48px',
              right: '0',
              backgroundColor: '#d9d9d9',
              borderRadius: '3px',
              minWidth: '420px',
              zIndex: 20,
              boxShadow: '0 3px 8px rgba(0,0,0,0.15)',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                fontSize: '0.75rem',
                color: '#000',
                fontWeight: '500',
                padding: '8px 10px',
                borderBottom: '1px solid #c8c8c8'
              }}
            >
              <span>Funcionario responsable</span>
              <span>Estado nuevo</span>
              <span>Fecha de revisión</span>
            </div>

            {obtenerHistorialRevision().map((revision, index) => (
              <div
                key={index}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  fontSize: '0.8rem',
                  color: '#000',
                  padding: '10px',
                  backgroundColor: index % 2 === 0 ? '#d9d9d9' : '#eeeeee'
                }}
              >
                <span>{revision.funcionario}</span>
                <span>{mostrarEstado(revision.estadoNuevo)}</span>
                <span>{normalizarFechaVisual(revision.fechaRevision)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumenSolicitud;