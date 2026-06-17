
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Envía un correo electrónico de confirmación al ciudadano
 */
export const enviarCorreoConfirmacion = async (
  correoDestino: string,
  nombreCiudadano: string,
  tituloSolicitud: string,
  estado: string
) => {
  try {
    const mailOptions = {
      from: `"Portal de Solicitudes Santo Domingo" <${process.env.EMAIL_USER}>`,
      to: correoDestino,
      subject: `Comprobante de Ingreso: ${tituloSolicitud}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #2c3e50; padding: 15px; border-radius: 6px 6px 0 0; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px;">Sistema de Seguimiento Municipal</h1>
          </div>
          <div style="padding: 20px; color: #333333; line-height: 1.6;">
            <h2 style="color: #2c3e50;">¡Hola, ${nombreCiudadano}!</h2>
            <p>Te informamos que tu solicitud ha sido registrada exitosamente en nuestra plataforma digital.</p>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #3498db; margin: 20px 0;">
              <p style="margin: 5px 0;"><b>Detalle de la solicitud:</b> ${tituloSolicitud}</p>
              <p style="margin: 5px 0;"><b>Estado inicial:</b> <span style="background-color: #f1c40f; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 14px;">${estado.toUpperCase()}</span></p>
            </div>
            
            <p>A partir de este momento, los encargados del departamento correspondiente revisarán tus antecedentes. Podrás seguir el avance en tiempo real iniciando sesión en tu cuenta.</p>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 11px; color: #7f8c8d; text-align: center;">Este es un mensaje automático generado por la Ilustre Municipalidad de Santo Domingo. Por favor, no respondas a este correo.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Mailer] Correo enviado exitosamente a ${correoDestino} (ID: ${info.messageId})`);
    return true;

  } catch (error) {
    console.error("[Mailer Error] No se pudo despachar el correo electrónico:", error);
    return true; 
  }
};