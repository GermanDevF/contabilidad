import { NavLink } from 'react-router-dom';
import { selectCollapsedMenu } from '@/store/slices';
import { useSelector } from 'react-redux';
import { Routes } from '@/routes';

const Sidebar = () => {
  const isMenuCollapsed = useSelector(selectCollapsedMenu);

  const menuItems = Routes[3].children || [];

  return (
    <>
      <nav
        className={`h-full ${isMenuCollapsed ? 'p-2' : 'p-4'} hidden md:block`}
      >
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 p-2 rounded-md hover:bg-violet-100 ${
                    isActive ? 'bg-violet-200 font-medium' : ''
                  }`
                }
              >
                <span
                  className={`${isMenuCollapsed ? 'flex justify-center w-full' : ''} "transition-all duration-400 "`}
                >
                  {item.icon}
                </span>
                <span
                  className={`${isMenuCollapsed ? 'hidden' : 'block'} transition-all duration-300`}
                >
                  {item.name}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <footer className="md:hidden fixed bottom-0 w-full">
        <nav
          className={`fixed h-[4.8rem] bottom-0 w-full md:hidden bg-white shadow-md z-10 `}
        >
          <ul className="flex justify-around p-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex flex-col items-center justify-center p-2 rounded-md hover:bg-violet-100 ${
                      isActive ? 'bg-violet-200 font-medium' : ''
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </footer>
    </>
  );
};

export default Sidebar;
