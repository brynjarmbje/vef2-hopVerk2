'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import '@/styles/navbar.scss';

type UserData = {
  userId: Number;
  username: String;
  name: String;
  profilePicture: String;
  isAdmin: Boolean;
};

const Navbar = () => {
  const pathname = usePathname();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const userDataString = localStorage.getItem('userData'); // Now inside useEffect, it runs client-side
    if (userDataString) {
      setUserData(JSON.parse(userDataString));
    }
  }, []); // The empty array ensures this runs once on component mount

  const isLoggedIn = Boolean(userData); // Checks if userData is not null or undefined

  return (
    <nav className="navbar">
      <Link href="/">Home</Link>
      <Link href="/movies">Movies</Link>
      <Link href="/stars">Stars</Link>
      {isLoggedIn ? (
        <>
          <Link href="/logout">Logout</Link>
          {userData?.isAdmin && <Link href="/admin">Admin</Link>}
        </>
      ) : (
        <>
          <Link href="/signup">Signup</Link>
          <Link href="/login">Login</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
