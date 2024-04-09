import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <Link href="/">
        Home
      </Link>
      <Link href="/movies">
        Movies
      </Link>
      <Link href="/signup">
        Signup
      </Link>
      <Link href="/login">
        Login
      </Link>
      {/* Add more links as needed */}
    </nav>
  );
};

export default Navbar;