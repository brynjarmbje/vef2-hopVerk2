'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Image from 'next/image';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    // Function to handle the logout process
    const handleLogout = async () => {
      // Optional: Call your API to invalidate the session on the server side
      axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`);

      // Remove user data from local storage (or cookie)
      localStorage.removeItem('token');
      localStorage.removeItem('userData');

      // Display a success message
      toast.success('You have been logged out successfully!', {
        duration: 4000,
        position: 'top-center',
      });

      // Redirect to the home page or login page
      router.push('/login');
    };

    handleLogout();
  }, [router]);

  return (
    <div className="logout-container">
      <p>Logging out...</p>
      <Image
        src="../../../styles/spinner.svg"
        alt="spinner"
        width={50}
        height={50}
      />
    </div>
  );
};

export default Logout;
