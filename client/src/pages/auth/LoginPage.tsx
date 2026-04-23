import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonInput, 
  IonButton, 
  IonText,
  IonRouterLink 
} from '@ionic/react';

const LoginPage: React.FC = () => {
  return (
    <IonPage>
      {/* Cabecera superior oscura */}
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
        {/* Contenedor central para que no ocupe toda la pantalla en PC */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '400px',
          margin: '40px auto 0 auto' // Centrado automático
        }}>

          <h2 style={{ fontWeight: '900', marginBottom: '30px', color: '#000' }}>
            Iniciar sesión
          </h2>

          {/* Input: Correo */}
          <IonInput
            placeholder="Correo electrónico"
            type="email"
            style={{
              backgroundColor: '#f2f2f2',
              border: '1px solid #d1d1d1',
              borderRadius: '4px',
              marginBottom: '15px',
              paddingLeft: '15px',
              width: '100%',
              height: '45px',
              color: '#666'
            }}
          />

          {/* Input: Contraseña */}
          <IonInput
            placeholder="Contraseña"
            type="password"
            style={{
              backgroundColor: '#f2f2f2',
              border: '1px solid #d1d1d1',
              borderRadius: '4px',
              marginBottom: '20px',
              paddingLeft: '15px',
              width: '100%',
              height: '45px',
              color: '#666'
            }}
          />

          {/* Botón: Ingresar */}
          <IonButton
            expand="block"
            routerLink="/ciudadano/perfil"
            style={{
              '--background': '#a3a8ff', // Color lila del diseño
              '--box-shadow': 'none',
              '--border-radius': '4px',
              width: '100%',
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '1rem',
              height: '45px',
              marginBottom: '15px'
            }}
          >
            Ingresar
          </IonButton>

          <IonRouterLink routerLink="/recuperar" style={{ fontSize: '0.8rem', color: '#666', marginBottom: '20px', textDecoration: 'none' }}>
            ¿Olvidaste tu contrasena?
          </IonRouterLink>

          {/* Botón: Crear cuenta */}
          <IonButton
            expand="block"
            routerLink="/registro"
            style={{
              '--background': '#7377ad', // Color azul/gris oscuro del diseño
              '--box-shadow': 'none',
              '--border-radius': '4px',
              width: '100%',
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '0.9rem',
              height: '40px'
            }}
          >
            Crear una cuenta
          </IonButton>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;