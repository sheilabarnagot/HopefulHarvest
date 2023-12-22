import React from 'react';
import { Disclosure, Menu } from '@headlessui/react';
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useShoppingCartItems } from './zustand/customHooks';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '/', current: true },
  { name: 'Register', href: '/register', current: false },
  { name: 'Login', href: '/login', current: false },
  { name: 'Dashboard', href: '/dashboard', current: false },
  { name: 'Shop', href: '/shop', current: false },
];

function classNames(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const shoppingCartItems = useShoppingCartItems((state: any) => state.data);
  console.log(shoppingCartItems);

  return (
    <Disclosure as="nav" className="bg-gray-800 p-4 sticky top-0 w-full z-50">
      <Menu>
        {({ open }) => (
          <div className="max-w-screen-xl mx-auto">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>

              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map(item => (
                    <Menu.Item
                      key={item.name}
                      as={NavLink}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}>
                      {({ active }) => (
                        <span
                          className={classNames(
                            active
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}>
                          {item.name}
                        </span>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </div>
              <div onClick={() => navigate('/checkout')} className="flex">
                <ShoppingBagIcon height={30} color="white" />
                <p id="shopping-icon" className="text-red-400 text-lg">
                  {shoppingCartItems.length}
                </p>
              </div>

              <div className="sm:hidden">
                <Menu.Button className="text-white">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Menu.Button>
              </div>
            </div>
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                <Menu.Items>
                  {navigation.map(item => (
                    <Menu.Item key={item.name}>
                      {({ active, close }) => (
                        <NavLink
                          to={item.href}
                          onClick={close}
                          className={classNames(
                            active
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'block rounded-md px-3 py-2 text-base font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}>
                          {item.name}
                        </NavLink>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </div>
            </Disclosure.Panel>
          </div>
        )}
      </Menu>
    </Disclosure>
  );
};

export default Navbar;
