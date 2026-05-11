import React from 'react';
import InsigniaEstado from '../common/ColorEstado';
import { Solicitud } from '../../dominio/entidades/Solicitud';
import { normalizarFechaVisual } from '../../dominio/reglas/formatearFecha';

interface Props {
    solicitud: Solicitud;
}

const ResumenSolicitud: React.FC<Props> = ({ solicitud }) => {
    return (
        <div
            style={{
                backgroundColor: '#f4f5f8',
                borderRadius: '8px',
                padding: '18px 30px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                alignItems: 'center',
                marginBottom: '45px'
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: '#000', marginBottom: '10px' }}>
                    Estado
                </strong>
                <InsigniaEstado estado={solicitud.estado} />
            </div>

            <div style={{ textAlign: 'center' }}>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: '#000', marginBottom: '10px' }}>
                    Ult. Encargado de revisión
                </strong>
                <span style={{ fontSize: '0.9rem', color: '#555' }}>
                    {solicitud.encargado}
                </span>
            </div>

            <div style={{ textAlign: 'center' }}>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: '#000', marginBottom: '10px' }}>
                    Última revisión
                </strong>
                <span style={{ fontSize: '0.9rem', color: '#555' }}>
                    {normalizarFechaVisual(solicitud.ultimaRevision)}
                </span>
            </div>
        </div>
    );
};

export default ResumenSolicitud;