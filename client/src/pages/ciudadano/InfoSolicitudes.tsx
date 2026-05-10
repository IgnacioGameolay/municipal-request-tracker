import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon,
  IonMenuButton, IonSelect, IonSelectOption
} from '@ionic/react';
import { notificationsOutline, personCircleOutline } from 'ionicons/icons';

const InfoSolicitudes: React.FC = () => {
  const [tipoTramite, setTipoTramite] = useState('');

  const obtenerDocumentos = () => {
    switch (tipoTramite) {
      case 'Patente comercial':
        return [
          'Cédula de identidad.',
          'Certificado de domicilio.',
          'Formulario municipal.',
          'Documentación tributaria.',
          'Contrato de arriendo o autorización de uso.'
        ];
      case 'Permiso de edificación':
        return [
          'Cédula de identidad.',
          'Formulario de solicitud.',
          'Plano de ubicación.',
          'Certificado de informaciones previas.',
          'Documentos técnicos del proyecto.'
        ];
      case 'Inspección sanitaria':
        return [
          'Cédula de identidad.',
          'Formulario de solicitud sanitaria.',
          'Antecedentes del local.',
          'Certificado de agua potable.',
          'Plan de manejo de residuos.'
        ];
      default:
        return [
          'Cédula de identidad.',
          'Certificado de domicilio.',
          'Formulario municipal.',
          'Documentación tributaria.',
          'Contrato de arriendo o autorización de uso.'
        ];
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': '#0084D8', color: 'white', '--padding-end': '0', '--min-height': '56px' }}>
          <IonButtons slot="start">
            <IonMenuButton style={{ color: 'white' }} />
          </IonButtons>

          <IonTitle style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>
            Gestor de solicitudes
          </IonTitle>

          <IonButtons slot="end" style={{ margin: '0', height: '56px', display: 'flex', alignItems: 'center' }}>
            <IonIcon icon={notificationsOutline} style={{ fontSize: '1.5rem', marginRight: '15px', cursor: 'pointer' }} />
            <IonIcon icon={personCircleOutline} style={{ fontSize: '1.8rem', marginRight: '15px', cursor: 'pointer' }} />

            <div
              style={{
                backgroundColor: '#EDCA4E',
                color: 'white',
                padding: '0 25px',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                height: '100%',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Rol: Solicitante
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ '--background': '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', paddingTop: '10px', paddingBottom: '40px' }}>

          <h2 style={{ color: '#000', fontWeight: 'bold', marginBottom: '20px', fontSize: '1.8rem' }}>
            Información sobre solicitudes
          </h2>

          <div style={{
            backgroundColor: '#eeeeee',
            borderRadius: '8px',
            padding: '30px',
            color: '#000'
          }}>

            {/* Selector tipo de trámite */}
            <div style={{ marginBottom: '35px' }}>
              <label style={{
                display: 'block',
                fontSize: '1rem',
                fontWeight: 'bold',
                marginBottom: '15px',
                color: '#000'
              }}>
                Seleccione tipo de trámite:
              </label>

              <IonSelect
                interface="popover"
                value={tipoTramite}
                placeholder="Seleccione..."
                onIonChange={e => setTipoTramite(e.detail.value!)}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #999',
                  borderRadius: '6px',
                  width: '200px',
                  minHeight: '40px',
                  paddingLeft: '5px',
                  color: '#333'
                }}
              >
                <IonSelectOption value="Patente comercial">Patente comercial</IonSelectOption>
                <IonSelectOption value="Permiso de edificación">Permiso de edificación</IonSelectOption>
                <IonSelectOption value="Inspección sanitaria">Inspección sanitaria</IonSelectOption>
              </IonSelect>
            </div>

            {/* Documentos requeridos */}
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '15px', color: '#000' }}>
                Documentos requeridos:
              </h3>

              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid #999',
                borderRadius: '6px',
                width: '520px',
                minHeight: '210px',
                padding: '15px',
                color: '#222',
                lineHeight: '1.5'
              }}>
                {obtenerDocumentos().map((documento, index) => (
                  <div key={index}>- {documento}</div>
                ))}
              </div>
            </div>

            {/* Tiempo y área */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '60px',
              marginTop: '20px'
            }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '10px', color: '#000' }}>
                  Tiempo estimado de revisión:
                </h3>

                <div style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #999',
                  borderRadius: '6px',
                  padding: '10px',
                  minHeight: '45px',
                  color: '#222'
                }}>
                  5 a 10 días hábiles.
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '10px', color: '#000' }}>
                  Área responsable:
                </h3>

                <div style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #999',
                  borderRadius: '6px',
                  padding: '10px',
                  minHeight: '45px',
                  color: '#222'
                }}>
                  Departamento de Rentas Municipales.
                </div>
              </div>
            </div>

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default InfoSolicitudes;