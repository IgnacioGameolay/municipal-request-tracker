import React, { useState } from 'react';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonInput, 
  IonButton, 
  IonText,
  IonRouterLink,
  IonSelect,
  IonSelectOption
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAuth, Role } from '../../context/AuthContext';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const { login } = useAuth();

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [rolSeleccionado, setRolSeleccionado] = useState<Role | undefined>(undefined);
  const [error, setError] = useState('');

  const ingresar = () => {
    
    if (!correo || !password) {
      setError('Debes ingresar correo electrónico y contraseña.');
      return;
    }

    if (!rolSeleccionado) {
      setError('Debes seleccionar el tipo de usuario.');
      return;
    }

    setError('');
    login(rolSeleccionado);

    if (rolSeleccionado === 'funcionario') {
      history.push('/funcionario/tramites');
    } else {
      history.push('/ciudadano/tramites');
    }
  };

  return (
    <IonPage>
      {/* Cabecera superior oscura */}
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': '#0084D8' }}>
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
          margin: '40px auto 0 auto'
        }}>

          <h2 style={{ fontWeight: '900', marginBottom: '30px', color: '#000' }}>
            Iniciar sesión
          </h2>

          {/* Input: Correo */}
          <IonInput
            placeholder="Correo electrónico"
            type="email"
            value={correo}
            onIonInput={(e) => setCorreo(e.detail.value ?? '')}
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
            value={password}
            onIonInput={(e) => setPassword(e.detail.value ?? '')}
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

          {/* Selector: Rol de usuario */}
          <IonSelect
            value={rolSeleccionado}
            placeholder="Tipo de usuario"
            onIonChange={(e) => setRolSeleccionado(e.detail.value as Role)}
            interface="popover"
            style={{
              backgroundColor: '#f2f2f2',
              border: '1px solid #d1d1d1',
              borderRadius: '4px',
              marginBottom: '15px',
              paddingLeft: '15px',
              width: '100%',
              minHeight: '45px',
              color: '#666'
            }}
          >
            <IonSelectOption value="solicitante">Solicitante</IonSelectOption>
            <IonSelectOption value="funcionario">Funcionario municipal</IonSelectOption>
          </IonSelect>

          {/* Mensaje de error */}
          {error && (
            <IonText color="danger" style={{ width: '100%', marginBottom: '15px', fontSize: '0.85rem' }}>
              {error}
            </IonText>
          )}

          {/* Botón: Ingresar */}
          <IonButton
            expand="block"
            onClick={ingresar}
            style={{
              '--background': '#a3a8ff',
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
            ¿Olvidaste tu contraseña?
          </IonRouterLink>

          {/* Botón: Crear cuenta */}
          <IonButton
            expand="block"
            routerLink="/registro"
            style={{
              '--background': '#7377ad',
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