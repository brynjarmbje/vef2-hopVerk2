'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import React from 'react';

import Navbar from '@/components/Navbar';
import { Providers } from '@/components/Providers';

interface UserData {
  userId: number;
  username: string;
  name: string;
  profilePicture: string | null;
  isAdmin: boolean;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const userDataString = localStorage.getItem('userData'); // Retrieve user data string from localStorage
    if (userDataString) {
      const data: UserData = JSON.parse(userDataString);
      setUserData(data);
    }
  }, []);

  return (
    <div>
      <h1>Welcome to Cinema App</h1>
      {userData && (
        <div className="user-info">
          <p>Username: {userData.username}</p>
          <p>Name: {userData.name}</p>
          {userData.profilePicture && (
            <Image
              src={userData.profilePicture}
              alt="Profile Picture"
              width={500}
              height={500}
              unoptimized={true} // Use this only if your images are not served from an optimized source
            />
          )}
          {userData.isAdmin && <p>You have admin privileges.</p>}
        </div>
      )}
    </div>
  );
}
