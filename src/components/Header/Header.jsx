import React from 'react'
import { NavLink } from 'react-router'
import './Header.css'

export default function Header() {
  return (
    <header>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/articles">Articles</NavLink>
    </header>
  )
}
