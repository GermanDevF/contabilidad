import Navbar from '@/components/ui/Navbar'; // Importamos la barra de navegación
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow px-4 md:px-8 md:min-h-[85vh] min-h-[75vh]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
