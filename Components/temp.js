// import { AiOutlineDashboard } from 'react-icons/Ai';
//
import Link from 'next/link';
import { useRouter } from 'next/router';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { fetchEcosystems } from '../Store/ecosystems.js';
import { AiOutlineDashboard } from 'react-icons/Ai';
import { MdGroups } from 'react-icons/Md';
import Account from './account';

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const [user, loading] = useAuthState(auth);

  const router = useRouter();

  const { logout } = useAuth();

  const userEcosystems = useSelector((state) => state.ecosystems);

  const [show, setShow] = useState(false);
  function toggle() {
    setShow(!show);
  }

  useEffect(() => {
    const unsubscribe = dispatch(fetchEcosystems(user.uid));
    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.log(`Help I can't get out!`);
    }
  };

  const sideBar = [
    {
      href: '/dashboard',
      title: 'Dashboard',
    },
    {
      href: '/about',
      title: 'About',
    },
  ];
  //test
  return (
    <>
      <div className='min-h-screen flex flex-col'>
        <header className='bg-slate-100 sticky flex justify-between top-0 h-14 font-semibold uppercase border border-b-black'>
          <div className='flex items-center pl-10'>
            <p>Slice Logo</p>
          </div>
          <h3 className='flex items-center'> </h3>
          <div className='flex pr-6 items-center'>
            <Account />
          </div>
        </header>
        <div className='flex flex-col md:flex-row flex-1'>
          {!show ? (
            <aside className='bg-slate-100 w-full md:w-60 p-3'>
              <nav>
                <button
                  className='text-black border border-black p-3 w-1/4 rounded-3xl bg-slate-100'
                  onClick={toggle}
                >
                  {'<'}
                </button>
                <ul className=''>
                  {sideBar.map(({ href, title }, i) => (
                    <Link key={i} href={href} className='flex'>
                      <div className='m-2 my-3 w-screen flex items-center border border-black duration-300 hover:scale-110 rounded-3xl'>
                        <p
                          className={`flex justify-self-start items-end p-2 cursor-pointer w-10/12 ${
                            router.asPath === href && 'text-black'
                          }`}
                        >
                          {title}
                        </p>
                        {title === 'Dashboard' ? (
                          <AiOutlineDashboard />
                        ) : (
                          <MdGroups />
                        )}
                      </div>
                    </Link>
                  ))}
                  {userEcosystems.map((eco, index) => (
                    <div
                      className='m-2 my-5 w-screen flex items-center border border-black duration-300 hover:scale-110 rounded-3xl'
                      key={index}
                    >
                      <p
                        className={`flex justify-self-start items-end p-2 cursor-pointer`}
                      >
                        {eco.orgName}
                      </p>
                      {/* <div className='mx-auto'>{icon}</div> */}
                    </div>
                  ))}
                </ul>
              </nav>
            </aside>
          ) : (
            <aside className=''>
              <nav>
                <button
                  classname='text-black border border-black p-3 w-1/4 rounded-3xl bg-slate-100'
                  onClick={toggle}
                >
                  {'>'}
                </button>
              </nav>
            </aside>
          )}

          <main className='flex-1'>{children}</main>
        </div>
      </div>
    </>
  );
}

import { forwardRef } from 'react';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const MyLink = forwardRef((props, ref) => {
  let { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <p>{children}</p>
    </Link>
  );
});

export default function Account({ children }) {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.log(`Help I can't get out!`);
    }
  };
  return (
    <Menu>
      <Menu.Button className='flex w-full justify-center items-center h-2/4 rounded-md bg-slate-300 px-4 py-4 text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
        Account
        <ChevronDownIcon
          className='ml-2 -mr-1 h-5 w-5 text-black hover:text-slate-300'
          aria-hidden='true'
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-3 top-1 mt-10 w-40 origin-bottom-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='px-1 py-1 mt-3 flex-col justify-between items-center'>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href='/profile'
                  className={`${
                    active ? 'bg-slate-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <ProfileActiveIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  ) : (
                    <ProfileInactiveIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  )}
                  Account Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href='/edit'
                  className={`${
                    active ? 'bg-slate-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <EditActiveIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  ) : (
                    <EditInactiveIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  )}
                  Edit Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`${
                    active ? 'bg-slate-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <LogoutActiveIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  ) : (
                    <LogoutInactiveIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  )}
                  Log Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 13V16H7L16 7L13 4L4 13Z'
        fill='#EDE9FE'
        stroke='#A78BFA'
        strokeWidth='2'
      />
    </svg>
  );
}

function EditActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='#FFC107'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 13V16H7L16 7L13 4L4 13Z'
        fill='#FFC107'
        stroke='#C4B5FD'
        strokeWidth='2'
      />
    </svg>
  );
}

function LogoutInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 4H12V12H4V4Z'
        fill='#EDE9FE'
        stroke='#A78BFA'
        strokeWidth='2'
      />
      <path
        d='M8 8H16V16H8V8Z'
        fill='#EDE9FE'
        stroke='#A78BFA'
        strokeWidth='2'
      />
    </svg>
  );
}

function LogoutActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 4H12V12H4V4Z'
        fill='#FFC107'
        stroke='#C4B5FD'
        strokeWidth='2'
      />
      <path
        d='M8 8H16V16H8V8Z'
        fill='#FFC107'
        stroke='#C4B5FD'
        strokeWidth='2'
      />
    </svg>
  );
}

function ProfileInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='5'
        y='8'
        width='10'
        height='8'
        fill='#EDE9FE'
        stroke='#A78BFA'
        strokeWidth='2'
      />
      <rect
        x='4'
        y='4'
        width='12'
        height='4'
        fill='#EDE9FE'
        stroke='#A78BFA'
        strokeWidth='2'
      />
      <path d='M8 12H12' stroke='#A78BFA' strokeWidth='2' />
    </svg>
  );
}

function ProfileActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='5'
        y='8'
        width='10'
        height='8'
        fill='#FFC107'
        stroke='#C4B5FD'
        strokeWidth='2'
      />
      <rect
        x='4'
        y='4'
        width='12'
        height='4'
        fill='#FFC107'
        stroke='#C4B5FD'
        strokeWidth='2'
      />
      <path d='M8 12H12' stroke='#A78BFA' strokeWidth='2' />
    </svg>
  );
}

//ANIMATION

import Link from 'next/link';
import { useRouter } from 'next/router';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { fetchEcosystems, fetchInvites, fetchUser } from '../Store';
import { AiOutlineDashboard, AiOutlinePlus } from 'react-icons/ai';
import { MdGroups } from 'react-icons/md';
import Account from './account';
import ecosystem from '../pages/Ecosystem/[id]';
import AddEcosystem from './AddEcosystem';
import SeeInvites from './SeeInvites.js';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function Layout({ children }) {
  const [showEcos, setShowEcos] = useState(true);
  const dispatch = useDispatch();
  const [user, loading] = useAuthState(auth);

  const router = useRouter();

  const { logout } = useAuth();

  const userEcosystems = useSelector((state) => state.ecosystems);
  const userInvites = useSelector((state) => state.userInvites);
  const userObject = useSelector((state) => state.loggedInUser);

  useEffect(() => {
    const unsubscribeEcos = dispatch(fetchEcosystems(user.uid));
    const unsubscribeInvites = dispatch(fetchInvites(user.uid));
    const unsubscribeUser = dispatch(fetchUser(user.uid));
    return () => {
      unsubscribeEcos();
      unsubscribeInvites();
      unsubscribeUser();
    };
  }, []);

  const handleLogout = async () => {
    try {
      router.push('/');
      await logout();
    } catch (error) {
      console.log(`Help I can't get out!`);
    }
  };

  const sideBar = [
    {
      href: '/dashboard',
      title: 'Dashboard',
    },
    {
      href: '/about',
      title: 'About',
    },
  ];
  //test
  const showEcosystems = () => {
    setShowEcos(!showEcos);
  };

  const [show, setShow] = useState(false);
  function toggle() {
    setShow(!show);
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <header className='bg-slate-100 drop-shadow-md sticky top-0 h-14 flex justify-center items-center font-semibold uppercase border'>
        <div className='flex items-center pl-10'>
          <Link href='/'>
            <p>Slice Logo</p>
          </Link>
        </div>
        <h3 className='flex items-center'> </h3>
        <div className='flex pr-6 items-center absolute right-0'>
          <Account />
        </div>
      </header>
      <div className='flex flex-col md:flex-row flex-1'>
        <div className='flex'>
          <aside
            className='bg-slate-100 w-full md:w-60 p-3 collapse collapse-horizontal'
            id='collapseWidth'
          >
            <nav>
              {dashboard()}
              <h1
                className='text-center duration-300 hover:scale-110 hover:font-bold cursor-pointer'
                onClick={showEcosystems}
              >
                {showEcos ? (
                  <ArrowDropDownIcon onClick={showEcosystems} />
                ) : (
                  <ArrowRightIcon onClick={showEcosystems} />
                )}
                Ecosystems
              </h1>
              {showEcos && (
                <ul>
                  {userEcosystems.map((eco, i) => (
                    <Link
                      key={eco.id}
                      href={`/Ecosystem/${eco.id}`}
                      className='flex'
                    >
                      <div className='m-2 my-3 w-screen flex items-center border border-black duration-300 hover:scale-110 rounded-3xl'>
                        <p className='flex justify-self-start items-end p-2 pl-3 cursor-pointer w-10/12'>
                          {eco.orgName}
                        </p>
                        <MdGroups />
                      </div>
                    </Link>
                  ))}
                  <div className='flex'>
                    <div className='bg-slate-100 m-2 my-3 w-screen flex justify-start items-center border border-black duration-300 hover:scale-110 rounded-3xl'>
                      <AddEcosystem id={user.uid} />
                    </div>
                  </div>
                </ul>
              )}
            </nav>
            {/* <button
            onClick={handleLogout}
            className='duration-300 hover:scale-110 hover:font-bold flex mx-auto'
          >
            logout
          </button> */}
            <SeeInvites />
          </aside>
          <button
            className='text-black p-3 mt-.5 w-1/4 bg-slate-200 bg-opacity-40 duration-300 transition duration-150 ease-in-out hover:scale-110 hover:shadow-lg h-14'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapseWidth'
            aria-expanded='false'
            aria-controls='collapseWidth'
            onClick={toggle}
          >
            {show ? '<' : <ArrowDropDownIcon onClick={showEcosystems} />}
          </button>
        </div>
        <main className='flex-1'>{children}</main>
      </div>
    </div>
  );
}

//Dashboard link in the sidebar
function dashboard() {
  return (
    <Link key={'dashboard'} href={'/dashboard'} className='flex'>
      <div className='bg-slate-100 m-2 my-3 w-screen flex items-center border border-black duration-600 hover:scale-110 rounded-3xl'>
        <p className='flex justify-self-start items-end p-2 pl-3 cursor-pointer w-10/12'>
          Dashboard
        </p>
        <AiOutlineDashboard />
      </div>
    </Link>
  );
}
