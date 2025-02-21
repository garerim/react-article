import React from 'react'
import { NavLink } from 'react-router'
import './Header.css'
import { useTheme } from '../providers/ThemeProvider'
import { Sun, Moon } from 'lucide-react'

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/articles">Articles</NavLink>
        <button className='theme-button' onClick={toggleTheme}>
        {theme === 'light' ? <Sun /> : <Moon />}
      </button>
    </header>
  )
}
