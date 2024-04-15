'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '../styles/navbar.scss';

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="navbar">
      {<Link href="/">Home</Link>}
      {<Link href="/movies">Movies</Link>}
      {<Link href="/stars">Stars</Link>}
      {<Link href="/signup">Signup</Link>}
      {<Link href="/login">Login</Link>}
    </nav>
  );
};

export default Navbar;
