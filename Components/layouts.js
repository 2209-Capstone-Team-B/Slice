import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();

  const sideBar = [
    {
      href: '/dashboard',
      title: 'Dashboard',
    },
    {
      href: '/about',
      title: 'About',
    },
    {
      href: '/testing',
      title: 'testing',
    },
  ];

  return (
    <div className='min-h-screen flex flex-col'>
      <header className='bg-purple-200 sticky top-0 h-14 flex justify-center items-center font-semibold uppercase'>
        Slice
      </header>
      <div className='flex flex-col md:flex-row flex-1'>
        <aside className='bg-amber-100 w-full md:w-60'>
          <nav>
            <ul>
              {sideBar.map(({ href, title }) => (
                <li className='m-2' key={title}>
                  <Link href={href}>
                    <p
                      className={`flex p-2 duration-300 hover:font-bold cursor-pointer ${
                        router.asPath === href && 'bg-amber-400 text-black'
                      }`}
                    >
                      {title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className='flex-1'>{children}</main>
      </div>
    </div>
  );
}
