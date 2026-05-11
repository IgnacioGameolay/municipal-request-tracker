import React from 'react';
import {
    IonInput,
    IonLabel
} from '@ionic/react';

interface Props {
    etiqueta: string;
    placeholder: string;
    valor: string;
    tipo?: 'text' | 'email' | 'password';
    onCambiar: (valor: string) => void;
}

const CampoAuthConEtiqueta: React.FC<Props> = ({
    etiqueta,
    placeholder,
    valor,
    tipo = 'text',
    onCambiar
}) => {
    return (
        <div style={{ width: '100%', marginBottom: '10px' }}>
            <IonLabel
                style={{
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                    marginBottom: '5px',
                    display: 'block',
                    color: '#000'
                }}
            >
                {etiqueta}
            </IonLabel>

            <IonInput
                placeholder={placeholder}
                type={tipo}
                value={valor}
                onIonInput={e => onCambiar(e.detail.value ?? '')}
                style={{
                    backgroundColor: '#f2f2f2',
                    border: '1px solid #d1d1d1',
                    borderRadius: '4px',
                    paddingLeft: '15px',
                    width: '100%',
                    height: '40px',
                    color: '#666'
                }}
            />
        </div>
    );
};

export default CampoAuthConEtiqueta;