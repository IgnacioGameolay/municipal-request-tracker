import React from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon,
  IonMenuButton
} from '@ionic/react';
import { notificationsOutline, personCircleOutline, person } from 'ionicons/icons';

const DashboardCiudadano: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        {/* CAMBIO DE COLOR: Nuevo Azul Cielo (#0084D8) */}
        <IonToolbar style={{ '--background': '#0084D8', color: 'white', '--padding-end': '0', '--min-height': '56px' }}>
          <IonButtons slot="start">
            <IonMenuButton style={{ color: 'white' }} />
          </IonButtons>

          <IonTitle style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>
            Gestor de Solicitudes
          </IonTitle>

          <IonButtons slot="end" style={{ margin: '0', height: '56px', display: 'flex', alignItems: 'center' }}>
            <IonIcon icon={notificationsOutline} style={{ fontSize: '1.5rem', marginRight: '15px', cursor: 'pointer' }} />
            <IonIcon icon={personCircleOutline} style={{ fontSize: '1.8rem', marginRight: '15px', cursor: 'pointer' }} />

            <div
              onClick={() => {
                const rolActual = localStorage.getItem('rol_actual') || 'ciudadano';
                const nuevoRol = rolActual === 'ciudadano' ? 'funcionario' : 'ciudadano';
                localStorage.setItem('rol_actual', nuevoRol);
                window.dispatchEvent(new Event('rolCambiado'));
                window.location.href = nuevoRol === 'ciudadano' ? '/ciudadano/tramites' : '/funcionario/tramites';
              }}
              style={{
                backgroundColor: '#EDCA4E',
                color: 'white',
                padding: '0 25px',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              Rol: {localStorage.getItem('rol_actual') === 'funcionario' ? 'Funcionario Municipal' : 'Solicitante'}
            </div>

          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ '--background': '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', paddingTop: '10px', paddingBottom: '40px' }}>

          <h2 style={{ color: '#000', fontWeight: 'bold', marginBottom: '20px', fontSize: '1.5rem' }}>
            Información personal
          </h2>

          <div style={{ backgroundColor: '#eeeeee', borderRadius: '8px', padding: '30px', marginBottom: '20px' }}>
            <h3 style={{ color: '#666', marginTop: 0, marginBottom: '25px', fontSize: '1.1rem' }}>
              Datos personales
            </h3>

            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              <div style={{
                width: '130px',
                height: '160px',
                backgroundColor: '#a9a9a9',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                overflow: 'hidden'
              }}>
                <IonIcon icon={person} style={{ fontSize: '9rem', color: '#444', marginBottom: '-25px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', flex: 1, minWidth: '500px' }}>
                <div>
                  <strong style={{ display: 'block', color: '#333', marginBottom: '5px' }}>Nombre</strong>
                  <span style={{ color: '#666' }}>Solicitante n°1</span>
                </div>

                <div>
                  <strong style={{ display: 'block', color: '#333', marginBottom: '5px' }}>Rut</strong>
                  <span style={{ color: '#666' }}>12.345.678-9</span>
                </div>

                <div>
                  <strong style={{ display: 'block', color: '#333', marginBottom: '5px' }}>Teléfono</strong>
                  <span style={{ color: '#666' }}>+56 9 1234 5678</span>
                </div>

                <div>
                  <strong style={{ display: 'block', color: '#333', marginBottom: '5px' }}>Email</strong>
                  <span style={{ color: '#666' }}>correo@gmail.com</span>
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <strong style={{ display: 'block', color: '#333', marginBottom: '5px' }}>ROL</strong>
                  <span style={{ color: '#666' }}>Solicitante</span>
                </div>
              </div>
            </div>
          </div>

          {/* Datos de empresa */}
          <h2 style={{
            color: '#000',
            fontWeight: 'bold',
            marginTop: '15px',
            marginBottom: '15px',
            fontSize: '1.5rem'
          }}>
            Datos de empresa
          </h2>

          <div style={{
            backgroundColor: '#eeeeee',
            borderRadius: '8px',
            padding: '30px',
            marginBottom: '30px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

              <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>
                <strong style={{ color: '#555', minWidth: '230px' }}>Nombre de la empresa:</strong>
                <span style={{ color: '#666' }}>“Nombre”</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '30px' }}>
                <div>
                  <strong style={{ display: 'inline-block', color: '#555', marginRight: '20px' }}>
                    Dirección:
                  </strong>
                  <span style={{ color: '#666' }}>Dirección</span>
                </div>

                <div>
                  <strong style={{ display: 'inline-block', color: '#555', marginRight: '20px' }}>
                    Comuna:
                  </strong>
                  <span style={{ color: '#666' }}>Valparaíso</span>
                </div>

                <div>
                  <strong style={{ display: 'inline-block', color: '#555', marginRight: '20px' }}>
                    Región:
                  </strong>
                  <span style={{ color: '#666' }}>Valparaíso</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>
                <strong style={{ color: '#555', minWidth: '230px' }}>Número telefónico:</strong>
                <span style={{ color: '#666' }}>+56 xxx xxxx xxxx</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>
                <strong style={{ color: '#555', minWidth: '230px' }}>Correo electrónico:</strong>
                <span style={{ color: '#666' }}>correo@gmail.com</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>
                <strong style={{ color: '#555', minWidth: '230px' }}>Sitio web:</strong>
                <span style={{ color: '#666' }}>www.pagina.com</span>
              </div>

            </div>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default DashboardCiudadano;