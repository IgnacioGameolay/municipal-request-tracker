import { Response } from "express";

import { AuthRequest } from "../middlewares/auth.middleware.js";
import { successResponse } from "../utils/apiResponse.js";

interface TramiteMunicipal {
  id: string;
  tipo: string;
  documentos: string[];
  tiempoEstimado: string;
  areaResponsable: string;
}

const tramitesMunicipales: TramiteMunicipal[] = [
  {
    id: "permiso-circulacion-2026",
    tipo: "Permisos de Circulación 2026",
    documentos: [
      "Cédula de identidad vigente.",
      "Permiso de circulación anterior.",
      "Seguro obligatorio SOAP vigente.",
      "Revisión técnica y certificado de gases al día.",
      "Padrón del vehículo o certificado de inscripción.",
    ],
    tiempoEstimado: "3 a 5 días hábiles.",
    areaResponsable: "Dirección de Tránsito y Transporte Público.",
  },
  {
    id: "patentes-municipales",
    tipo: "Patentes Municipales",
    documentos: [
      "Cédula de identidad o RUT de la empresa.",
      "Inicio de actividades del Servicio de Impuestos Internos.",
      "Contrato de arriendo, escritura o autorización de uso del inmueble.",
      "Certificado de zonificación o informe previo municipal.",
      "Formulario de solicitud de patente municipal.",
    ],
    tiempoEstimado: "5 a 10 días hábiles.",
    areaResponsable: "Departamento de Rentas Municipales.",
  },
  {
    id: "becas-municipales-2026",
    tipo: "Becas Municipales 2026",
    documentos: [
      "Cédula de identidad del postulante.",
      "Certificado de alumno regular.",
      "Registro Social de Hogares actualizado.",
      "Comprobante de domicilio.",
      "Certificado de notas o avance académico, si corresponde.",
    ],
    tiempoEstimado: "10 a 15 días hábiles.",
    areaResponsable: "Dirección de Desarrollo Comunitario.",
  },
  {
    id: "licencia-conducir",
    tipo: "Obtener y Renovar una Licencia de Conducir",
    documentos: [
      "Cédula de identidad vigente.",
      "Certificado de residencia o domicilio en la comuna.",
      "Licencia anterior, si corresponde a renovación.",
      "Certificado de estudios, cuando sea requerido por el tipo de licencia.",
      "Comprobante de pago de derechos municipales.",
    ],
    tiempoEstimado: "5 a 7 días hábiles.",
    areaResponsable: "Dirección de Tránsito y Transporte Público.",
  },
  {
    id: "derechos-aseo-domiciliario",
    tipo: "Derechos de Aseo Domiciliario",
    documentos: [
      "Cédula de identidad del solicitante.",
      "Rol de avalúo de la propiedad.",
      "Comprobante de domicilio.",
      "Documento que acredite dominio, arriendo o representación.",
      "Formulario municipal de solicitud o regularización.",
    ],
    tiempoEstimado: "5 a 10 días hábiles.",
    areaResponsable: "Departamento de Rentas Municipales.",
  },
  {
    id: "informacion-reclamos-sugerencias",
    tipo: "Solicitud de Información, Reclamos y Sugerencias",
    documentos: [
      "Identificación del solicitante.",
      "Descripción clara de la solicitud, reclamo o sugerencia.",
      "Medios de respaldo, fotografías o documentos, si corresponde.",
      "Datos de contacto para recibir respuesta.",
    ],
    tiempoEstimado: "5 a 20 días hábiles, según la naturaleza de la solicitud.",
    areaResponsable: "Oficina de Atención Ciudadana.",
  },
  {
    id: "casilla-unica-digital",
    tipo: "Obtención de Casilla Única Digital",
    documentos: [
      "Cédula de identidad vigente.",
      "Correo electrónico personal activo.",
      "Comprobante de domicilio o residencia comunal.",
      "Formulario de solicitud de activación digital.",
    ],
    tiempoEstimado: "2 a 5 días hábiles.",
    areaResponsable: "Unidad de Transformación Digital Municipal.",
  },
];

export async function listarTramites(req: AuthRequest, res: Response) {
  return successResponse(
    res,
    200,
    "Trámites obtenidos correctamente",
    tramitesMunicipales,
  );
}