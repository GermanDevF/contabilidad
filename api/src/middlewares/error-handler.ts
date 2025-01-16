import { Request, Response } from 'express';
import { ZodError } from 'zod';

interface CustomError extends Error {
  status?: number;
  details?: unknown;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: Function
) => {
  // TODO Implementar manejo de errores con correo
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      details: err.errors.map((error) => error.message),
    });
  }
  // Determinar el código de estado
  const statusCode: number = err.status ?? 500;

  // Crear un mensaje de error genérico si no se proporciona uno
  const message = err.message ?? 'Internal Server Error';

  // Log de errores (solo en desarrollo)
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.error('🚨 Error:', err);
  }

  // Respuesta al cliente
  return res.status(statusCode).json({
    success: false,
    message,
    ...(typeof err.details === 'object' && err.details !== null
      ? { details: err.details }
      : {}), // Incluir detalles si existen
  });
};
