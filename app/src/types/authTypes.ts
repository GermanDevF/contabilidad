import { loginSchema, registerSchema } from '@/models';
import { z } from 'zod';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  autehnticated: boolean;
}

export type LoginFormValues = z.infer<typeof loginSchema>;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  refreshToken: string;
}

export type RegisterFormValues = z.infer<typeof registerSchema>;

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}
