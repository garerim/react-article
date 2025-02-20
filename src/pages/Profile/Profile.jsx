import React from 'react'
import { useAuth } from '../../components/providers/AuthProvider'
import { Navigate } from 'react-router';
import './Profile.css';

export default function Profile() {

    const { user, logout } = useAuth();

    if (!user) {
        return <Navigate to="/login" />
    }

  return (
    <div className='profile-page'>
        <h1>Profile</h1>
        <p>Welcome {user.firstname} {user.lastname}</p>
        <p>Email: {user.email}</p>

        <button onClick={() => logout()}>Logout</button>
    </div>
  )
}
