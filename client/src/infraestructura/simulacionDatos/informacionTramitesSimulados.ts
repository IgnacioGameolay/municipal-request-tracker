import type { InformacionTramite } from '../../dominio/entidades/InformacionTramite';

export const informacionTramitesSimulados: InformacionTramite[] = [
  {
    tipo: 'Patente comercial',
    documentos: [
      'Cédula de identidad.',
      'Certificado de domicilio.',
      'Formulario municipal.',
      'Documentación tributaria.',
      'Contrato de arriendo o autorización de uso.'
    ],
    tiempoEstimado: '5 a 10 días hábiles.',
    areaResponsable: 'Departamento de Rentas Municipales.'
  },
  {
    tipo: 'Permiso de edificación',
    documentos: [
      'Cédula de identidad.',
      'Formulario de solicitud.',
      'Plano de ubicación.',
      'Certificado de informaciones previas.',
      'Documentos técnicos del proyecto.'
    ],
    tiempoEstimado: '5 a 10 días hábiles.',
    areaResponsable: 'Departamento de Rentas Municipales.'
  },
  {
    tipo: 'Inspección sanitaria',
    documentos: [
      'Cédula de identidad.',
      'Formulario de solicitud sanitaria.',
      'Antecedentes del local.',
      'Certificado de agua potable.',
      'Plan de manejo de residuos.'
    ],
    tiempoEstimado: '5 a 10 días hábiles.',
    areaResponsable: 'Departamento de Rentas Municipales.'
  }
];