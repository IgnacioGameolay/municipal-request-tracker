import React, { useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import type { Role } from "../../context/AuthContext";

import EncabezadoAuth from "../../components/auth/EncabezadoAuth";
import FormularioLogin from "../../components/auth/FormularioLogin";

import { validarLogin } from "../../dominio/reglas/validarLogin";
import {
  obtenerRutaInicioPorRol,
  RolSesion,
} from "../../aplicacion/casosDeUso/obtenerRutaInicioPorRol";

import { login as loginApi } from "../../services/authApi";
import { ApiClientError } from "../../services/apiClient";

const LoginPage: React.FC = () => {
  const history = useHistory();
  const { login: loginContext } = useAuth();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [rolSeleccionado, setRolSeleccionado] = useState<Role | undefined>();
  const [error, setError] = useState("");

  const ingresar = async () => {
    const mensajeError = validarLogin({
      correo,
      password,
      rolSeleccionado,
    });

    if (mensajeError) {
      setError(mensajeError);
      return;
    }

    if (!rolSeleccionado) {
      return;
    }
try {
      setError("");

      const sesion = await loginApi(correo, password);

      const rolBackend = sesion.user.rol;
      const rolRealFrontend: Role =
        rolBackend === "ciudadano" ? "solicitante" : "funcionario";

      if (rolRealFrontend !== rolSeleccionado) {
        setError(
          "El rol seleccionado no coincide con el usuario ingresado. Revisa si estás entrando como solicitante o funcionario."
        );
        return;
      }

      loginContext(rolRealFrontend);

      history.push(obtenerRutaInicioPorRol(rolRealFrontend as RolSesion));
    } catch (error) {
      if (error instanceof ApiClientError) {
        setError(error.message);
        return;
      }

      if (error instanceof Error) {
        setError(error.message);
        return;
      }

      setError("No se pudo iniciar sesión. Intenta nuevamente.");
    }
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
