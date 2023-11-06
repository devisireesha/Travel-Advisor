import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = () => {
    // Replace this logic with actual authentication logic.
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.username === username && u.password === password);
    
    if (user) {
      // If login is successful, you can store the user data in the session.
      sessionStorage.setItem('user', JSON.stringify(user));
      history.push('/'); // Replace 'dashboard' with your desired route.
    } else {
      // If login fails, you can display an error message or handle it as needed.
      alert('Invalid username or password');
    }
  };

  const handleRegister = () => {
    history.push('/register'); // Replace 'register' with your registration route.
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white rounded py-2"
        >
          Login
        </button>
        <p className="text-center mt-3">
          Don't have an account?{' '}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={handleRegister}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
