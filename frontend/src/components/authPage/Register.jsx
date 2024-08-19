import React, { useState } from 'react';
import axios from 'axios';

function Register({ setLogin }) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the form from submitting and refreshing the page
    setError('');
    setSuccess('');

    if (!name || !email || !password || !cpassword) {
      setError('All fields are required');
      return;
    }

    if (password !== cpassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3002/auth/register', {
        name,
        email,
        password,
        role: 'attendee', 
      });

      setSuccess('User registered successfully!');
      setName('');
      setEmail('');
      setPassword('');
      setCPassword('');
      setLogin(true); // Redirect to login page
      console.log("success",success)
    } catch (error) {
      setError(error.response.data.message || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <form
        className="flex flex-col gap-5 p-16 shadow-xl rounded-lg bg-slate-100 max-h-full max-w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            className="px-2 py-2 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            className="px-2 py-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            className="px-2 py-2 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="px-2 py-2 rounded-md"
            value={cpassword}
            onChange={(e) => setCPassword(e.target.value)}
          />
        </div>
        <div className="h-6 w-96">
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </div>
        <p>
          Already have an account?{' '}
          <span
            onClick={() => setLogin(true)}
            className="text-blue-400 cursor-pointer"
          >
            Login
          </span>
        </p>
        <button type="submit" className="bg-white rounded-full py-2 mx-5">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
