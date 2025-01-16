import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen  text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">¡Ups!</h1>
        <p className="text-xl mb-8">
          Parece que algo salió mal o la página no existe.
        </p>
        <Link
          to="/"
          className="bg-secondary text-white px-6 py-2 rounded-md hover:bg-primary transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
