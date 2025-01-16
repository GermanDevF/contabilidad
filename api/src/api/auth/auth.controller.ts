import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { db } from '../../utils/db';
import { env } from '../../utils/env';
import {
  SignupRequest,
  SigninRequest,
  ControllerResponse,
  BasicUser,
} from './auth.types';
import { authService } from './auth.middleware';
import {
  RegisterSchema,
  LoginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from './auth.schemas';
import { sendConfirmEmail } from '../../utils/emails/confirm_email';
import { sendForgotPassword } from '../../utils/emails/forgot_password';

export class AuthController {
  /**
   * Maneja el registro de un nuevo usuario.
   */
  async signup(
    req: Request<{}, {}, SignupRequest>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, password } = RegisterSchema.parse(req.body);

      // Verificar si el usuario ya existe
      const userExists = await db.user.findFirst({ where: { email } });
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'El email ya está registrado',
        });
      }

      // Crear usuario con estado no verificado
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser: BasicUser = await db.user.create({
        data: { email, password: hashedPassword, isVerified: false },
      });

      // Generar token de validación
      const validationToken = jsonwebtoken.sign(
        { id: newUser.id, email: newUser.email },
        env.JWT_SECRET,
        { expiresIn: '1d' } // Token válido por 1 día
      );

      await sendConfirmEmail({
        to: email,
        userName: email,
        validationToken,
      });
      // Enviar email de validación
      // const validationUrl = `${env.CLIENT_URL}/verify-email?token=${validationToken}`;
      // await sendEmail({
      //   to: email,
      //   subject: 'Confirma tu correo electrónico',
      //   text: `Haz clic en el siguiente enlace para confirmar tu correo: ${validationUrl}`,
      // });

      const response: ControllerResponse = {
        success: true,
        message: 'Usuario creado exitosamente. Por favor, verifica tu correo.',
      };

      return res.status(201).json(response);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Maneja el inicio de sesión de un usuario.
   */
  async signin(
    req: Request<{}, {}, SigninRequest>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, password } = LoginSchema.parse(req.body);

      // Verificar si el usuario existe
      const user = (await db.user.findFirst({
        where: { email },
      })) as BasicUser | null;
      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Usuario no encontrado',
        });
      }

      // Verificar si el usuario está verificado
      if (!user.isVerified) {
        return res.status(400).json({
          success: false,
          message: 'Por favor, verifica tu correo antes de iniciar sesión',
        });
      }

      // Validar contraseña
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          message: 'Contraseña incorrecta',
        });
      }

      // Generar token
      const token = this.generateToken(user.id, user.email, '1h');
      const refreshToken = this.generateToken(user.id, user.email, '7d');

      const response: ControllerResponse = {
        success: true,
        message: 'Inicio de sesión exitoso',
        token,
        refreshToken,
      };

      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Maneja la solicitud para restablecer contraseña.
   */
  async forgotPassword(
    req: Request<{}, {}, { email: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email } = forgotPasswordSchema.parse(req.body);

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'El email es requerido',
        });
      }

      // Verificar si el usuario existe
      const user = await db.user.findFirst({ where: { email } });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Usuario no encontrado',
        });
      }

      // Generar token JWT
      const token = jsonwebtoken.sign(
        { id: user.id, email }, // Información a codificar
        env.JWT_SECRET,
        { expiresIn: '1h' } // Expira en 1 hora
      );

      // Enviar email con el enlace de restablecimiento
      await sendForgotPassword({
        to: email,
        userName: email,
        token,
      });

      return res.status(200).json({
        success: true,
        message: 'Correo de restablecimiento enviado',
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Maneja el restablecimiento de contraseña.
   */
  async resetPassword(
    req: Request<{}, {}, { token: string; newPassword: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { token, newPassword } = resetPasswordSchema.parse(req.body);

      // Validar nueva contraseña
      if (!newPassword || newPassword.length < 8) {
        return res.status(400).json({
          success: false,
          message: 'La nueva contraseña debe tener al menos 8 caracteres',
        });
      }

      // Verificar el token JWT
      let payload;
      try {
        payload = jsonwebtoken.verify(token, env.JWT_SECRET) as {
          id: number;
          email: string;
        };
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: 'Token inválido o expirado',
        });
      }

      // Actualizar contraseña del usuario
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await db.user.update({
        where: { id: payload.id },
        data: { password: hashedPassword },
      });

      return res.status(200).json({
        success: true,
        message: 'Contraseña actualizada exitosamente',
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Maneja la verificación de correo electrónico.
   */
  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = verifyEmailSchema.parse(req.body);

      if (!token) {
        // throw new Error('Token de verificación faltante');
        return res.status(400).json({
          success: false,
          message: 'Token de verificación faltante',
        });
      }

      // Verificar y decodificar el token
      let payload;
      try {
        payload = jsonwebtoken.verify(token as string, env.JWT_SECRET) as {
          id: number;
          email: string;
        };
        console.log('Payload:', payload);
      } catch (err) {
        // throw new Error('Token inválido o expirado');
        return res.status(400).json({
          success: false,
          message: 'Token inválido o expirado',
        });
      }

      const _user = await db.user.findFirst({ where: { id: payload.id } });

      if (!_user) {
        return res.status(400).json({
          success: false,
          message: 'Usuario no encontrado',
        });
      }

      // Actualizar el estado del usuario
      await db.user.update({
        where: { id: payload.id },
        data: { isVerified: true },
      });

      return res.status(200).json({
        success: true,
        message: 'Correo verificado exitosamente',
      });
    } catch (error) {
      return next(error);
    }
  }

  async getUserData(
    req: Request<{}, {}, {}, { token: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = authService.getToken(req);
      console.log('Token obtenido:', token);

      const { email } = authService.decodeToken(token);
      console.log('Email decodificado:', email);

      const user = await db.user.findFirst({ where: { email } });
      console.log('Usuario encontrado en la base de datos:', user);

      if (!user) {
        console.log('Usuario no encontrado');
        return res.status(400).json({
          success: false,
          message: 'Usuario no encontrado',
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('Error en getUserData:', error);
      return next(error);
    }
  }

  /**
   * Genera un token JWT.
   */
  private generateToken(
    userId: number,
    email: string,
    expiresIn: string
  ): string {
    return jsonwebtoken.sign({ id: userId, email }, env.JWT_SECRET, {
      expiresIn,
    });
  }
}
