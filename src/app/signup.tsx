import { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';
import Navbar from './Navbar';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSignup = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setError('');

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/signup`, formData);
      Router.push('/login'); // Redirect to login on success
    } catch (err) {
      setError('Signup failed, please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <form onSubmit={handleSignup} className="signup-form">
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="submit-button">Sign up</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default SignupPage;