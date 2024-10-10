import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    if (password.length > 28) {
      return 'Password must not exceed 28 characters.';
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    const success = login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen elegant-gradient">
      <div className="w-full max-w-md">
        <div className="elegant-card p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-elegant-800">Login</h2>
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-elegant-700 text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="elegant-input w-full py-2 px-3 text-elegant-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-elegant-700 text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="elegant-input w-full py-2 px-3 text-elegant-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password (8-28 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                maxLength={28}
                required
              />
              <p className="text-sm text-elegant-600">Password must be 8-28 characters long.</p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="elegant-button w-full text-center"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <Link to="/signup" className="text-elegant-600 hover:text-elegant-800 transition-colors">
              Don't have an account? Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;