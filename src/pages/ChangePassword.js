import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCurrentUser } from '../services/authService';


const ChangePassword = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Assume user info is stored in localStorage under 'authUser' and password under 'authPassword'
  // (For demo only; in a real app, never store passwords in localStorage)
  const getAuthUser = () => {
    return JSON.parse(localStorage.getItem('authUser'));
  };
  const getAuthPassword = () => {
    return localStorage.getItem('password') || '';
  };

  const setAuthPassword = (newPassword) => {
    localStorage.setItem('password', newPassword);
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setError('Please fill all fields');
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    const storedPassword = getCurrentUser();
    const currentPassword = storedPassword.password
    
    if (form.currentPassword !== currentPassword) {
      setError('Current password is incorrect');
      return;
    }
    setIsSubmitting(true);
    try {
      // Update the password in localStorage
      setAuthPassword(form.newPassword);
      toast.success('Password changed successfully!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError('Failed to change password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Change Password</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter current password"
                    name="currentPassword"
                    value={form.currentPassword}
                    onChange={handleChange}
                    autoComplete="current-password"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter new password"
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm new password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Changing...' : 'Change Password'}
                </button>
              </form>
              <div className="mt-3 d-flex justify-content-between">
                <button
                  className="btn btn-link p-0"
                  onClick={() => navigate('/dashboard')}
                  style={{ textDecoration: "none" }}
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;