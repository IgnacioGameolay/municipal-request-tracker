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

function toPublicUser(usuario: {
  id: string;
  nombre: string;
  rut: string;
  email: string;
  region: string;
  comuna: string;
  rol: string;
  createdAt: Date;
}) {
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

export async function register(req: Request, res: Response) {
  const {
    nombre,
    rut,
    email,
    password,
    region,
    comuna,
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
      message: "La contraseña debe tener al menos 6 caracteres",
    });
  }

  if (!region || typeof region !== "string") {
    errors.push({ field: "region", code: "required" });
  }

  if (!comuna || typeof comuna !== "string") {
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

  const emailNormalizado = String(email).trim().toLowerCase();

  const existe = await prisma.usuario.findUnique({
    where: { email: emailNormalizado },
  });

  if (existe) {
    return errorResponse(res, 409, "Ya existe un usuario con ese correo", [
      { field: "email", code: "already_exists" },
    ]);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const nuevoUsuario = await prisma.usuario.create({
    data: {
      nombre: nombre.trim(),
      rut: rut.trim(),
      email: emailNormalizado,
      passwordHash,
      region: region.trim(),
      comuna: comuna.trim(),
      rol: "ciudadano",
    },
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
  const { email, password } = req.body;

  if (!email || !password) {
    return errorResponse(res, 400, "Correo y contraseña son obligatorios", [
      { field: "email", code: "required" },
      { field: "password", code: "required" },
    ]);
  }

  const emailNormalizado = String(email).trim().toLowerCase();

  const usuario = await prisma.usuario.findUnique({
    where: { email: emailNormalizado },
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

  return successResponse(res, 200, "Inicio de sesión correcto", {
    user: toPublicUser(usuario),
    token,
  });
}

export async function me(req: AuthRequest, res: Response) {
  const usuario = await prisma.usuario.findUnique({
    where: { id: req.user?.id },
  });

  if (!usuario) {
    return errorResponse(res, 404, "Usuario no encontrado");
  }

  return successResponse(res, 200, "Usuario autenticado", toPublicUser(usuario));
}