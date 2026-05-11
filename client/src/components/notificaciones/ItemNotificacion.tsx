import React from 'react';
import { IonIcon } from '@ionic/react';
import { helpOutline } from 'ionicons/icons';

import { Notificacion } from '../../dominio/entidades/Notificacion';
import { normalizarFechaVisual } from '../../dominio/reglas/formatearFecha';

interface Props {
    notificacion: Notificacion;
    onVerDetalle: (notificacion: Notificacion) => void;
}

const ItemNotificacion: React.FC<Props> = ({
    notificacion,
    onVerDetalle
}) => {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto auto',
                alignItems: 'center',
                gap: '20px',
                backgroundColor: '#f4f5f8',
                borderRadius: '8px',
                padding: '18px 25px',
                border: '1px solid #eee'
            }}
        >
            <span
                style={{
                    color: '#333',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    lineHeight: '1.4'
                }}
            >
                {notificacion.textoPrincipal}
                <span style={{ color: '#0da6f2', fontWeight: 'bold' }}>
                    {notificacion.funcionario}
                </span>
                {notificacion.textoSecundario}
            </span>

            <span
                style={{
                    color: '#555',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    whiteSpace: 'nowrap'
                }}
            >
                {normalizarFechaVisual(notificacion.fecha)}
            </span>

            <button
                onClick={() => onVerDetalle(notificacion)}
                title="Ver detalle de la solicitud"
                style={{
                    backgroundColor: '#ffcc00',
                    color: 'white',
                    width: '38px',
                    height: '38px',
                    borderRadius: '6px',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontSize: '1.3rem'
                }}
            >
                <IonIcon icon={helpOutline} />
            </button>
        </div>
    );
};

export default ItemNotificacion;