import Link from 'next/link';
import { useRouter } from 'next/router';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { AiOutlineDashboard } from 'react-icons/Ai';
import { MdGroups } from 'react-icons/Md';

export default function Layout({ children }) {
  const router = useRouter();

  const { logout } = useAuth();

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
      <header className='bg-amber-100 sticky top-0 h-14 flex justify-center items-center font-semibold uppercase border border-b-black'>
        Slice
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
