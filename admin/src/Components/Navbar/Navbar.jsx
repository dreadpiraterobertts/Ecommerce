import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import navProfile from '../../assets/nav-profile.jpg'


const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='nav-logo' src={logo} alt="" />
      <img className='nav-profile' src={navProfile} alt="" />
      
    </div>
  )
}

export default Navbar
