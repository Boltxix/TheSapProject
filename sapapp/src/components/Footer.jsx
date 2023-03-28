import React from 'react'
import Logo from "../img/logo.png"

const Footer = () => {
  return (
    <footer className='footer'>
      <img src={Logo} alt="" />
      <span>Made with <b>React.Js</b></span>
    </footer>
  )
}

export default Footer