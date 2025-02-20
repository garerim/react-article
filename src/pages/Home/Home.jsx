import React from 'react'
import './Home.css'
import { Link } from 'react-router'

export default function Home() {
  return (
    <div className='home-page'>
      <h1>Welcome to the Home Page</h1>
      <p>Let's see some <Link to="/articles">articles</Link></p>
    </div>
  )
}
