import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to out Student Managmnet System</h1>
      <p>Here you can register as a student to the system and manage your information.</p>
      <Link className='button' to="/register">
        <button className='btn'>Register</button>
      </Link>
      <p>If you're an admin, you can access the admin page to modify student information</p>
      <Link className='button' to="/admin">
        <button className='btn'>Admin</button>
      </Link>
    </div>
  )
}

export default Home