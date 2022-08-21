/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useContext, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
  XIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Store } from '../../utils/Store';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/router';

const navigation = [{ name: 'Home', href: '/', current: true }];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Navbar() {
  const { status, data: session } = useSession();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  return (
    <Disclosure as='nav' className='bg-gray-800'>
      {({ open }) => (
        <>
          <div className='max-w-full mx-auto px-2 sm:px-6 lg:px-10'>
            <div className='relative flex items-center justify-between h-16'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='mt-2  items-center flex-grow sm:flex-grow-0 hidden md:block'>
                  <Image
                    onClick={() => router.push('/')}
                    src='https://links.papareact.com/f90'
                    width={150}
                    height={40}
                    alt='img'
                    objectFit='contain'
                    className='cursor-pointer'
                  />
                </div>

                <div className='hidden sm:block sm:ml-6'>
                  <div className='flex space-x-4'>
                    {navigation.map((item) => (
                      <Link href={item.href} key={item.href} passHref>
                        <a
                          className={
                            'text-gray-100  hover:text-white font-bold  px-3 py-2 rounded-md '
                          }
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className='hidden sm:flex  items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500'>
                  <input
                    placeholder='search'
                    className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4'
                    type='text'
                  />
                  <SearchIcon className='h-12 p-4' />
                </div>
              </div>
              <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
                <div
                  onClick={() => router.push('/cart')}
                  className='relative link flex items-center'
                >
                  <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold'>
                    {cartItemsCount}
                  </span>

                  <ShoppingCartIcon className='h-10' />
                  <p className='hidden md:inline font-extrabold md:text-sm mt-2'>
                    Basket
                  </p>
                </div>

                {/* Profile dropdown */}
                {status === 'loading' ? (
                  'loading'
                ) : session?.user ? (
                  <Menu as='div' className='ml-3 relative'>
                    <div>
                      <Menu.Button className='bg-gray-800  text-white font-bold flex text-lg rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                        <span className='sr-only'>Open user menu</span>
                        {session.user.name}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className=' z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                          {({ active }) => (
                            <Link href='/profile' passHref>
                              <a
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Your Profile
                              </a>
                            </Link>
                          )}
                        </Menu.Item>
                        {session.user.isAdmin && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link href='/admin/dashboard' passHref>
                                <a
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Admin Dashboard
                                </a>
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                        <Menu.Item>
                          {({ active }) => (
                            <Link href='/order-history' passHref>
                              <a
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Order History
                              </a>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={logoutClickHandler}
                              href='#'
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Link href='/login' passHref>
                    <a className=' md:text-sm mt-2 text-white hover:bg-amber-300 font-bold duration-200  px-3 py-2 rounded-md '>
                      Login
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className=' items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm hidden md:flex'>
            <p className='link flex items-center'>
              <MenuIcon className='h-6 mr-1' />
              All
            </p>
            <p className='link'>Prime Video</p>
            <p className='link'>Amazon Business</p>
            <p className='link'>Today Deals</p>
            <p className='link hidden lg:inline-flex'>Electronics</p>
            <p className='link hidden lg:inline-flex'>Food & Grocery</p>
            <p className='link hidden lg:inline-flex'>Prime</p>
            <p className='link hidden lg:inline-flex'>Buy Again</p>
            <p className='link hidden lg:inline-flex'>Shopper Toolkit</p>
            <p className='link hidden lg:inline-flex'>Health & Personal Care</p>
          </div>
          <Disclosure.Panel className='sm:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as='a'
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;
