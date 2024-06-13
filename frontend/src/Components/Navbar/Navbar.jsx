import React, { useContext, useState,useRef } from "react";
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import {BrowserRouter,Routes,Route, Link} from 'react-router-dom'
import { ShopContext } from "../../Context/ShopContext";
import dropdown from '../Assets/dropdownicon.png'


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
            <li onClick={()=>setMenu("home")}><Link style={{textDecoration:'none'}} to='/'>Home</Link>{menu==="home"?<hr/>:<></>}</li>
            <li onClick={()=>setMenu("allproducts")}><Link style={{textDecoration:'none'}} to='/allproducts'>All Products</Link>{menu==="allproducts"?<hr/>:<></>}</li>
            <li onClick={()=>setMenu("men")}><Link style={{textDecoration:'none'}} to='/mens'>Men</Link>{menu==="men"?<hr/>:<></>}</li>
            <li onClick={()=>setMenu("women")}><Link style={{textDecoration:'none'}} to ='/womens'>Women</Link>{menu==="women"?<hr/>:<></>}</li>
            <li onClick={()=>setMenu("kids")}><Link style={{textDecoration:'none'}} to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
            </ul>
            
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')
                ?<button onClick={()=>{localStorage.removeItem('auth-token'); window.location.replace('/')} }>Logout</button>
                :<Link to ='/login'><button>Login</button></Link>}
                <Link to ='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar