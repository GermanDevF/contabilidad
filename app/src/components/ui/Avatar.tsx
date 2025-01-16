import { clearAuth, selectUser } from '@/store';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Button,
} from '@headlessui/react';
import {
  ChevronDownIcon,
  UserCircleIcon,
  PowerIcon,
} from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Avatar = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(clearAuth());
    navigation('/login');
  };

  return (
    <div>
      <Menu>
        <MenuButton className="flex items-center gap-2 rounded-full bg-violet-950 py-2 px-4 shadow-md transition hover:bg-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500">
          <UserCircleIcon className="h-8 w-8 text-white hover:text-violet-300" />
          <span className="text-white">{user?.name}</span>
          <span className="text-white hidden md:block">{user?.email}</span>
          <ChevronDownIcon className="h-4 w-4 text-white" />
        </MenuButton>

        <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black/10 focus:outline-none">
          {/* <div className="p-2">
            <MenuItem>
              {({ active }) => (
                <Button
                  className={`group flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                    active ? 'bg-violet-500 text-white' : 'text-gray-700'
                  }`}
                >
                  <PencilIcon className="h-5 w-5 text-gray-400 group-hover:text-white" />
                  Editar
                </Button>
              )}
            </MenuItem>
          </div> */}
          <div className="p-2">
            <MenuItem>
              <Button
                onClick={handleLogout}
                className="group flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white bg-red-500 hover-group:"
              >
                <PowerIcon className="h-5 w-5 text-white" />
                Cerrar sesión
              </Button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default Avatar;
