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
    const unsubscribeEcos = dispatch(
      fetchEcosystems(user?.uid || userObject.id)
    );
    const unsubscribeInvites = dispatch(
      fetchInvites(user?.uid || userObject.id)
    );
    const unsubscribeUser = dispatch(fetchUser(user?.uid || userObject.id));
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
      <header className='bg-amber-100 drop-shadow-md sticky top-0 h-14 flex justify-center items-center font-semibold uppercase border'>
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
        {show ? (
          <div className='flex'>
            <aside

              className='bg-amber-100 w-full md:w-60 p-3 inset-0 z-10'
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
                    {userEcosystems
                      .sort((a, b) => a.orgName.localeCompare(b.orgName))
                      .map((eco, i) => (
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
                      <div className='bg-amber-100 m-2 my-3 w-screen flex justify-start items-center border border-black duration-300 hover:scale-110 rounded-3xl'>
                        <AddEcosystem id={user.uid} user={userObject} />
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
              className='text-black p-3 mt-.5 w-1/4 bg-amber-200 bg-opacity-40 duration-300 transition duration-150 ease-in-out hover:scale-110 hover:shadow-lg h-14'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseWidth'
              aria-expanded='false'
              aria-controls='collapseWidth'
              onClick={toggle}
            >
              {'<'}
            </button>
          </div>
        ) : (
          <nav>
            <button
              className='text-black p-8 mt-.5 w-1/4 bg-amber-200 bg-opacity-40 duration-600 transition duration-150 ease-in-out hover:scale-110 hover:shadow-lg h-14 flex items-center'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseWidth'
              aria-expanded='false'
              aria-controls='collapseWidth'
              onClick={toggle}
            >
              <ArrowDropDownIcon />
            </button>
          </nav>
        )}

        <main className='flex-1'>{children}</main>
      </div>
    </div>
  );
}

//Dashboard link in the sidebar
function dashboard() {
  return (
    <Link key={'dashboard'} href={'/dashboard'} className='flex'>
      <div className='bg-amber-100 m-2 my-3 w-screen flex items-center border border-black duration-600 hover:scale-110 rounded-3xl'>
        <p className='flex justify-self-start items-end p-2 pl-3 cursor-pointer w-10/12'>
          Dashboard
        </p>
        <AiOutlineDashboard />
      </div>
    </Link>
  );
}
