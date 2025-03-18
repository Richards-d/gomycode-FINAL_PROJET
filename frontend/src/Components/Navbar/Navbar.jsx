import React, { useContext, useRef } from "react";
import "./Navbar.css";
import logo from "../../assets/logo3.png"
import shopping_cart from "../../assets/cart.png"
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../../assets/dropdown_icon2.png"

const Navbar = () => {

    const [menu, setMenu] = useState("shop")
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) =>{
        menuRef.current.classList.toggle("nav-menu-visible");
        e.target.classList.toggle('open');
    }


    return (
        <div className="navbar">
            <div className="nav-logo">
                <Link to='/'><img src={logo} alt=""/></Link>
            </div>
            <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className="nav-menu">
                <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration: 'none', color: '#626262'}} to='/'>SHOP</Link>{menu ==="shop" ? <hr /> : <></>}</li>
                <li onClick={()=>{setMenu("clothes")}}><Link style={{textDecoration: 'none', color: '#626262'}} to='/clothes'>CLOTHES</Link>{menu ==="clothes" ? <hr /> : <></>}</li>
                <li onClick={()=>{setMenu("pants")}}><Link style={{textDecoration: 'none', color: '#626262'}} to='/pants'>PANTS</Link>{menu ==="pants" ? <hr /> : <></>}</li>
                <li onClick={()=>{setMenu("accessory")}}><Link style={{textDecoration: 'none', color: '#626262'}} to='/accessory'>ACCESSORY</Link>{menu ==="accessory" ? <hr /> : <></>}</li>

            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')
                ? <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
                : <Link to='/login'><button>Login</button></Link> }  
                <Link to='/cart'><img src={shopping_cart} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>

        </div>
    )
}

export default Navbar;