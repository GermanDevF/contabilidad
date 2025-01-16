import nodemailer from 'nodemailer';
import { env } from '../env';

export const from: string = `"Boilerplate" <${env.EMAIL_USER}>`;

// TODO: crear una carpeta utils/emails/templates/ y agregar plantillas de correos
// con handlebars

export const createTransporter = () =>
  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASSWORD,
    },
  });

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
}

export const sendEmail = async ({
  to,
  subject,
  text,
}: EmailOptions): Promise<void> => {
  const transporter = createTransporter();

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
  });
};
