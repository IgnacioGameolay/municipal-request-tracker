import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { RolUsuario } from "../../features/auth/domain/entities/usuario.model.js";
import { errorResponse } from "../utils/apiResponse.js";

export interface AuthUser {
  id: string;
  email: string;
  rol: RolUsuario;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return errorResponse(res, 401, "Debes iniciar sesión", [
      { code: "missing_token" }
    ]);
  }

  const token = authHeader.replace("Bearer ", "");
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return errorResponse(res, 500, "JWT_SECRET no está configurado");
  }

  try {
    const decoded = jwt.verify(token, secret) as AuthUser;
    req.user = decoded;
    next();
  } catch {
    return errorResponse(res, 401, "Token inválido o expirado", [
      { code: "invalid_token" }
    ]);
  }
}

export function roleMiddleware(...rolesPermitidos: RolUsuario[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return errorResponse(res, 401, "Debes iniciar sesión");
    }

    if (!rolesPermitidos.includes(req.user.rol)) {
      return errorResponse(res, 403, "No tienes permisos para esta acción", [
        { code: "forbidden" }
      ]);
    }

    next();
  };
}