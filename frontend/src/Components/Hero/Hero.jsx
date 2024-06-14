import React from 'react'
import './Hero.css'
import logo from '../Assets/logo.png'

const Hero = () => {
  return (
    <div className='hero'>
      {/* <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
            <div className='hero-hand-icon'>
                <p>new</p>
                <img src={hand_icon} alt="" />
            </div>
            <p>collections</p>
            <p>for everyone</p>
        </div>
        <div className="hero-latest-btn">
            <div>Latest Collections</div>
            <img src={arrow_icon} alt="" />
        </div>
      </div> */}
      <div className="hero-right">
            <img src={logo} alt="" />
      </div>
    </div>
  )
}

export default Hero
