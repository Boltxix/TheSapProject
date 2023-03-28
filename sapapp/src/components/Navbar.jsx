import React, { useContext } from 'react'
import Logo from "../img/logo.png"
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Navbar = () => {

  const{ currentUser,logout } = useContext(AuthContext);
  const isAdmin = currentUser && currentUser.role ==='admin'
  const isStudent = currentUser && currentUser.role ==='student'
  
  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <div className="links">
          <Link className='link' to="/">
            <h6>HOME</h6>
          </Link>
          {isAdmin &&(
            <Link className='link' to="/admin">
            <h6>ADMIN</h6>
          </Link>
          )}
          {isStudent &&(
            <Link className='link' to="/student">
            <h6>STUDENT</h6>
          </Link>
          )}
          <span>{currentUser?.username}</span>
          {currentUser ? <span onClick={logout}>Logout</span> : <Link className='Link' to='/login'><span>Login</span></Link>}
        </div>
      </div>
    </div>
  )
}

export default Navbar