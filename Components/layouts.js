import Link from 'next/link';
import { useRouter } from 'next/router';
// import { AiOutlineDashboard } from 'react-icons/Ai';

export default function Layout({ children }) {
  const router = useRouter();

  const sideBar = [
    {
      href: '/dashboard',
      title: 'Dashboard',
      // icon: <AiOutlineDashboard />,
    },
    {
      href: '/about',
      title: 'About',
      // icon: <AiOutlineDashboard />,
    },
    {
      href: '/testing',
      title: 'testing',
      // icon: <AiOutlineDashboard />,
    },
  ];

  return (
    <div className='min-h-screen flex flex-col'>
      <header className='bg-amber-100 sticky top-0 h-14 flex justify-center items-center font-semibold uppercase border border-black'>
        Slice
      </header>
      <div className='flex flex-col md:flex-row flex-1'>
        <aside className='bg-amber-100 w-full md:w-60 p-3'>
          <nav>
            <ul>
              {sideBar.map(({ href, title }) => (
                <Link href={href} className='flex'>
                  <div
                    className='m-2 my-5 w-screen flex items-center border border-black duration-300 hover:scale-110 rounded-3xl'
                    key={title}
                  >
                    <p
                      className={`flex justify-self-start items-end p-2 cursor-pointer ${
                        router.asPath === href && 'text-black'
                      }`}
                    >
                      {title}
                    </p>
                    {/* <div className='mx-auto'>{icon}</div> */}
                  </div>
                </Link>
              ))}
            </ul>
          </nav>
        </aside>
        <main className='flex-1'>{children}</main>
      </div>
    </div>
  );
}
