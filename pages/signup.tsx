import React, { useState } from 'react';
import Navbar from '../src/app/Navbar';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Implement the API call to the backend using the formData
  };

  return (
    <>
      <Navbar />
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields here */}
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default Signup;