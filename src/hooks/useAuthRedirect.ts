import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token, 'token:');

    if (token) {
      toast.success('You are already logged in!', {
        duration: 1500, // Display the notification for 2 seconds
      });

      // Redirect to the home page after 2 seconds (2000 milliseconds)
      const timer = setTimeout(() => {
        router.replace('/');
      }, 1500);

      // Clean up the timer when the component unmounts
      return () => clearTimeout(timer);
    }
  }, [router]);
};

export default useAuthRedirect;
