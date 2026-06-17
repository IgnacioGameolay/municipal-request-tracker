import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { type SignOptions } from "jsonwebtoken";

import { prisma } from "../config/prisma.js";
import { RolUsuario } from "../models/usuario.model.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";

interface UsuarioToken {
  id: string;
  email: string;
  rol: RolUsuario;
}

interface UsuarioPublico {
  id: string;
  nombre: string;
  rut: string;
  email: string;
  region: string;
  comuna: string;
  rol: string;
  createdAt: Date;
}

const publicUserSelect = {
  id: true,
  nombre: true,
  rut: true,
  email: true,
  region: true,
  comuna: true,
  rol: true,
  createdAt: true,
} as const;

function generateToken(usuario: UsuarioToken) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET no configurado");
  }

  const expiresIn = (process.env.JWT_EXPIRES_IN ||
    "2h") as SignOptions["expiresIn"];

  const options: SignOptions = {
    expiresIn,
  };

  return jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    },
    secret,
    options,
  );
}

function toPublicUser(usuario: UsuarioPublico) {
  return {
    id: usuario.id,
    nombre: usuario.nombre,
    rut: usuario.rut,
    email: usuario.email,
    region: usuario.region,
    comuna: usuario.comuna,
    rol: usuario.rol,
    createdAt: usuario.createdAt,
  };
}

function normalizarTexto(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizarEmail(value: unknown): string {
  return normalizarTexto(value).toLowerCase();
}

function emailEsValido(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function register(req: Request, res: Response) {
  const nombre = normalizarTexto(req.body.nombre);
  const rut = normalizarTexto(req.body.rut);
  const emailNormalizado = normalizarEmail(req.body.email);
  const password = req.body.password;
  const region = normalizarTexto(req.body.region);
  const comuna = normalizarTexto(req.body.comuna);

  const errors = [];

  if (!nombre) {
    errors.push({ field: "nombre", code: "required" });
  }

  if (!rut) {
    errors.push({ field: "rut", code: "required" });
  }

  if (!emailNormalizado) {
    errors.push({ field: "email", code: "required" });
  } else if (!emailEsValido(emailNormalizado)) {
    errors.push({
      field: "email",
      code: "invalid_format",
      message: "El correo electrónico no tiene un formato válido",
    });
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    errors.push({
      field: "password",
      code: "min_length",
      message: "La contraseña debe tener al menos 6 caracteres",
    });
  }

  if (!region) {
    errors.push({ field: "region", code: "required" });
  }

  if (!comuna) {
    errors.push({ field: "comuna", code: "required" });
  }

  if (errors.length > 0) {
    return errorResponse(
      res,
      400,
      "El registro contiene datos inválidos",
      errors,
    );
  }

  const existe = await prisma.usuario.findUnique({
    where: { email: emailNormalizado },
    select: { id: true },
  });

  if (existe) {
    return errorResponse(res, 409, "Ya existe un usuario con ese correo", [
      { field: "email", code: "already_exists" },
    ]);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const nuevoUsuario = await prisma.usuario.create({
    data: {
      nombre,
      rut,
      email: emailNormalizado,
      passwordHash,
      region,
      comuna,
      rol: "ciudadano",
    },
    select: publicUserSelect,
  });

  const token = generateToken({
    id: nuevoUsuario.id,
    email: nuevoUsuario.email,
    rol: nuevoUsuario.rol as RolUsuario,
  });

  return successResponse(res, 201, "Usuario registrado correctamente", {
    user: toPublicUser(nuevoUsuario),
    token,
  });
}

export async function login(req: Request, res: Response) {
  const emailNormalizado = normalizarEmail(req.body.email);
  const password = req.body.password;

  if (!emailNormalizado || !password) {
    return errorResponse(res, 400, "Correo y contraseña son obligatorios", [
      { field: "email", code: "required" },
      { field: "password", code: "required" },
    ]);
  }

  if (!emailEsValido(emailNormalizado)) {
    return errorResponse(res, 400, "El correo electrónico no tiene un formato válido", [
      { field: "email", code: "invalid_format" },
    ]);
  }

  const usuario = await prisma.usuario.findUnique({
    where: { email: emailNormalizado },
    select: {
      id: true,
      nombre: true,
      rut: true,
      email: true,
      region: true,
      comuna: true,
      rol: true,
      createdAt: true,
      passwordHash: true,
    },
  });

  if (!usuario) {
    return errorResponse(res, 401, "Credenciales incorrectas", [
      { code: "invalid_credentials" },
    ]);
  }

  const passwordValida = await bcrypt.compare(password, usuario.passwordHash);

  if (!passwordValida) {
    return errorResponse(res, 401, "Credenciales incorrectas", [
      { code: "invalid_credentials" },
    ]);
  }

  const token = generateToken({
    id: usuario.id,
    email: usuario.email,
    rol: usuario.rol as RolUsuario,
  });

  const usuarioPublico = {
    id: usuario.id,
    nombre: usuario.nombre,
    rut: usuario.rut,
    email: usuario.email,
    region: usuario.region,
    comuna: usuario.comuna,
    rol: usuario.rol,
    createdAt: usuario.createdAt,
  };

  return successResponse(res, 200, "Inicio de sesión correcto", {
    user: toPublicUser(usuarioPublico),
    token,
  });
}

export async function me(req: AuthRequest, res: Response) {
  if (!req.user?.id) {
    return errorResponse(res, 401, "Usuario no autenticado", [
      { code: "unauthorized" },
    ]);
  }

  const usuario = await prisma.usuario.findUnique({
    where: { id: req.user.id },
    select: publicUserSelect,
  });

  if (!usuario) {
    return errorResponse(res, 404, "Usuario no encontrado");
  }

  return successResponse(res, 200, "Usuario autenticado", toPublicUser(usuario));
}