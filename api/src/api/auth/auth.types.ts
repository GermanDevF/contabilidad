/**
 * Interfaz para los datos requeridos al registrarse.
 */
export interface SignupRequest {
  email: string;
  password: string;
}

/**
 * Interfaz para los datos requeridos al iniciar sesión.
 */
export interface SigninRequest {
  email: string;
  password: string;
}

/**
 * Interfaz para la respuesta del controlador.
 */
export interface ControllerResponse {
  success: boolean;
  message: string;
  data?: unknown; // Opcional para incluir información adicional
  token?: string; // Opcional para incluir el token en respuestas como signin
  refreshToken?: string; // Opcional para incluir el refreshToken en respuestas como signin
}

/**
 * Interfaz para un usuario básico retornado por la base de datos.
 */
export interface BasicUser {
  id: number;
  email: string;
  password: string; // Encriptado
  isVerified: boolean;
}

/**
 * Interfaz para la información de un usuario.
 */
export interface User {
  id: number;
  email: string;
  isVerified: boolean;
}

export interface UserDataAPI {
  success: boolean;
  data: User;
}


declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: number;
      email: string;
    };
  }
}

