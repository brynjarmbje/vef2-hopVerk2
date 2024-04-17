'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '../styles/navbar.scss';

type UserData = {
  userId: Number;
  username: String;
  name: String;
  profilePicture: String;
  isAdmin: Boolean;
};

const Navbar = () => {
  const pathname = usePathname();
  const userDataString = localStorage.getItem('userData'); // Retrieves user data from localStorage

  let userData: UserData | null = null;

  if (userDataString) {
    userData = JSON.parse(userDataString);
  }

  const isLoggedIn = Boolean(userData); // Checks if userData is not null or undefined

  return (
    <nav className="navbar">
      {<Link href="/">Home</Link>}
      {<Link href="/movies">Movies</Link>}
      {<Link href="/stars">Stars</Link>}
      {isLoggedIn ? (
        <>
          {<Link href="/logout">Logout</Link>}
          {userData?.isAdmin && <Link href="/admin">Admin</Link>}
        </>
      ) : (
        <>
          {<Link href="/signup">Signup</Link>}
          {<Link href="/login">Login</Link>}
        </>
      )}
    </nav>
  );
};

export default Navbar;
