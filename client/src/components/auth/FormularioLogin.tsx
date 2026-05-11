import React from 'react';
import {
  IonButton,
  IonInput,
  IonRouterLink,
  IonSelect,
  IonSelectOption,
  IonText
} from '@ionic/react';

import type { Role } from '../../context/AuthContext';

interface Props {
  correo: string;
  password: string;
  rolSeleccionado?: Role;
  error: string;
  onCambiarCorreo: (valor: string) => void;
  onCambiarPassword: (valor: string) => void;
  onCambiarRol: (rol: Role) => void;
  onIngresar: () => void;
}

const FormularioLogin: React.FC<Props> = ({
  correo,
  password,
  rolSeleccionado,
  error,
  onCambiarCorreo,
  onCambiarPassword,
  onCambiarRol,
  onIngresar
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '400px',
        margin: '40px auto 0 auto'
      }}
    >
      <h2
        style={{
          fontWeight: '900',
          marginBottom: '30px',
          color: '#000'
        }}
      >
        Iniciar sesión
      </h2>

      <IonInput
        placeholder="Correo electrónico"
        type="email"
        value={correo}
        onIonInput={e => onCambiarCorreo(e.detail.value ?? '')}
        style={estiloCampo}
      />

      <IonInput
        placeholder="Contraseña"
        type="password"
        value={password}
        onIonInput={e => onCambiarPassword(e.detail.value ?? '')}
        style={estiloCampo}
      />

      <IonSelect
        value={rolSeleccionado}
        placeholder="Tipo de usuario"
        onIonChange={e => onCambiarRol(e.detail.value as Role)}
        interface="popover"
        style={estiloSelector}
      >
        <IonSelectOption value="solicitante">
          Solicitante
        </IonSelectOption>

        <IonSelectOption value="funcionario">
          Funcionario municipal
        </IonSelectOption>
      </IonSelect>

      {error && (
        <IonText
          color="danger"
          style={{
            width: '100%',
            marginBottom: '15px',
            fontSize: '0.85rem'
          }}
        >
          {error}
        </IonText>
      )}

      <IonButton
        expand="block"
        onClick={onIngresar}
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

      <IonRouterLink
        routerLink="/recuperar"
        style={{
          fontSize: '0.8rem',
          color: '#666',
          marginBottom: '20px',
          textDecoration: 'none'
        }}
      >
        ¿Olvidaste tu contraseña?
      </IonRouterLink>

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
  );
};

const estiloCampo = {
  backgroundColor: '#f2f2f2',
  border: '1px solid #d1d1d1',
  borderRadius: '4px',
  marginBottom: '15px',
  paddingLeft: '15px',
  width: '100%',
  height: '45px',
  color: '#666'
};

const estiloSelector = {
  backgroundColor: '#f2f2f2',
  border: '1px solid #d1d1d1',
  borderRadius: '4px',
  marginBottom: '15px',
  paddingLeft: '15px',
  width: '100%',
  minHeight: '45px',
  color: '#666'
};

export default FormularioLogin;