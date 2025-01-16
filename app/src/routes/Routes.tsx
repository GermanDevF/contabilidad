import { Blank } from '@/components';
import { ProtectedRoute } from '@/hooks';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { CogIcon, HomeIcon, UserIcon } from '@heroicons/react/24/outline';
import { DashboardLayout, MainLayout } from '@/layouts';
import {
  About,
  Dashboard,
  ErrorPage,
  Home,
  Login,
  Register,
  VerifyEmail,
} from '@/pages';

interface RouteConfig {
  path: string;
  element: ReactNode;
  index?: boolean;
  name?: string; // Nombre de la ruta
  icon?: ReactNode; // Opcional, para las rutas que incluyan íconos
  children?: RouteConfig[]; // Rutas anidadas
}

const routesConfig: RouteConfig[] = [
  {
    path: '',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Home />,
        index: true,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'verify-email',
        element: <VerifyEmail />,
      },
    ],
  },
  {
    path: 'about',
    element: <About />,
  },
  {
    path: 'login',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [{ path: '', element: <Login />, index: true }],
  },
  // Agrupamos 'dashboard' y 'users' bajo el mismo DashboardLayout
  {
    path: '',
    name: 'Dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        icon: <HomeIcon className="icon" />,
        name: 'Dashboard',
        element: <Dashboard />,
        index: true,
      },
      {
        path: 'users',
        icon: <UserIcon className="icon" />,
        name: 'Users',
        element: <Blank />,
      },
      {
        path: 'settings',
        icon: <CogIcon className="icon" />,
        name: 'Configuración',
        element: <Blank />,
      },
    ],
  },
  { path: 'not-found', element: <ErrorPage /> },
  { path: '*', element: <Navigate to="/not-found" /> },
];

export default routesConfig;
