import React from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon, 
  IonMenuButton 
} from '@ionic/react';
import { notificationsOutline, personCircleOutline, person } from 'ionicons/icons';

const DashboardFuncionario: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': '#2b2d5c', color: 'white', '--padding-end': '0', '--min-height': '56px' }}>
          <IonButtons slot="start">
            <IonMenuButton style={{ color: 'white' }} />
          </IonButtons>
          
          <IonTitle style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>
            Proyecto web y movil
          </IonTitle>
          
          <IonButtons slot="end" style={{ margin: '0', height: '56px', display: 'flex', alignItems: 'center' }}>
            <IonIcon icon={notificationsOutline} style={{ fontSize: '1.5rem', marginRight: '15px', cursor: 'pointer' }} />
            <IonIcon icon={personCircleOutline} style={{ fontSize: '1.8rem', marginRight: '15px', cursor: 'pointer' }} />
            
            {/* BOTÓN ROJO PARA VOLVER AL CIUDADANO */}
            <div 
              onClick={() => {
                localStorage.setItem('rol_actual', 'ciudadano');
                window.dispatchEvent(new Event('rolCambiado'));
                window.location.href = '/ciudadano/tramites'; // Redirige al perfil del ciudadano
              }}
              style={{ 
                backgroundColor: '#e53935', color: 'white', padding: '0 25px', // <-- Color Rojo
                fontWeight: 'bold', fontSize: '0.9rem', height: '100%', 
                display: 'flex', alignItems: 'center', cursor: 'pointer' 
              }}>
              Rol: Funcionario Municipal
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ '--background': '#ffffff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '10px' }}>
          
          <h2 style={{ color: '#000', fontWeight: 'bold', marginBottom: '20px', fontSize: '1.5rem' }}>
            Información personal
          </h2>

          <div style={{ backgroundColor: '#eeeeee', borderRadius: '8px', padding: '30px' }}>
            <h3 style={{ color: '#666', marginTop: 0, marginBottom: '25px', fontSize: '1.1rem' }}>
              Datos personales
            </h3>

            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              <div style={{
                width: '130px', height: '160px', backgroundColor: '#a9a9a9',
                borderRadius: '8px', display: 'flex', justifyContent: 'center', 
                alignItems: 'flex-end', overflow: 'hidden'
              }}>
                <IonIcon icon={person} style={{ fontSize: '9rem', color: '#444', marginBottom: '-25px' }} />
              </div>

              {/* DATOS DEL FUNCIONARIO (Copiados de tu Figma) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', flex: 1 }}>
                <div>
                  <strong style={{ display: 'block', color: '#333', marginBottom: '5px' }}>Nombre</strong>
                  <span style={{ color: '#666' }}>Funcionario n°1</span>
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
                  <strong style={{ display: 'block', color: '#333', marginBottom: '5px' }}>Email personal</strong>
                  <span style={{ color: '#666' }}>correo@gmail.com</span>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <strong style={{ display: 'block', color: '#333', marginBottom: '5px' }}>Email Institucional</strong>
                  <span style={{ color: '#666' }}>correoinstitucional@gmail.com</span>
                </div>
                <div style={{ gridColumn: 'span 3' }}>
                  <strong style={{ display: 'block', color: '#333', marginBottom: '5px' }}>ROL</strong>
                  <span style={{ color: '#666' }}>Funcionario Municipal</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default DashboardFuncionario;