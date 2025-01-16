import { Link } from 'react-router-dom';

const AboutButton = () => {
  return (
    <Link
      to="/about"
      className="bg-secondary text-white px-6 py-2 rounded-md hover:bg-primary-light transition-colors"
    >
      Saber más
    </Link>
  );
};

export default AboutButton;
