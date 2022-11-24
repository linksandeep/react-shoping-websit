import React, { useState } from "react";
import "./style.css";
import Menu from "./menuApi.js";
import ManuCard from "./ManuCard";

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
    {/* <nav className="login-navbar">
        <div className="btn-group-login">
            <button className="login_page">Login</button>
            <button className="login_page">SignUp</button>
        </div>
    </nav> */}
    <ManuCard menuData= {menuData}/>
    </>
    );
};

export default Gift;