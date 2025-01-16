import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/store';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Obtenemos el estado de autenticación desde Redux
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  // Si el usuario no está autenticado, redirigimos a la
  // página de inicio de sesión
  if (!isAuthenticated && location.pathname !== '/login') {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('redirect', location.pathname);
    const search = searchParams.toString();
    return <Navigate to={`/login?${search}`} />;
  }

  // Si el usuario está autenticado, pero esta en el login
  // lo redirigimos al dashboard
  if (isAuthenticated && location.pathname === '/login') {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;
