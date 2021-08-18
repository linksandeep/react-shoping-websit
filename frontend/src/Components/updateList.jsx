import React, { useState } from 'react';
import Search from "./searchForUpdateListPage";
import Add from "./AddItem";
import { Redirect } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import Header from "./landingPageHeader";


function UpdateList(){

    const [logIn, setLogin] = useState(true);

    function onLoad(event){
        const token = sessionStorage.getItem("admintoken");
        if(token == null){
            setLogin(false)
        }
    }

    window.onload = onLoad;

    function logout(){
        sessionStorage.removeItem("admintoken");
        setLogin(false);
        window.location.reload(false);
    }


    if(logIn === true){
        return (
            <div>
                <Header />
                <div className="add-item">
                    <Add />
                </div>
                <div className="search-bar">
                    <Search />
                </div>
                <Form className="logout-button">
                    <Button 
                        type="submit" 
                        onClick={logout} 
                    >
                    LogOut
                    </Button>
                </Form>
            </div>
        );
    }
    else{
        return <Redirect to="/login" />
    }
}

export default UpdateList;