import { BrowserRouter, useRoutes } from 'react-router-dom';
import routesConfig from './Routes';
import { RouteObject } from 'react-router-dom';

const Routes = () => {
  const routeElements = useRoutes(routesConfig as RouteObject[]);
  return routeElements;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default AppRoutes;
