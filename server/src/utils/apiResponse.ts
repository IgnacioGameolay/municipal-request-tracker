import { Response } from "express";

export interface ApiError {
  field?: string;
  code: string;
  message?: string;
}

export function successResponse<T>(
  res: Response,
  status: number,
  message: string,
  data?: T
) {
  return res.status(status).json({
    ok: true,
    message,
    data
  });
}

export function errorResponse(
  res: Response,
  status: number,
  message: string,
  errors?: ApiError[]
) {
  return res.status(status).json({
    ok: false,
    message,
    errors
  });
}