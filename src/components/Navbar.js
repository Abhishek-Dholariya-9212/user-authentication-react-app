import React from 'react';
import { getCurrentUser, logoutUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container d-flex justify-content-between">
        <a className="navbar-brand" href="#">MyApp</a>
        <div className="d-flex align-items-center">
          <span className="text-white me-3">Hello, {user?.name || 'User'}</span>
          <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
