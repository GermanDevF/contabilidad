import { useLocation } from 'react-router-dom';

const Blank = () => {
  const location = useLocation();
  return <div>{location.pathname}</div>;
};

Blank.displayName = 'Blank';

export default Blank;
