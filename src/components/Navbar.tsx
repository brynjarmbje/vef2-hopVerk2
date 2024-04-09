import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/movies">Movies</Link>
      <Link href="/signup">Signup</Link>
      <Link href="/login">Login</Link>
    </nav>
  );
};

export default Navbar;
