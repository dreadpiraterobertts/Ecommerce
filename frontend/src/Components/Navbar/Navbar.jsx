import React, { useContext, useState,useRef } from "react";
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import {BrowserRouter,Routes,Route, Link} from 'react-router-dom'
import { ShopContext } from "../../Context/ShopContext";
import dropdown from '../Assets/dropdownicon.png'
import search_icon from '../Assets/search_icon.png'


const Navbar = () =>{

    const [menu,setMenu] = useState("home");
    const {getTotalCartItems} = useContext(ShopContext)
    const  menuRef = useRef()

    const dropdown_toggle = (e)=>{
        menuRef.current.classList.toggle('nav-menu-visible')
        e.target.classList.toggle('open')
    }

    return(
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="" />
                {/* <p>SETOTA</p> */}
            </div>
            <img onClick={dropdown_toggle} className='nav-dropdown' src={dropdown} alt="" />
            <ul ref={menuRef} className="nav-menu">
            <li onClick={()=>setMenu("home")}><Link style={{textDecoration:'none'}} to='/' className={menu === "home" ? "nav-link selected" : "nav-link"}>Home</Link>{menu==="home"?<hr/>:<></>}</li>
            <li onClick={()=>setMenu("clothing")}><Link style={{textDecoration:'none'}} to='/clothing' className={menu === "clothing" ? "nav-link selected" : "nav-link"}>Clothing</Link>{menu==="clothing"?<hr/>:<></>}</li>
            <li onClick={()=>setMenu("grocery")}><Link style={{textDecoration:'none'}} to ='/grocery' className={menu === "grocery" ? "nav-link selected" : "nav-link"}>Grocery</Link>{menu==="grocery"?<hr/>:<></>}</li>
            <li onClick={()=>setMenu("sweets")}><Link style={{textDecoration:'none'}} to='/sweets' className={menu === "sweets" ? "nav-link selected" : "nav-link"}>Sweets</Link>{menu==="sweets"?<hr/>:<></>}</li>
            <li onClick={()=>setMenu("surprize")}><Link style={{textDecoration:'none'}} to='/surprize' className={menu === "surprize" ? "nav-link selected" : "nav-link"}>Surprize</Link>{menu==="surprize"?<hr/>:<></>}</li>

            </ul>
            <div className="nav-login-cart">
            <li className="search-icon" onClick={()=>setMenu("allproducts")}><Link to='/allproducts'><img src={search_icon} alt="" /></Link>{menu===""?<hr/>:<></>}</li>

                <Link to ='/cart' className="cart-icon"><img  src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
                
                {localStorage.getItem('auth-token')
                ?<button onClick={()=>{localStorage.removeItem('auth-token'); window.location.replace('/')} }>Logout</button>
                :<Link to ='/login'><button>Login</button></Link>}
            </div>
        </div>
    )
}

export default Navbar