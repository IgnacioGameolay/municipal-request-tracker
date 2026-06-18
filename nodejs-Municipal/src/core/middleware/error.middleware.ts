import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/apiResponse.js";

export function notFoundMiddleware(req: Request, res: Response) {
  return errorResponse(res, 404, `Ruta no encontrada: ${req.method} ${req.path}`);
}

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  return errorResponse(res, 500, "Error interno del servidor", [
    { code: "internal_error" }
  ]);
}