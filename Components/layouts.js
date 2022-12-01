// import { AiOutlineDashboard } from 'react-icons/Ai';
//
import Link from 'next/link';
import { useRouter } from 'next/router';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
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

  return (
    <div className='min-h-screen flex flex-col'>
      <header className='bg-amber-100 sticky flex justify-between top-0 h-14 font-semibold uppercase border border-b-black'>
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
            <ul>
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
