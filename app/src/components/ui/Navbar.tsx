import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components';
import { useState } from 'react';
import { Route } from '@/types';
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/store';
import Avatar from './Avatar';
import { toggleCollapsedMenu } from '@/store/slices';

const Navbar = () => {
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleToggle = () => {
    dispatch(toggleCollapsedMenu());
  };

  const handleSignUp = () => {
    navigate('/register'); // Redirige a la ruta de "Crear cuenta"
  };

  const handleLogIn = () => {
    navigate('/login'); // Redirige a la ruta de "Iniciar sesión"
  };

  const routes: Route[] = [
    {
      label: 'Home',
      path: '/',
      type: 'link',
    },
    {
      label: 'Sobre mi',
      path: '/about',
      type: 'link',
    },
    {
      label: 'Crear cuenta',
      type: 'button',
      variant: 'primary',
      onClick: handleSignUp, // Llamamos a la función handleSignUp para redirigir
    },
    {
      label: 'Iniciar sesión',
      type: 'button',
      variant: 'secondary',
      onClick: handleLogIn, // Llamamos a la función handleLogIn para redirigir
    },
  ];

  return (
    <nav className="bg-primary text-white p-4 shadow-md">
      <div className="w-full flex justify-between items-center">
        <Bars3BottomLeftIcon
          className="w-6 h-6 hidden md:block"
          onClick={handleToggle}
        />
        <Link
          to="/"
          className="text-2xl font-sans font-bold hover:text-gray-200"
        >
          MyApp
        </Link>
        {/* Menu para pantallas grandes */}
        {!isAuthenticated && (
          <div className="hidden md:flex space-x-4">
            {routes.map((route, index) => {
              if (route.type === 'link' && route.path) {
                return (
                  <li key={index} className="list-none content-center">
                    <Link
                      to={route.path}
                      className="text-lg hover:text-gray-200"
                    >
                      {route.label}
                    </Link>
                  </li>
                );
              } else if (route.type === 'button' && route.onClick) {
                return (
                  <li key={index} className="list-none">
                    <Button onClick={route.onClick} variant={route.variant}>
                      {route.label}
                    </Button>
                  </li>
                );
              }
            })}
          </div>
        )}
        {isAuthenticated && <Avatar />}
        {/* Botón de menú móvil */}
        {!isAuthenticated && (
          <Button
            className="md:hidden text-white w-8 h-10 justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Bars3BottomLeftIcon className="w-6 h-6" />
          </Button>
        )}
        {/* Menú móvil */}
        {isMobileMenuOpen && !isAuthenticated && (
          <div className="md:hidden absolute bg-primary w-full left-0 top-16 p-4">
            {routes.map((route, index) => {
              if (route.type === 'link' && route.path) {
                return (
                  <li key={index} className="list-none">
                    <Link
                      to={route.path}
                      className="block text-lg text-white hover:text-gray-200"
                    >
                      {route.label}
                    </Link>
                  </li>
                );
              } else if (route.type === 'button' && route.onClick) {
                return (
                  <li key={index} className="list-none">
                    <Button onClick={route.onClick}>{route.label}</Button>
                  </li>
                );
              }
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
