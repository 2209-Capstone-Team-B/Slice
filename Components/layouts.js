import Link from 'next/link';
import { useRouter } from 'next/router';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { fetchEcosystems } from '../Store/ecosystems.js';
import { AiOutlineDashboard, AiOutlinePlus } from 'react-icons/Ai';
import { MdGroups } from 'react-icons/Md';
import Account from './account';
import ecosystem from '../pages/Ecosystem/[id]';

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const [user, loading] = useAuthState(auth);

  const router = useRouter();

  const { logout } = useAuth();

  const userEcosystems = useSelector((state) => state.ecosystems);

  useEffect(() => {
    const unsubscribe = dispatch(fetchEcosystems(user.uid));
    return () => {
      unsubscribe();
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
      href: '/about',
      title: 'About',
    },
  ];

  return (
    <div className='min-h-screen flex flex-col'>
      <header className='bg-amber-100 drop-shadow-md sticky top-0 h-14 flex justify-between items-center font-semibold uppercase border'>
        <div className='flex items-center pl-10'>
          <p>Slice Logo</p>
        </div>
        <h3 className='flex items-center'> </h3>
        <div className='flex pr-6 items-center'>
          <Account />
        </div>
      </header>
      <div className='flex flex-col md:flex-row flex-1'>
        <aside className='bg-amber-100 w-full md:w-60 p-3'>
          <nav>
            {dashboard()}
            <ul>
              {userEcosystems.map((eco, i) => (
                <Link
                  key={eco.id}
                  href={`/Ecosystem/${eco.id}`}
                  className='flex'
                >
                  <div className='m-2 my-3 w-screen flex items-center border border-black duration-300 hover:scale-110 rounded-3xl'>
                    <p className='flex justify-self-start items-end p-2 cursor-pointer w-10/12'>
                      {eco.orgName}
                    </p>
                    <MdGroups />
                  </div>
                </Link>
              ))}
              <div className='flex'>
                <div className='m-2 my-3 w-screen flex items-center border border-black duration-300 hover:scale-110 rounded-3xl'>
                  <p className='flex justify-self-start items-end p-2 cursor-pointer w-10/12'>
                    New Ecosystem
                  </p>
                  <AiOutlinePlus />
                </div>
              </div>
            </ul>
          </nav>
          <button
            onClick={handleLogout}
            className='duration-300 hover:scale-110 hover:font-bold flex mx-auto'
          >
            logout
          </button>
        </aside>
        <main className='flex-1'>{children}</main>
      </div>
    </div>
  );
}

//Dashboard link in the sidebar
function dashboard() {
  return (
    <Link key={'dashboard'} href={'/dashboard'} className='flex'>
      <div className='m-2 my-3 w-screen flex items-center border border-black duration-300 hover:scale-110 rounded-3xl'>
        <p className='flex justify-self-start items-end p-2 cursor-pointer w-10/12'>
          Dashboard
        </p>
        <AiOutlineDashboard />
      </div>
    </Link>
  );
}
