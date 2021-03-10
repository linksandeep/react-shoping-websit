import React, {useState} from "react";
import {Button} from "react-bootstrap"
import { Link } from 'react-router-dom'
import "./landingPageNavbar.css";
import axios from "axios"

function Header(){

    const [clicked, setClicked] = useState(false)
   

    function updateClicked(){
        setClicked(!clicked);
    }
 
    function onClick(){
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("logout");
        localStorage.removeItem("itemsInCart");
        axios.post("/api1/user/userRegister", {username:sessionStorage.getItem("username")})
            .then(res => {
                console.log(res);
            })
        sessionStorage.removeItem("username");

    }
    

   return (
        <div>
            <nav className="NavbarItems">
                <h1 className="navbar-logo"><Link target='_parent' to="/" style={{textDecoration:"none",color:"white"}}><i className="fas fa-store"></i>Shop</Link></h1>
                <div className="menu-icon">
                    <i onClick={updateClicked} className={clicked?"fas fa-times":"fas fa-bars"}></i>
                </div>
                <ul className={clicked?"nav-menu active":"nav-menu"}>
                    {sessionStorage.getItem("logout")?(
                        <div>
                            <li><Link target='_parent' className="nav-links" to="/" onClick={onClick}>Logout</Link></li>
                        </div>
                    ):(
                        <div>
                            <li><Link target='_parent' className="nav-links" to="/userLogin">User Login</Link></li>
                        </div>
                    )}
                    <li><Link target='_parent' className="nav-links" to="/login">Admin Login</Link></li>
                    <li><Link target='_parent' className="nav-links" to="/">About Us</Link></li>
                </ul>
            </nav>
            <Link 
                to='/cart' 
                target='_parent' 
                className="cart-button-link"
            >
                <Button className="cart-button">
                    <i className="fas fa-shopping-cart"></i>
                </Button>
            </Link>
        </div>
    );
   
}

export default Header;