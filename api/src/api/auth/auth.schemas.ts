import { z } from 'zod';

const COMMON_MESSAGES = Object.freeze({
  required: 'Este campo es requerido',
});

const passwordSchema = z
  .string({ message: COMMON_MESSAGES.required })
  .min(8)
  .regex(/[a-z]/, 'La contraseña debe tener al menos una letra minúscula')
  .regex(/[A-Z]/, 'La contraseña debe tener al menos una letra mayúscula')
  .regex(/[0-9]/, 'La contraseña debe tener al menos un número');

const emailSchema = z.string().email('El email no es válido');

export const LoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const RegisterSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  newPassword: passwordSchema,
  token: z.string({ message: COMMON_MESSAGES.required }),
});

export const verifyEmailSchema = z.object({
  token: z.string({ message: COMMON_MESSAGES.required }),
});
