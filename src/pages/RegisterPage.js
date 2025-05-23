import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

const RegisterPage = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [validation, setValidation] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const errors = {};
        if (!form.name.trim()) errors.name = "Name is required";
        if (!form.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
            errors.email = "Invalid email address";
        }
        if (!form.password) {
            errors.password = "Password is required";
        } else if (form.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }
        return errors;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setValidation({ ...validation, [e.target.name]: '' }); // clear validation for this field
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate();
        setValidation(errors);
        setError('');
        if (Object.keys(errors).length > 0) {
            return;
        }
        try {
            const res = registerUser(form);
            if (res.error) {
                setError(res.error);
            } else {
                setError('');
                navigate('/login');
            }
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-4">
            <div className="card">
                <div className="card-body">
                <h3 className="card-title text-center">Register</h3>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                        type="text"
                        className={`form-control ${validation.name ? 'is-invalid' : ''}`}
                        name="name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={handleChange}
                    />
                    {validation.name && <div className="invalid-feedback">{validation.name}</div>}
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className={`form-control ${validation.email ? 'is-invalid' : ''}`}
                        name="email"
                        placeholder="Enter email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    {validation.email && <div className="invalid-feedback">{validation.email}</div>}
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className={`form-control ${validation.password ? 'is-invalid' : ''}`}
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    {validation.password && <div className="invalid-feedback">{validation.password}</div>}
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