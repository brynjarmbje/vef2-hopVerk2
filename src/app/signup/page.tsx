'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface SignupRequest {
  name: string;
  username: string;
  password: string;
}

interface SignUpResponse {
  message: string;
}

const SignupPage = () => {
  const [AccountSuccess, setAccountSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const Router = useRouter();

  const handleSignup = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setError('');

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/signup`,
        formData
      );
      setAccountSuccess(true);
      setTimeout(() => {
        Router.push('/login');
      }, 2000); 
    } catch (err) {
      console.log('This is the error: ', err);
      setError('Signup failed, please try again.');
    }
  };

  return (
    <>
      <div className="signup-container">
        <form onSubmit={handleSignup} className="signup-form">
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Sign up
          </button>
          {AccountSuccess && (
            <p className="success-message">
              Account for {formData.name && formData.username } successfully created , Redirecting to Login Page . . .
            </p>
          )}
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default SignupPage;
