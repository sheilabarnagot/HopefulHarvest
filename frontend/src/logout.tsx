import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      Cookies.remove('token', { path: '/' });

      navigate('/');
    } catch (error) {
      console.error('Error during logout:', (error as Error).message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
