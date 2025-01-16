import { toast } from 'react-toastify';

const showNotification = (
  message: string,
  type: 'success' | 'error' | 'info' | 'warning',
) => {
  toast.dismiss(); // Cierra todos los toasts activos
  if (!message) return;
  if (!type || !type) {
    toast(message);
  }
  toast[type](message);
};

export default showNotification;
