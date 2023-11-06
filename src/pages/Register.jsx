import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import zxcvbn from 'zxcvbn';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const handleRegister = () => {
    if (username && email && password && confirmPassword && dateOfBirth && address && phoneNumber) {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (passwordStrength < 3) {
        setError('Password is weak. Please use a stronger password.');
        return;
      }

      // Add registration logic here (e.g., API call).

      setIsLoading(true);

      // Upon successful registration, redirect to login page.
      setTimeout(() => {
        setIsLoading(false);
        history.push('/login');
      }, 2000); // Simulate registration success for demo.

    } else {
      setError('Please fill in all fields');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const result = zxcvbn(e.target.value);
    setPasswordStrength(result.score);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-3 py-2 border rounded shadow-md focus:outline-none focus:ring focus:border-blue-300"
          />
          {password && (
            <div className={`password-strength-${passwordStrength}`}>
              Password Strength: {passwordStrength}
            </div>
          )}
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <input
            type="date"
            placeholder="Date of Birth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white rounded py-2"
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
        <p className="text-center mt-3">
          Already have an account?{' '}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => history.push('/login')}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
