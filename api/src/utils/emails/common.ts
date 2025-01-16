import nodemailer from 'nodemailer';
import { env } from '../env';

export const from: string = `"Boilerplate" <${env.EMAIL_USER}>`;

export default () =>
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
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
  });
};
