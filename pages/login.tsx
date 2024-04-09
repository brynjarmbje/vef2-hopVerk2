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
      // Handle your login logic here
      Router.push('/'); // Redirect to home on success
    } catch (err) {
      setError('Login failed, please try again.');
    }
  };

  return (
    <>
      <Navbar />
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
          <button type="submit" className="submit-button">Log in</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default LoginPage;