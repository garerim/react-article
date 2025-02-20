import React, { useState } from 'react'
import { useAuth } from '../../components/providers/AuthProvider.jsx'
import './Register.css'
import { Link, useNavigate } from 'react-router'

export default function Register() {

    const { register, user } = useAuth();
    const navigate = useNavigate();

    if (user) {
        navigate('/profile');
    }

    const [formData, setFormData] = useState({
        firstName: '',  
        lastName: '',
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
        register(formData);
    };

  return (
    <div className='register-page'>
        <form onSubmit={handleSubmit}>
            <h3>Register</h3>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" placeholder='First Name' name="firstName" value={formData.firstName} onChange={handleChange} />
            
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" placeholder='Last Name' name="lastName" value={formData.lastName} onChange={handleChange} />
            
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder='Email' name="email" value={formData.email} onChange={handleChange} />
            
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder='Password' name="password" value={formData.password} onChange={handleChange} />
            
            <button type="submit">Register</button>
        </form>

        <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}
