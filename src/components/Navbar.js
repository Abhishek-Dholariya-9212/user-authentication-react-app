import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../services/authService';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar = () => {
  const user = getCurrentUser();
  console.log('Current user:', user);
  
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container d-flex justify-content-between">
        <Link className="navbar-brand" to="/">MyApp</Link>
        <div className="d-flex align-items-center">
          <Dropdown align="end">
            <Dropdown.Toggle variant="primary" id="dropdown-basic" className="d-flex align-items-center">
              <span className="me-2">
                <i className="bi bi-person-circle"></i>
              </span>
              {user?.user.name || 'User'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleChangePassword}>Change Password</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout} className="text-danger">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;