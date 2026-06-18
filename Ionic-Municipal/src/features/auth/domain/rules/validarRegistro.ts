export interface DatosRegistro {
  nombre: string;
  apellido: string;
  rut: string;
  region: string;
  comuna: string;
  correo: string;
  password: string;
  confirmarPassword: string;
  aceptaTerminos: boolean;
}

export const validarRegistro = ({
  nombre,
  apellido,
  rut,
  region,
  comuna,
  correo,
  password,
  confirmarPassword,
  aceptaTerminos,
}: DatosRegistro): string => {
  if (
    !nombre.trim() ||
    !apellido.trim() ||
    !rut.trim() ||
    !region.trim() ||
    !comuna.trim() ||
    !correo.trim() ||
    !password.trim() ||
    !confirmarPassword.trim()
  ) {
    return "Debes completar todos los campos obligatorios.";
  }

  if (!correo.includes("@")) {
    return "Debes ingresar un correo electrónico válido.";
  }

  if (password.length < 6) {
    return "La contraseña debe tener al menos 6 caracteres.";
  }

  if (password !== confirmarPassword) {
    return "Las contraseñas no coinciden.";
  }

  if (!aceptaTerminos) {
    return "Debes aceptar la política de privacidad y los términos de servicio.";
  }

  return "";
};
