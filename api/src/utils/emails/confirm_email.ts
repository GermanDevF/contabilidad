import path from 'node:path';
import fs from 'node:fs';
import createTransporter, { from } from './common';
import { env } from '../env';
import { createTemplateDir } from '../commons';

interface SendConfirmEmailProps {
  to: string;
  userName: string;
  validationToken: string;
}

export const sendConfirmEmail = async ({
  to,
  userName,
  validationToken,
}: SendConfirmEmailProps) => {
  const { CLIENT_URL, APP_NAME } = env;
  const transporter = createTransporter();
  const templatePath = createTemplateDir('ConfirmEmail/confirm_email.html');

  const verificationUrl = `${CLIENT_URL}/verify-email?token=${validationToken}`;

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
