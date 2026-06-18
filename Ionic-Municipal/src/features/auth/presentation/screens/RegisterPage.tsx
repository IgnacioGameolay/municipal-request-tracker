import React, { useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../../../core/auth/AuthContext";
import type { Role } from "../../../../core/auth/AuthContext";

import EncabezadoAuth from "../components/EncabezadoAuth";
import FormularioRegistro from "../components/FormularioRegistro";

import {
  DatosRegistro,
  validarRegistro,
} from "../../domain/rules/validarRegistro";

import { register as registerApi } from "../../data/authApi";
import { ApiClientError } from "../../../../network/apiClient";

import {
  obtenerRutaInicioPorRol,
  RolSesion,
} from "../../domain/rules/obtenerRutaInicioPorRol";

const datosInicialesRegistro: DatosRegistro = {
  nombre: "",
  apellido: "",
  rut: "",
  region: "",
  comuna: "",
  correo: "",
  password: "",
  confirmarPassword: "",
  aceptaTerminos: false,
};

const RegisterPage: React.FC = () => {
  const history = useHistory();
  const { login: loginContext } = useAuth();

  const [datosRegistro, setDatosRegistro] = useState<DatosRegistro>(
    datosInicialesRegistro,
  );
  const [error, setError] = useState("");

  const cambiarCampo = (
    campo: keyof DatosRegistro,
    valor: string | boolean,
  ) => {
    setDatosRegistro({
      ...datosRegistro,
      [campo]: valor,
    });
  };

  const crearCuenta = async () => {
    const mensajeError = validarRegistro(datosRegistro);

    if (mensajeError) {
      setError(mensajeError);
      return;
    }

    try {
      setError("");

      const nombreCompleto = `${datosRegistro.nombre} ${datosRegistro.apellido}`.trim();

      // El backend registra al usuario y devuelve la sesión con token JWT.
      const sesion = await registerApi({
        nombre: nombreCompleto,
        rut: datosRegistro.rut,
        email: datosRegistro.correo,
        password: datosRegistro.password,
        region: datosRegistro.region,
        comuna: datosRegistro.comuna,
      });

      const rolFrontend: Role = "solicitante";

      // Guardamos token, usuario y rol en el contexto global.
      loginContext(sesion);

      history.replace(obtenerRutaInicioPorRol(rolFrontend as RolSesion));
    } catch (error) {
      if (error instanceof ApiClientError) {
        setError(error.message);
        return;
      }

      if (error instanceof Error) {
        setError(error.message);
        return;
      }

      setError("No se pudo crear la cuenta. Intenta nuevamente.");
    }
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
