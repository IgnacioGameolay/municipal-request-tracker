import React from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon 
} from '@ionic/react';
import { menuOutline, notificationsOutline, personCircleOutline, person } from 'ionicons/icons';

const DashboardCiudadano: React.FC = () => {
  return (
    <IonPage>
      {/* Cabecera superior oscura con íconos y Rol */}
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': '#2b2d5c', color: 'white' }}>
          <IonButtons slot="start">
            <IonIcon icon={menuOutline} style={{ fontSize: '2rem', marginLeft: '10px', cursor: 'pointer' }} />
          </IonButtons>
          
          <IonTitle style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>
            Proyecto web y movil
          </IonTitle>

          <IonButtons slot="end" style={{ display: 'flex', alignItems: 'center' }}>
            <IonIcon icon={notificationsOutline} style={{ fontSize: '1.5rem', marginRight: '15px', cursor: 'pointer' }} />
            <IonIcon icon={personCircleOutline} style={{ fontSize: '1.8rem', marginRight: '15px', cursor: 'pointer' }} />
            
            {/* Cuadro amarillo del Rol */}
            <div style={{ 
              backgroundColor: '#cddc39', color: 'white', padding: '0 20px', 
              fontWeight: 'bold', fontSize: '0.9rem', height: '100%', 
              display: 'flex', alignItems: 'center' 
            }}>
              Rol: Solicitante
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ '--background': '#ffffff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '10px' }}>
          
          <h2 style={{ color: '#000', fontWeight: 'bold', marginBottom: '20px', fontSize: '1.5rem' }}>
            Información personal
          </h2>

          {/* Tarjeta gris claro */}
          <div style={{ backgroundColor: '#eeeeee', borderRadius: '8px', padding: '30px' }}>
            <h3 style={{ color: '#666', marginTop: 0, marginBottom: '25px', fontSize: '1.1rem' }}>
              Datos personales
            </h3>

            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              
              {/* Imagen de perfil (Placeholder) */}
              <div style={{
                width: '130px', height: '160px', backgroundColor: '#a9a9a9',
                borderRadius: '8px', display: 'flex', justifyContent: 'center', 
                alignItems: 'flex-end', overflow: 'hidden'
              }}>
                <IonIcon icon={person} style={{ fontSize: '9rem', color: '#444', marginBottom: '-25px' }} />
              </div>

              {/* Cuadrícula de datos */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', flex: 1 }}>
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

        </div>
      </IonContent>
    </IonPage>
  );
};

export default DashboardCiudadano;