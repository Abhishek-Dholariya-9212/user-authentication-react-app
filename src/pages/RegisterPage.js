import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

const RegisterPage = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const res = registerUser(form);
        if (res.error) {
            setError(res.error);
        } else {
            setError('');
            navigate('/login');
        }
    };

    return (
        <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-4">
            <div className="card">
                <div className="card-body">
                <h3 className="card-title text-center">Register</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={handleChange}
                    />
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Enter email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
                <div className="mt-3 text-center">
                    <Link to="/login">Back to Login</Link>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default RegisterPage;
