import React, { useState } from 'react';
import {
  IonContent,
  IonPage
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

import EncabezadoAuth from '../../components/auth/EncabezadoAuth';
import FormularioCambiarPassword from '../../components/auth/FormularioCambiarPassword';

import {
  validarCorreoRecuperacion,
  validarRecuperacionPassword
} from '../../dominio/reglas/validarRecuperacionPassword';

const CambiarPassword: React.FC = () => {
  const history = useHistory();

  const [correo, setCorreo] = useState('');
  const [codigo, setCodigo] = useState(['', '', '']);
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  const cambiarCodigo = (indice: number, valor: string) => {
    const codigoActualizado = [...codigo];
    codigoActualizado[indice] = valor.slice(0, 1);
    setCodigo(codigoActualizado);
  };

  const enviarCodigo = () => {
    const mensajeError = validarCorreoRecuperacion(correo);

    if (mensajeError) {
      setError(mensajeError);
      setMensajeExito('');
      return;
    }

    setError('');
    setMensajeExito('Código enviado correctamente.');
  };

  const continuar = () => {
    const mensajeError = validarRecuperacionPassword({
      correo,
      codigo,
      nuevaPassword,
      confirmarPassword
    });

    if (mensajeError) {
      setError(mensajeError);
      setMensajeExito('');
      return;
    }

    setError('');
    setMensajeExito('');

    // En EP1 el cambio de contraseña es prototipal. La lógica real queda para backend para futuas entregas.
    history.push('/login');
  };

  return (
    <IonPage>
      <EncabezadoAuth />

      <IonContent className="ion-padding">
        <FormularioCambiarPassword
          correo={correo}
          codigo={codigo}
          nuevaPassword={nuevaPassword}
          confirmarPassword={confirmarPassword}
          error={error}
          mensajeExito={mensajeExito}
          onCambiarCorreo={setCorreo}
          onCambiarCodigo={cambiarCodigo}
          onCambiarNuevaPassword={setNuevaPassword}
          onCambiarConfirmarPassword={setConfirmarPassword}
          onEnviarCodigo={enviarCodigo}
          onContinuar={continuar}
        />
      </IonContent>
    </IonPage>
  );
};

export default CambiarPassword;