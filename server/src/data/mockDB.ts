import bcrypt from "bcrypt";
import { Usuario } from "../models/usuario.model.js";
import { Solicitud } from "../models/solicitud.model.js";
import { Notificacion } from "../models/notificacion.model.js";
import { DocumentoSolicitud } from "../models/documento.model.js";

const now = new Date().toISOString();

export const usuarios: Usuario[] = [
  {
    id: "u1",
    nombre: "Ciudadano Demo",
    rut: "11111111-1",
    email: "ciudadano@demo.cl",
    passwordHash: bcrypt.hashSync("123456", 10),
    region: "Valparaíso",
    comuna: "Valparaíso",
    rol: "ciudadano",
    createdAt: now
  },
  {
    id: "u2",
    nombre: "Funcionario Demo",
    rut: "22222222-2",
    email: "funcionario@demo.cl",
    passwordHash: bcrypt.hashSync("123456", 10),
    region: "Valparaíso",
    comuna: "Valparaíso",
    rol: "funcionario",
    createdAt: now
  }
];

export const solicitudes: Solicitud[] = [
  {
    id: "s1",
    usuarioId: "u1",
    titulo: "Luminaria dañada",
    categoria: "Alumbrado público",
    descripcion: "La luminaria de la esquina no funciona desde hace varios días.",
    direccion: "Av. Argentina 123",
    comuna: "Valparaíso",
    estado: "pendiente",
    prioridad: "media",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "s2",
    usuarioId: "u1",
    titulo: "Retiro de escombros",
    categoria: "Aseo y ornato",
    descripcion: "Hay escombros acumulados en la vereda.",
    direccion: "Calle Esmeralda 456",
    comuna: "Valparaíso",
    estado: "en_revision",
    prioridad: "alta",
    comentarioFuncionario: "Solicitud asignada a cuadrilla municipal.",
    funcionarioId: "u2",
    createdAt: now,
    updatedAt: now
  }
];

export const notificaciones: Notificacion[] = [
  {
    id: "n1",
    usuarioId: "u1",
    solicitudId: "s2",
    titulo: "Solicitud en revisión",
    mensaje: "Tu solicitud de retiro de escombros fue marcada como en revisión.",
    leida: false,
    createdAt: now
  }
];

export const documentos: DocumentoSolicitud[] = [];