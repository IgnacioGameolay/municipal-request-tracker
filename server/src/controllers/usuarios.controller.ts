import { Response } from "express";

import { prisma } from "../config/prisma.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { successResponse } from "../utils/apiResponse.js";

export async function listarFuncionarios(req: AuthRequest, res: Response) {
  const funcionarios = await prisma.usuario.findMany({
    where: { rol: "funcionario" },
    select: {
      id: true,
      nombre: true,
      rut: true,
      email: true,
      region: true,
      comuna: true,
      rol: true,
      createdAt: true,
    },
    orderBy: { nombre: "asc" },
  });

  return successResponse(
    res,
    200,
    "Funcionarios obtenidos correctamente",
    funcionarios,
  );
}