import path from 'node:path';
import fs from 'node:fs';
import createTransporter, { from } from './common';
import { env } from '../env';
import { createTemplateDir } from '../commons';

interface SendForgotPasswordProps {
  to: string;
  userName: string;
  token: string;
}

export const sendForgotPassword = async ({
  to,
  userName,
  token,
}: SendForgotPasswordProps) => {
  const { CLIENT_URL, APP_NAME } = env;
  const transporter = createTransporter();
  const templatePath = createTemplateDir('ForgotPassword/forgot_password.html');

  const verificationUrl = `${CLIENT_URL}/reset-password?token=${token}`;

  let html = fs.readFileSync(templatePath, 'utf8');

  const variables = {
    '{{userName}}': userName,
    '{{verificationUrl}}': verificationUrl,
    '{{year}}': new Date().getFullYear().toString(),
    '{{companyName}}': APP_NAME,
  };

  // Reemplazar variables en la plantilla
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(key, 'g'); // Expresión regular global
    html = html.replace(regex, value);
  }

  await transporter.sendMail({
    from,
    to,
    subject: 'Confirma tu correo electrónico',
    html,
  });
};
