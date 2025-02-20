import React, { useState } from 'react'
import { useAuth } from '../../components/providers/AuthProvider.jsx'
import './Login.css'
import { Link, useNavigate } from 'react-router'

export default function Login() {

    const { login, user } = useAuth();
    const navigate = useNavigate();

    if (user) {
        navigate('/profile');
    }

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
        navigate('/profile');
    };

  return (
    <div className='register-page'>
        <form onSubmit={handleSubmit}>
            <h3>Login</h3>

            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder='Email' name="email" value={formData.email} onChange={handleChange} />
            
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder='Password' name="password" value={formData.password} onChange={handleChange} />
            
            <button type="submit">Login</button>
        </form>

        <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  )
}
