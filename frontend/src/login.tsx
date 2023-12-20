import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        response;
        const result = await response.json();

        Cookies.set('token', result.token, { expires: 7, secure: false });

        navigate('/dashboard'); //
      } else {
        setError('Error during login');
      }
    } catch (error) {
      setError('Error during login');
      console.error('Error during login', error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white">
      <div className="bg-gray-700 p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Login Page</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form id="login" onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium">
              username:
            </label>
            <input
              type="username"
              id="username"
              className="mt-1 p-2 w-full border rounded-md bg-gray-600 text-gray-800"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded-md bg-gray-600 text-gray-800"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button
            id="login-button"
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Login
          </button>
        </form>
        <p className="mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
