import React from 'react';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonInput, 
  IonButton, 
  IonCheckbox, 
  IonLabel 
} from '@ionic/react';

const RegisterPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': '#2b2d5c' }}>
          <IonTitle className="ion-text-center" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.4rem' }}>
            Proyecto web y movil
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '500px', margin: '20px auto' }}>
          
          <h2 style={{ fontWeight: '900', marginBottom: '20px', color: '#000' }}>Crear cuenta</h2>

          {/* Input Nombre */}
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: '10px' }}>
            <IonInput placeholder="Ingresa tu nombre" style={{ backgroundColor: '#f2f2f2', border: '1px solid #d1d1d1', borderRadius: '4px', paddingLeft: '15px', height: '40px', flex: 1, color: '#666' }} />
            <span style={{ color: 'red', fontSize: '0.75rem', marginLeft: '10px', width: '90px' }}>*(Obligatorio)</span>
          </div>

          {/* Input Apellido */}
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: '10px' }}>
            <IonInput placeholder="Ingresa tu apellido" style={{ backgroundColor: '#f2f2f2', border: '1px solid #d1d1d1', borderRadius: '4px', paddingLeft: '15px', height: '40px', flex: 1, color: '#666' }} />
            <span style={{ color: 'red', fontSize: '0.75rem', marginLeft: '10px', width: '90px' }}>*(Obligatorio)</span>
          </div>

          {/* Input RUT */}
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: '10px' }}>
            <IonInput placeholder="Ingresa tu RUT con guión y sin punto" style={{ backgroundColor: '#f2f2f2', border: '1px solid #d1d1d1', borderRadius: '4px', paddingLeft: '15px', height: '40px', flex: 1, color: '#666' }} />
            <span style={{ color: 'red', fontSize: '0.75rem', marginLeft: '10px', width: '90px' }}>*(Obligatorio)</span>
          </div>

          {/* Input Región */}
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: '10px' }}>
            <IonInput placeholder="Ingresa tu región" style={{ backgroundColor: '#f2f2f2', border: '1px solid #d1d1d1', borderRadius: '4px', paddingLeft: '15px', height: '40px', flex: 1, color: '#666' }} />
            <span style={{ color: 'red', fontSize: '0.75rem', marginLeft: '10px', width: '90px' }}>*(Obligatorio)</span>
          </div>

          {/* Input Comuna */}
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: '10px' }}>
            <IonInput placeholder="Ingresa tu comuna" style={{ backgroundColor: '#f2f2f2', border: '1px solid #d1d1d1', borderRadius: '4px', paddingLeft: '15px', height: '40px', flex: 1, color: '#666' }} />
            <span style={{ color: 'red', fontSize: '0.75rem', marginLeft: '10px', width: '90px' }}>*(Obligatorio)</span>
          </div>

          {/* Input Correo */}
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: '10px' }}>
            <IonInput placeholder="Correo electrónico" type="email" style={{ backgroundColor: '#f2f2f2', border: '1px solid #d1d1d1', borderRadius: '4px', paddingLeft: '15px', height: '40px', flex: 1, color: '#666' }} />
            <span style={{ color: 'red', fontSize: '0.75rem', marginLeft: '10px', width: '90px' }}>*(Obligatorio)</span>
          </div>

          {/* Input Password */}
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: '10px' }}>
            <IonInput placeholder="Contraseña" type="password" style={{ backgroundColor: '#f2f2f2', border: '1px solid #d1d1d1', borderRadius: '4px', paddingLeft: '15px', height: '40px', flex: 1, color: '#666' }} />
            <span style={{ color: 'red', fontSize: '0.75rem', marginLeft: '10px', width: '90px' }}>*(Obligatorio)</span>
          </div>

          {/* Checkbox */}
          <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%', marginTop: '10px', marginBottom: '20px' }}>
            <IonCheckbox slot="start" style={{ marginRight: '10px' }} />
            <IonLabel style={{ fontSize: '0.85rem', color: '#000' }}>
              <span style={{ color: 'red', fontWeight: 'bold' }}>[Obligatorio]</span> Leí y acepto los términos.
            </IonLabel>
          </div>

          <IonButton
            expand="block"
            routerLink="/login"
            style={{
              '--background': '#a3a8ff',
              '--border-radius': '4px',
              width: '100%',
              fontWeight: 'bold',
              height: '50px'
            }}
          >
            Ingresar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;