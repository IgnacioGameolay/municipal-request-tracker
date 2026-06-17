import nodemailer from "nodemailer";
import type { SendMailOptions } from "nodemailer";
import he from "he";

const escapeHtml = (value: string | null | undefined): string => {
  return he.encode(value ?? "", {
    useNamedReferences: true,
  });
};

const sanitizeHeader = (value: string | null | undefined): string => {
  return (value ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim();
};

const emailEstaHabilitado = (): boolean => {
  return process.env.EMAIL_ENABLED === "true";
};

const credencialesCorreoConfiguradas = (): boolean => {
  return Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS);
};

const crearTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// EF3 Y EF5
export const enviarCorreoConfirmacion = async (
  correoDestino: string,
  nombreCiudadano: string,
  tituloSolicitud: string,
  estado: string,
): Promise<boolean> => {
  if (!emailEstaHabilitado()) {
    console.log("[Mailer] Envío de correos deshabilitado por EMAIL_ENABLED.");
    return false;
  }

  if (!credencialesCorreoConfiguradas()) {
    console.warn(
      "[Mailer] EMAIL_USER o EMAIL_PASS no están configurados. No se enviará correo.",
    );
    return false;
  }

  const correoDestinoSeguro = sanitizeHeader(correoDestino);
  const tituloSeguroParaHeader = sanitizeHeader(tituloSolicitud);
  const estadoNormalizado = sanitizeHeader(estado).toUpperCase();

  const nombreCiudadanoHtml = escapeHtml(nombreCiudadano);
  const tituloSolicitudHtml = escapeHtml(tituloSolicitud);
  const estadoHtml = escapeHtml(estadoNormalizado);

  const from = sanitizeHeader(
    process.env.EMAIL_FROM ??
      `Portal de Solicitudes Santo Domingo <${process.env.EMAIL_USER}>`,
  );

  try {
    const transporter = crearTransporter();

    const mailOptions: SendMailOptions = {
      from,
      to: correoDestinoSeguro,
      subject: `Comprobante de Ingreso: ${tituloSeguroParaHeader}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #2c3e50; padding: 15px; border-radius: 6px 6px 0 0; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px;">Sistema de Seguimiento Municipal</h1>
          </div>

          <div style="padding: 20px; color: #333333; line-height: 1.6;">
            <h2 style="color: #2c3e50;">¡Hola, ${nombreCiudadanoHtml}!</h2>

            <p>
              Te informamos que tu solicitud ha sido registrada exitosamente
              en nuestra plataforma digital.
            </p>

            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #3498db; margin: 20px 0;">
              <p style="margin: 5px 0;">
                <b>Detalle de la solicitud:</b> ${tituloSolicitudHtml}
              </p>

              <p style="margin: 5px 0;">
                <b>Estado inicial:</b>
                <span style="background-color: #f1c40f; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 14px;">
                  ${estadoHtml}
                </span>
              </p>
            </div>

            <p>
              A partir de este momento, los encargados del departamento
              correspondiente revisarán tus antecedentes. Podrás seguir el
              avance en tiempo real iniciando sesión en tu cuenta.
            </p>
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">

          <p style="font-size: 11px; color: #7f8c8d; text-align: center;">
            Este es un mensaje automático generado por la Ilustre Municipalidad
            de Santo Domingo. Por favor, no respondas a este correo.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(
      `[Mailer] Correo enviado exitosamente a ${correoDestinoSeguro} (ID: ${info.messageId})`,
    );

    return true;
  } catch (error) {
    console.error(
      "[Mailer Error] No se pudo despachar el correo electrónico:",
      error,
    );

    return false;
  }
};