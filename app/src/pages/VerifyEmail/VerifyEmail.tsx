import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyEmailApi } from '@/api';
import { showNotification, Spinner } from '@/components/ui';

const VerifyEmail = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  );
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      if (!token) {
        showNotification('Token no válido o ausente', 'error');
        setStatus('error');
        return;
      }

      try {
        const response = await verifyEmailApi(token);
        if (response.success) {
          showNotification(response.message, 'success');
          setStatus('success');
          setTimeout(() => navigate('/login'), 3000); // Redirige después de 3 segundos
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error(error);
        setStatus('error');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {status === 'loading' && (
        <>
          <Spinner />
          <p>Verificando tu correo electrónico...</p>
        </>
      )}
      {status === 'success' && (
        <p className="text-green-600">
          ¡Correo verificado exitosamente! Redirigiendo...
        </p>
      )}
      {status === 'error' && (
        <p className="text-red-600">
          Hubo un error al verificar tu correo. Por favor, intenta de nuevo.
        </p>
      )}
    </div>
  );
};

export default VerifyEmail;
