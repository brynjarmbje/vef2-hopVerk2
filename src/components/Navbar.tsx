import Link from 'next/link';
import '../styles/navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/">Home</Link>
      <Link href="/movies">Movies</Link>
      <Link href="/signup">Signup</Link>
      <Link href="/login">Login</Link>
    </nav>
  );
};

export default Navbar;
