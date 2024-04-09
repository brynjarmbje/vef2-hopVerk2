import { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';
import Navbar from '../src/app/Navbar';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
        username,
        password,
      });

      // Assuming the API returns a token on successful login
      const { token } = response.data;

      // You might want to store the token in a context, redux store, or local storage
      // For now, we'll just log the user in and redirect to the home page
      console.log('Login successful:', token);
      Router.push('/');
    } catch (err) {
      // Handle error responses from the API here
      setError('Failed to login. Please check your username and password.');
    }
  };

  return (
    <>
      <Navbar />
      <div >
        <form onSubmit={handleLogin} >
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">
              Log in
            </button>
          </div>
          {error && <p>{error}</p>}
        </form>
      </div>
    </>
  );
};

export default LoginPage;