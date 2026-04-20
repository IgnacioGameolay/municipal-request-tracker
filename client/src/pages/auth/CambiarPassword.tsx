import React from 'react';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonInput, 
  IonButton,
  IonLabel 
} from '@ionic/react';

const CambiarPassword: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': '#2b2d5c' }}>
          <IonTitle 
            className="ion-text-center" 
            style={{ color: 'white', fontWeight: 'bold', fontSize: '1.4rem' }}
          >
            Proyecto web y movil
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '400px',
          margin: '40px auto 0 auto'
        }}>

          <h2 style={{ fontWeight: '900', marginBottom: '30px', color: '#000' }}>
            Cambiar contrasena
          </h2>

          <div style={{ width: '100%', marginBottom: '20px' }}>
            <IonLabel style={{ fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '5px', display: 'block', color: '#000' }}>
              Ingrese su correo
            </IonLabel>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <IonInput
                placeholder="Correo electronico"
                type="email"
                style={{
                  backgroundColor: '#f2f2f2',
                  border: '1px solid #d1d1d1',
                  borderRadius: '4px',
                  paddingLeft: '15px',
                  height: '40px',
                  flex: 1,
                  color: '#666'
                }}
              />
              <IonButton
                style={{
                  '--background': '#ff4d4d',
                  '--border-radius': '6px',
                  height: '40px',
                  margin: 0,
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: '0.85rem'
                }}
              >
                Enviar codigo
              </IonButton>
            </div>
          </div>

          <div style={{ width: '100%', marginBottom: '30px', textAlign: 'center' }}>
            <IonLabel style={{ fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '10px', display: 'block', color: '#000' }}>
              Codigo de verificacion
            </IonLabel>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <IonInput style={{ backgroundColor: '#f2f2f2', border: '1px solid #d1d1d1', borderRadius: '4px', width: '45px', height: '45px', textAlign: 'center' }} />
              <IonInput style={{ backgroundColor: '#f2f2f2', border: '1px solid #d1d1d1', borderRadius: '4px', width: '45px', height: '45px', textAlign: 'center' }} />
              <IonInput style={{ backgroundColor: '#f2f2f2', border: '1px solid #d1d1d1', borderRadius: '4px', width: '45px', height: '45px', textAlign: 'center' }} />
            </div>
          </div>

          <div style={{ width: '100%', marginBottom: '30px' }}>
            <IonLabel style={{ fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '5px', display: 'block', color: '#000' }}>
              Ingrese su nueva contrasena
            </IonLabel>
            <IonInput
              placeholder="Contrasena"
              type="password"
              style={{ backgroundColor: '#f2f2f2', border: '1px solid #d1d1d1', borderRadius: '4px', marginBottom: '10px', paddingLeft: '15px', width: '100%', height: '40px', color: '#666' }}
            />
            <IonInput
              placeholder="Confirmar contrasena"
              type="password"
              style={{ backgroundColor: '#f2f2f2', border: '1px solid #d1d1d1', borderRadius: '4px', paddingLeft: '15px', width: '100%', height: '40px', color: '#666' }}
            />
          </div>

          <IonButton
            expand="block"
            routerLink="/login"
            style={{
              '--background': '#a3a8ff',
              '--box-shadow': 'none',
              '--border-radius': '4px',
              width: '100%',
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '1rem',
              height: '45px'
            }}
          >
            Continuar
          </IonButton>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default CambiarPassword;