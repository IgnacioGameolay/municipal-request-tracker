import React, { useState } from 'react';
import {
  IonContent,
  IonPage
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

import EncabezadoAuth from '../../components/auth/EncabezadoAuth';
import FormularioRegistro from '../../components/auth/FormularioRegistro';

import {
  DatosRegistro,
  validarRegistro
} from '../../dominio/reglas/validarRegistro';

const datosInicialesRegistro: DatosRegistro = {
  nombre: '',
  apellido: '',
  rut: '',
  region: '',
  comuna: '',
  correo: '',
  password: '',
  confirmarPassword: '',
  aceptaTerminos: false
};

const RegisterPage: React.FC = () => {
  const history = useHistory();

  const [datosRegistro, setDatosRegistro] = useState<DatosRegistro>(
    datosInicialesRegistro
  );
  const [error, setError] = useState('');

  const cambiarCampo = (
    campo: keyof DatosRegistro,
    valor: string | boolean
  ) => {
    setDatosRegistro({
      ...datosRegistro,
      [campo]: valor
    });
  };

  const crearCuenta = () => {
    const mensajeError = validarRegistro(datosRegistro);

    if (mensajeError) {
      setError(mensajeError);
      return;
    }

    setError('');

    // En EP1 el registro es prototipal. La persistencia real queda para backend en un futuro.
    history.push('/login');
  };

  return (
    <IonPage>
      <EncabezadoAuth />

      <IonContent className="ion-padding">
        <FormularioRegistro
          datos={datosRegistro}
          error={error}
          onCambiarCampo={cambiarCampo}
          onCrearCuenta={crearCuenta}
        />
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;