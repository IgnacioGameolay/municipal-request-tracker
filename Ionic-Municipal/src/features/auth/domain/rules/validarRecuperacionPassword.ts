export interface DatosRecuperacionPassword {
  correo: string;
  codigo: string[];
  nuevaPassword: string;
  confirmarPassword: string;
}

export const validarCorreoRecuperacion = (correo: string): string => {
  if (!correo.trim()) {
    return "Debes ingresar tu correo electrónico.";
  }

  if (!correo.includes("@")) {
    return "Debes ingresar un correo electrónico válido.";
  }

  return "";
};

export const validarRecuperacionPassword = ({
  correo,
  codigo,
  nuevaPassword,
  confirmarPassword,
}: DatosRecuperacionPassword): string => {
  const errorCorreo = validarCorreoRecuperacion(correo);

  if (errorCorreo) {
    return errorCorreo;
  }

  if (codigo.some((valor) => !valor.trim())) {
    return "Debes ingresar el código de verificación completo.";
  }

  if (!nuevaPassword.trim() || !confirmarPassword.trim()) {
    return "Debes ingresar y confirmar la nueva contraseña.";
  }

  if (nuevaPassword.length < 6) {
    return "La nueva contraseña debe tener al menos 6 caracteres.";
  }

  if (nuevaPassword !== confirmarPassword) {
    return "Las contraseñas no coinciden.";
  }

  return "";
};
