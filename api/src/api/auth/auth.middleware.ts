import jsonwebtoken from 'jsonwebtoken';
import { env } from '../../utils/env';
import { NextFunction, Request, Response } from 'express';

/**
 * Middleware para verificar el token JWT.
 */
export const verifyToken = (
  req: Request<{}, {}, {}, { token: string }>,
  res: Response,
  next: NextFunction
) => {
  // Extraer el token del encabezado Authorization (formato "Bearer <token>")
  const token = req.headers.authorization?.split(' ')[1];

  // Si no hay token, devolver error
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Acceso no autorizado. Token no proporcionado.',
    });
  }

  try {
    // Verificar el token JWT usando la clave secreta
    const decoded = jsonwebtoken.verify(token, env.JWT_SECRET) as {
      id: number;
      email: string;
    };

    // Agregar la información del usuario decodificada al request
    req.user = decoded;

    // Continuar con la siguiente función/middleware
    next();
  } catch (err) {
    // Si el token no es válido o ha expirado, devolver error
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado.',
    });
  }
};

const decodeToken = (token: string) => {
  try {
    if (!token) {
      throw new Error('Token de verificación faltante');
    }
    return jsonwebtoken.decode(token) as { email: string };
  } catch (err) {
    throw err;
  }
};

const getToken = (req: Request) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('Token de verificación faltante');
    }
    return token;
  } catch (err) {
    throw err;
  }
};

export const authService = {
  verifyToken,
  decodeToken,
  getToken,
};
