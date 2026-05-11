import React from 'react';

import { Notificacion } from '../../dominio/entidades/Notificacion';
import ItemNotificacion from './ItemNotificacion';

interface Props {
  notificaciones: Notificacion[];
  onVerDetalle: (notificacion: Notificacion) => void;
}

const ListaNotificacion: React.FC<Props> = ({
  notificaciones,
  onVerDetalle
}) => {
  if (notificaciones.length === 0) {
    return (
      <div
        style={{
          backgroundColor: '#f4f5f8',
          borderRadius: '8px',
          padding: '40px',
          textAlign: 'center',
          border: '1px solid #eee'
        }}
      >
        <p style={{ margin: 0, color: '#333', fontWeight: 'bold' }}>
          No hay notificaciones disponibles.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}
    >
      {notificaciones.map(notificacion => (
        <ItemNotificacion
          key={notificacion.id}
          notificacion={notificacion}
          onVerDetalle={onVerDetalle}
        />
      ))}
    </div>
  );
};

export default ListaNotificacion;