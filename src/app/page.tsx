'use client'; // Add this line at the top of your file to mark the component for client-side execution
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  interface UserData {
    userId: number;
    username: string;
    name: string;
    profilePicture: string;
    isAdmin: boolean;
  }

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userDataString = localStorage.getItem('userData'); // Retrieve user data string from localStorage
    if (userDataString) {
      console.log(userDataString, 'userDataString:');
      const data = JSON.parse(userDataString);
      console.log(data);
      setUserData(data);
    }
  }, []);

  return (
    <div>
      <h1>Welcome to Cinema App</h1>
      {userData && (
        <div>
          <p>Username: {(userData as UserData).username}</p>
          <p>Name: {(userData as UserData).name}</p>
          <Image
            src={(userData as UserData).profilePicture}
            alt="Profile"
            width={500}
            height={500}
          />
          {(userData as UserData).isAdmin && <p>You have admin privileges.</p>}{' '}
        </div>
      )}
    </div>
  );
}
