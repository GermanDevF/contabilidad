import { Link } from 'react-router-dom';

const HomeSignUpButton = () => {
  return (
    <Link
      to="/register"
      className="bg-white text-primary px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
    >
      Crear cuenta
    </Link>
  );
};

export default HomeSignUpButton;
