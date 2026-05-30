import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("123456", 10);

  await prisma.usuario.upsert({
    where: { email: "ciudadano@demo.cl" },
    update: {
      id: "u1",
      nombre: "Ciudadano Demo",
      rut: "11111111-1",
      passwordHash,
      region: "Valparaíso",
      comuna: "Valparaíso",
      rol: "ciudadano",
    },
    create: {
      id: "u1",
      nombre: "Ciudadano Demo",
      rut: "11111111-1",
      email: "ciudadano@demo.cl",
      passwordHash,
      region: "Valparaíso",
      comuna: "Valparaíso",
      rol: "ciudadano",
    },
  });

  await prisma.usuario.upsert({
    where: { email: "funcionario@demo.cl" },
    update: {
      id: "u2",
      nombre: "Funcionario Demo",
      rut: "22222222-2",
      passwordHash,
      region: "Valparaíso",
      comuna: "Valparaíso",
      rol: "funcionario",
    },
    create: {
      id: "u2",
      nombre: "Funcionario Demo",
      rut: "22222222-2",
      email: "funcionario@demo.cl",
      passwordHash,
      region: "Valparaíso",
      comuna: "Valparaíso",
      rol: "funcionario",
    },
  });

  console.log("Usuarios demo creados correctamente.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });