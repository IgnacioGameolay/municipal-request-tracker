interface DatosLogin {
  correo: string;
  password: string;
  rolSeleccionado?: string;
}

export const validarLogin = ({
  correo,
  password,
  rolSeleccionado,
}: DatosLogin): string => {
  if (!correo.trim() || !password.trim()) {
    return "Debes ingresar correo electrónico y contraseña.";
  }

  if (!rolSeleccionado) {
    return "Debes seleccionar el tipo de usuario.";
  }

  return "";
};
