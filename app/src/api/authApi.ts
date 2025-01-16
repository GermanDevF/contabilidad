import API from './axiosInstance';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/types';

export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await API.post<LoginResponse>('/auth/login', data);
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Error al iniciar sesión',
      token: '',
      refreshToken: '',
    };
  }
};

export const getUserData = async () => {
  const response = await API.get('/auth/user');
  return response.data;
};

export const registerApi = async (
  data: RegisterRequest,
): Promise<RegisterResponse> => {
  try {
    const response = await API.post('/auth/signup', data);
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Error al registrar el usuario',
    };
  }
};

export const verifyEmailApi = async (token: string) => {
  try {
    const response = await API.post(`/auth/verify-email/`, { token });
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Error al verificar el correo electrónico',
    };
  }
};
