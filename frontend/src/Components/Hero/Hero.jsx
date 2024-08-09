import React from 'react'
import './Hero.css'
import logo from '../Assets/logo.png'
import {BrowserRouter,Routes,Route, Link} from 'react-router-dom'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>Gift Shop</h2>
        <div>
            {/* <div className='hero-hand-icon'>
                <p>new</p>
                
            </div> */}
            <p>Setota Gifts</p>
            
        </div>
        <div className="hero-latest-btn">
            <Link to='/allproducts' style={{textDecoration:'none', color:'white'}}><div>Shop Now</div></Link>
           
        </div>
      </div>
      <div className="hero-right">
            <img src={logo} alt="" />
      </div>
    </div>
  )
}

export default Hero
