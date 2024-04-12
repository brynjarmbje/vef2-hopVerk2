'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '../styles/navbar.scss';

const Navbar = () => {
  const pathname = usePathname();
  const userData = localStorage.getItem('userData'); // Retrieves user data from localStorage
  const isLoggedIn = Boolean(userData); // Checks if userData is not null or undefined

  return (
    <nav className="navbar">
      {pathname !== '/' && <Link href="/">Home</Link>}
      {pathname !== '/movies' && <Link href="/movies">Movies</Link>}
      {isLoggedIn ? (
        pathname !== '/logout' && <Link href="/logout">Logout</Link>
      ) : (
        <>
          {pathname !== '/signup' && <Link href="/signup">Signup</Link>}
          {pathname !== '/login' && <Link href="/login">Login</Link>}
        </>
      )}
    </nav>
  );
};

export default Navbar;
