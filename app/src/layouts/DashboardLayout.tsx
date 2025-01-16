import { Outlet } from 'react-router-dom';
import Navbar from '@/components/ui/Navbar';
import Sidebar from '@/components/ui/Sidebar';
import { useSelector } from 'react-redux';
import { selectCollapsedMenu } from '@/store/slices';

const DashboardLayout = () => {
  const isMenuCollapsed = useSelector(selectCollapsedMenu);

  return (
    <div className="flex h-screen bg-gray-100 overflow-x-hidden">
      <aside
        className={` bg-white shadow-md ${isMenuCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 hidden md:block`}
      >
        <Sidebar />
      </aside>
      <div className="flex flex-col flex-1">
        <header>
          <Navbar />
        </header>

        <main className="flex h-fit md:h-full bg-gray-100 overflow-x-hidden overflow-auto p-6 w-full mb-[4.8rem] md:mb-0">
          <div className="flex flex-wrap h-fit lg:h-full w-full bg-white rounded-md shadow-md p-4">
            <Outlet />
          </div>
        </main>
        <div className="md:hidden">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
