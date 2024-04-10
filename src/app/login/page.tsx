'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Toaster, toast } from 'react-hot-toast';
import useAuthRedirect from '@/hooks/useAuthRedirect';

interface LoginResponse {
  access_token: string;
  user_id: number;
  username: string;
  name: string;
  profile_picture: string | null;
  isAdmin: boolean;
}

const LoginPage = () => {
  useAuthRedirect();
  const router = useRouter(); // Initialize useRouter hook
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isDisabled, setIsDisabled] = useState(false); // New state for managing button disabled state

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setError('');
    setIsDisabled(true);

    try {
      const response = await axios.post<LoginResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/login/`,
        {
          username,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          maxBodyLength: Infinity,
        }
      );

      const { access_token } = response.data;

      if (access_token) {
        // Stores user data and token in localStorage
        localStorage.setItem('token', access_token);
        const userData = {
          userId: response.data.user_id,
          username: response.data.username,
          name: response.data.name,
          profilePicture: response.data.profile_picture,
          isAdmin: response.data.isAdmin,
        };
        localStorage.setItem('userData', JSON.stringify(userData));

        // Redirecting to home page directly after setting user data
        router.push('/');
      } else {
        // Incase where access_token is not present in the response
        setError('Login failed, please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Login failed, please try again.');
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isDisabled}
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isDisabled}
            />
          </div>
          <button type="submit" className="submit-button" disabled={isDisabled}>
            Log in
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <div>
          <p>
            Don&apos;t have an account?
            <Link href="/signup"> Sign up here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
