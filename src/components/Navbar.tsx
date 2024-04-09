'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '../styles/navbar.scss';

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="navbar">
      {pathname !== '/' && <Link href="/">Home</Link>}
      {pathname !== '/movies' && <Link href="/movies">Movies</Link>}
      {pathname !== '/signup' && <Link href="/signup">Signup</Link>}
      {pathname !== '/login' && <Link href="/login">Login</Link>}
    </nav>
  );
};

export default Navbar;
