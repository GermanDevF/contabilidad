import axios, { AxiosResponse } from 'axios';
import { RESPONSE_CODES_MAP } from './constants';
import store from '@/store/store';
import { showNotification } from '@/components';

// Crear instancia de Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Agregar interceptor de peticiones
axiosInstance.interceptors.request.use(
  (config) => {
    // Excluir el endpoint de login
    if (!config.url?.includes('/login')) {
      const state = store.getState();
      const { token } = state.auth;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    // Manejar errores antes de que lleguen al cliente
    return Promise.reject(error);
  },
);

interface CustomResponse extends AxiosResponse {
  success: boolean;
  message: string;
  details?: string[];
}

// Funciones para manejar errores por código de estado
const errorHandlers: Record<number, (response: CustomResponse) => void> = {
  [RESPONSE_CODES_MAP.UNAUTHORIZED]: () => {
    showNotification('Sesión expirada. Redirigiendo al login...', 'error');
    localStorage.removeItem('token');
    window.location.href = '/login';
  },
  [RESPONSE_CODES_MAP.FORBIDDEN]: (res) => {
    const { message } = res.data;
    const defaultMessage =
      'Acceso denegado. No tienes permiso para acceder a este recurso.';
    showNotification(message || defaultMessage, 'error');
  },
  [RESPONSE_CODES_MAP.NOT_FOUND]: (res) => {
    const { message } = res.data;
    const defaultMessage = 'Recurso no encontrado. Verifica la URL.';

    showNotification(message || defaultMessage, 'warning');
  },
  [RESPONSE_CODES_MAP.INTERNAL_SERVER_ERROR]: (res) => {
    const { message } = res.data;
    const defaultMessage =
      'Error en el servidor. Por favor, intenta más tarde.';

    showNotification(message || defaultMessage, 'error');
  },
  [RESPONSE_CODES_MAP.BAD_REQUEST]: (res) => {
    const { message } = res.data;
    const defaultMessage = 'Petición incorrecta. Verifica los datos enviados.';
    showNotification(message || defaultMessage, 'error');
  },
};

const fallbackErrorHandler = () => {
  showNotification('Ocurrió un error inesperado. Intenta de nuevo.', 'error');
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      const handleError = errorHandlers[status] || fallbackErrorHandler;

      handleError(error.response);
    } else if (error.request) {
      showNotification(
        'No se pudo conectar al servidor. Verifica tu conexión.',
        'error',
      );
    } else {
      showNotification(
        'Ocurrió un error inesperado. Intenta de nuevo.',
        'error',
      );
    }

    return Promise.reject(error);
  },
);

// Exportar la instancia configurada
export default axiosInstance;
