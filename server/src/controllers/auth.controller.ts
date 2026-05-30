import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { type SignOptions } from "jsonwebtoken";
import { usuarios } from "../data/mockDB.js";
import { RolUsuario, Usuario, UsuarioPublico } from "../models/usuario.model.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";

function toPublicUser(usuario: Usuario): UsuarioPublico {
  const { passwordHash, ...publicUser } = usuario;
  return publicUser;
}
function generateToken(usuario: Usuario) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET no configurado");
  }

  const expiresIn = (process.env.JWT_EXPIRES_IN || "2h") as SignOptions["expiresIn"];

  const options: SignOptions = {
    expiresIn
  };

  return jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol
    },
    secret,
    options
  );
}

export async function register(req: Request, res: Response) {
  const {
    nombre,
    rut,
    email,
    password,
    region,
    comuna,
    rol
  } = req.body;

  const errors = [];

  if (!nombre || typeof nombre !== "string") {
    errors.push({ field: "nombre", code: "required" });
  }

  if (!rut || typeof rut !== "string") {
    errors.push({ field: "rut", code: "required" });
  }

  if (!email || typeof email !== "string") {
    errors.push({ field: "email", code: "required" });
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    errors.push({
      field: "password",
      code: "min_length",
      message: "La contraseña debe tener al menos 6 caracteres"
    });
  }

  if (!region || typeof region !== "string") {
    errors.push({ field: "region", code: "required" });
  }

  if (!comuna || typeof comuna !== "string") {
    errors.push({ field: "comuna", code: "required" });
  }

  if (errors.length > 0) {
    return errorResponse(res, 400, "El registro contiene datos inválidos", errors);
  }

  const emailNormalizado = email.trim().toLowerCase();
  const existe = usuarios.some((u) => u.email === emailNormalizado);

  if (existe) {
    return errorResponse(res, 409, "Ya existe un usuario con ese correo", [
      { field: "email", code: "already_exists" }
    ]);
  }

  const rolFinal: RolUsuario = rol === "funcionario" ? "funcionario" : "ciudadano";

  const nuevoUsuario: Usuario = {
    id: `u${Date.now()}`,
    nombre: nombre.trim(),
    rut: rut.trim(),
    email: emailNormalizado,
    passwordHash: await bcrypt.hash(password, 10),
    region: region.trim(),
    comuna: comuna.trim(),
    rol: rolFinal,
    createdAt: new Date().toISOString()
  };

  usuarios.push(nuevoUsuario);

  const token = generateToken(nuevoUsuario);

  return successResponse(res, 201, "Usuario registrado correctamente", {
    user: toPublicUser(nuevoUsuario),
    token
  });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return errorResponse(res, 400, "Correo y contraseña son obligatorios", [
      { field: "email", code: "required" },
      { field: "password", code: "required" }
    ]);
  }

  const usuario = usuarios.find(
    (u) => u.email === String(email).trim().toLowerCase()
  );

  if (!usuario) {
    return errorResponse(res, 401, "Credenciales incorrectas", [
      { code: "invalid_credentials" }
    ]);
  }

  const passwordValida = await bcrypt.compare(password, usuario.passwordHash);

  if (!passwordValida) {
    return errorResponse(res, 401, "Credenciales incorrectas", [
      { code: "invalid_credentials" }
    ]);
  }

  const token = generateToken(usuario);

  return successResponse(res, 200, "Inicio de sesión correcto", {
    user: toPublicUser(usuario),
    token
  });
}

export function me(req: AuthRequest, res: Response) {
  const usuario = usuarios.find((u) => u.id === req.user?.id);

  if (!usuario) {
    return errorResponse(res, 404, "Usuario no encontrado");
  }

  return successResponse(res, 200, "Usuario autenticado", toPublicUser(usuario));
}