'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/authSlice';
import Loadingsvg from '@/components/Loadingsvg';


const Logout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Optional: Calling API to invalidate the session on the server side
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`);
      } catch (error) {
        console.error('Logout failed:', error);
      }

      dispatch(logout());

      // Remove user data from local storage (or cookie)
      localStorage.removeItem('token');
      localStorage.removeItem('userData');

      // Display a success message
      toast.success('You have been logged out successfully!', {
        duration: 4000,
        position: 'top-center',
      });

      // Redirect to the login page
      router.push('/login');
    };

    handleLogout();
  }, [dispatch, router]);

  return (
    <div className="logout-container">
      <p>Logging out...</p>
      <Loadingsvg
      />
    </div>
  );
};

export default Logout;
