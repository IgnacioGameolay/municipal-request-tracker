import React, { useState } from 'react';
import {
  IonContent,
  IonPage
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import type { Role } from '../../context/AuthContext';

import EncabezadoAuth from '../../components/auth/EncabezadoAuth';
import FormularioLogin from '../../components/auth/FormularioLogin';

import { validarLogin } from '../../dominio/reglas/validarLogin';
import {
  obtenerRutaInicioPorRol,
  RolSesion
} from '../../aplicacion/casosDeUso/obtenerRutaInicioPorRol';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const { login } = useAuth();

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [rolSeleccionado, setRolSeleccionado] = useState<Role | undefined>();
  const [error, setError] = useState('');

  const ingresar = () => {
    const mensajeError = validarLogin({
      correo,
      password,
      rolSeleccionado
    });

    if (mensajeError) {
      setError(mensajeError);
      return;
    }

    if (!rolSeleccionado) {
      return;
    }

    setError('');
    login(rolSeleccionado);

    history.push(
      obtenerRutaInicioPorRol(rolSeleccionado as RolSesion)
    );
  };

  return (
    <IonPage>
      <EncabezadoAuth />

      <IonContent className="ion-padding">
        <FormularioLogin
          correo={correo}
          password={password}
          rolSeleccionado={rolSeleccionado}
          error={error}
          onCambiarCorreo={setCorreo}
          onCambiarPassword={setPassword}
          onCambiarRol={setRolSeleccionado}
          onIngresar={ingresar}
        />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;