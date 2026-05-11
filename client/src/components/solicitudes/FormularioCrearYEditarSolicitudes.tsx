import React from 'react';
import {
  IonInput,
  IonSelect,
  IonSelectOption
} from '@ionic/react';

interface Props {
  tipo: string;
  titulo: string;
  descripcionOriginal: string;
  descripcionAgregada: string;
  esEdicion: boolean;
  onCambiarTipo: (valor: string) => void;
  onCambiarTitulo: (valor: string) => void;
  onCambiarDescripcionOriginal: (valor: string) => void;
  onCambiarDescripcionAgregada: (valor: string) => void;
}

const FormularioCrearYEditarSolicitudes: React.FC<Props> = ({
  tipo,
  titulo,
  descripcionOriginal,
  descripcionAgregada,
  esEdicion,
  onCambiarTipo,
  onCambiarTitulo,
  onCambiarDescripcionOriginal,
  onCambiarDescripcionAgregada
}) => {
  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <label style={estiloEtiqueta}>Tipo de solicitud</label>

        <IonSelect
          interface="popover"
          value={tipo}
          placeholder="Seleccione..."
          onIonChange={e => onCambiarTipo(e.detail.value || '')}
          disabled={esEdicion}
          style={{
            backgroundColor: esEdicion ? '#d3d3d3' : '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            minHeight: '40px',
            width: '200px',
            paddingLeft: '10px'
          }}
        >
          <IonSelectOption value="Tipo 1">Tipo 1</IonSelectOption>
          <IonSelectOption value="Tipo 2">Tipo 2</IonSelectOption>
          <IonSelectOption value="Tipo 3">Tipo 3</IonSelectOption>
          <IonSelectOption value="Tipo 4">Tipo 4</IonSelectOption>
        </IonSelect>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={estiloEtiqueta}>Título de la solicitud</label>

        <IonInput
          value={titulo}
          onIonChange={e => onCambiarTitulo(e.detail.value || '')}
          disabled={esEdicion}
          style={{
            backgroundColor: esEdicion ? '#d3d3d3' : '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            minHeight: '40px',
            paddingLeft: '10px',
            color: esEdicion ? '#555' : '#000'
          }}
        />
      </div>

      {esEdicion ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '30px'
          }}
        >
          <div>
            <label style={estiloEtiqueta}>Descripción de la solicitud</label>

            <textarea
              value={descripcionOriginal}
              disabled
              style={{
                width: '100%',
                height: '200px',
                backgroundColor: '#d3d3d3',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '10px',
                resize: 'none',
                color: '#555',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div>
            <label style={estiloEtiqueta}>
              Agregar a la descripción de la solicitud
            </label>

            <textarea
              placeholder="(Descripción agregada) Faltó incluir unos documentos, los adjunto ahora."
              value={descripcionAgregada}
              onChange={e => onCambiarDescripcionAgregada(e.target.value)}
              style={{
                width: '100%',
                height: '200px',
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '10px',
                resize: 'none',
                color: '#000',
                fontFamily: 'inherit'
              }}
            />
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: '30px' }}>
          <label style={estiloEtiqueta}>Descripción de la solicitud</label>

          <textarea
            value={descripcionOriginal}
            onChange={e => onCambiarDescripcionOriginal(e.target.value)}
            style={{
              width: '100%',
              height: '150px',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '10px',
              resize: 'none',
              color: '#000',
              fontFamily: 'inherit'
            }}
          />
        </div>
      )}
    </>
  );
};

const estiloEtiqueta = {
  display: 'block',
  fontSize: '0.9rem',
  color: '#333',
  marginBottom: '8px',
  fontWeight: '500'
};

export default FormularioCrearYEditarSolicitudes;