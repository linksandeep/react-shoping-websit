import React, { useState } from "react";
import "./style.css";
import Menu from "./menuApi.js";
import ManuCard from "./ManuCard";
import { NavLink } from "react-router-dom";

const Gift=() => {
const [menuData, setMenuData]=useState(Menu);
const filterItem =(category)=>{
    const updatedList=Menu.filter((curElem)=>{
        return curElem.category===category;
    });
    setMenuData(updatedList);
};

    return( 
    <> 
    
    <nav className="navbar">
        <div className="btn-group">
            <button className="btn-group__item" onClick={ ()=>filterItem("men")}>men</button>
            <button className="btn-group__item" onClick={ ()=>filterItem("Women")}>Women</button>
            <button className="btn-group__item" onClick={ ()=>filterItem("adult")}>adult</button>
            <button className="btn-group__item" onClick={ ()=>setMenuData(Menu)}>all</button>
        </div>
    </nav>
  
    
{/* <img src="./images" alt=""/>
  <NavLink to="/">

  </NavLink> */}
    


    

  
    <ManuCard menuData= {menuData}/>
    
    </>
    
    );
};

export default Gift;










// <nav>
// <div className="menuIcom">
//     <ul className="navbar-list">
//         <li>
//             <NavLink to="/Login">Login</NavLink>
//         </li>
//         <li>
//             <NavLink to="/SignUp">SignUp</NavLink>
//         </li>
//     </ul>

// </div>
// </nav>