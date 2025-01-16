import * as z from 'zod';
import { MESSAGES } from './commons';

const passwordSchema = z.string({ message: MESSAGES.REQUIRED });

// TODO Usarlo en el Signup
const passwordRegisterSchema = z
  .string({ message: MESSAGES.REQUIRED })
  .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  .regex(/[a-z]/, 'La contraseña debe tener al menos una letra minúscula')
  .regex(/[A-Z]/, 'La contraseña debe tener al menos una letra mayúscula')
  .regex(/[0-9]/, 'La contraseña debe tener al menos un número');

const emailSchema = z
  .string({ message: MESSAGES.REQUIRED })
  .email('El email no es válido');

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  name: z.string({ message: MESSAGES.REQUIRED }),
  email: emailSchema,
  password: passwordRegisterSchema,
  confirmPassword: passwordRegisterSchema,
});
