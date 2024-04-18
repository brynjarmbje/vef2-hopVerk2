'use client';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import React from 'react';
import { RootState } from '@/store/types';
import '@/styles/navbar.scss';
import { useRouter } from 'next/navigation';

type UserData = {
  userId: number;
  username: string;
  name: string;
  profilePicture: string;
  isAdmin: boolean;
};

const Navbar = () => {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const dispatch = useDispatch();

  const isLoggedIn = Boolean(userData);
  console.log(userData, isLoggedIn);
  const router = useRouter();

  const handleLogout = () => {
    router.push('/logout');
  };

  return (
    <nav className="navbar">
      <Link href="/">Home</Link>
      <Link href="/movies">Movies</Link>
      <Link href="/stars">Stars</Link>
      {isLoggedIn ? (
        <>
          {userData?.isAdmin && <Link href="/admin">Admin</Link>}
          <button className="button-45" role="button" onClick={handleLogout}>
            Logout
          </button>
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
