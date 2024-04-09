'use client';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  user_id: number;
  username: string;
  name: string;
  profile_picture: string;
  isAdmin: boolean;
}

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const router = useRouter(); // Initialize useRouter hook

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('token', accessToken);
      router.push('/');
    }
  }, [accessToken, router]);

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setError('');

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
      if (accessToken) {
        const userData = {
          userId: response.data.user_id,
          username: response.data.username,
          name: response.data.name,
          profilePicture: response.data.profile_picture,
          isAdmin: response.data.isAdmin,
        };
        localStorage.setItem('userData', JSON.stringify(userData)); // Store user data as a string
      }
      setAccessToken(access_token);
    } catch (err) {
      console.error(err);
      setError('Login failed, please try again.');
    }
  };

  return (
    <>
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
            />
          </div>
          <button type="submit" className="submit-button">
            Log in
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default LoginPage;
