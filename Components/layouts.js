import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function Layout({ children }) {
  const router = useRouter();

  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.log(`Help I can't get out!`);
    }
  };

  const sideBar = [
    {
      href: "/dashboard",
      title: "Dashboard",
    },
    {
      href: "/about",
      title: "About",
    },
    {
      href: "/testing",
      title: "testing",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-purple-200 sticky top-0 h-14 flex justify-center items-center font-semibold uppercase">
        Slice
      </header>
      <button onClick={handleLogout}>Logout</button>
      <div className="flex flex-col md:flex-row flex-1">
        <aside className="bg-fuchsia-100 w-full md:w-60">
          <nav>
            <ul>
              {sideBar.map(({ href, title }) => (
                <li className="m-2" key={title}>
                  <Link href={href}>
                    <p
                      className={`flex p-2 bg-fuchsia-200 rounded hover:bg-fuchsia-400 cursor-pointer ${
                        router.asPath === href && "bg-fuchsia-600 text-white"
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
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
