import React, {useState} from "react";
import Header from "./landingPageHeader";
import {Form, Button} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import "./Component.css";
import "./userLogin.css"
import axios from "axios";

function Login(){

    const [user, setUser] = useState({
        username:"",
        password:""
    })

    const [loggedIn, setLogged] = useState(false);
    const [redirect, setRed] = useState(false);
    const [change, setChange] = useState(false);
    const [failed, setFailed] = useState(false);

    function onLoad(){
        const token = sessionStorage.getItem("token");
        if(token == null){
            setLogged(false);
        }
        else{
            setLogged(true);
        }
    }

    window.onload = onLoad;

    function updateUser(events){
        const {name, value} = events.target;
        setUser((prevValue) => {
            return{
                ...prevValue,
                [name]: value
            }
        })
    }

    function login(event){
        axios({
            method: "POST",
            data: user,
            withCredentials: true,
            url: "/api1/user/userLogin",
        }).then((res) => {
            if(res.data === "success"){
                console.log("success");
                setLogged(true);
                sessionStorage.setItem("token", "jHsbakndcnjgoILCNOOL6514631d5as4cs5c16d");
                sessionStorage.setItem("logout", true);
                sessionStorage.setItem("username", user.username);
                window.location.reload(false);
            }
            else{
                console.log("failed");
                setFailed(true);
            }
        });
        event.preventDefault();
    }

    function changePassword(){
        setChange(true);
    }

    function redirectRegister(){
        setRed(true);
    }

    if(loggedIn === true){
        return <Redirect to="/" />
    }
    else if(redirect === true){
        return <Redirect to="/userRegister" />
    }
    else if(change === true){
        return <Redirect to="/changePassword" />
    }
    else{
        return(
            <div>
                <Header show={false}/>
                <h1 className="heading">Login</h1>
                <div className="loginForm">
                    <Form>
                        <Form.Control 
                            type="text"
                            name="username"
                            placeholder="Enter Your Mobile Number"
                            onChange={updateUser}
                            value={user.username}
                        />
                        <Form.Control 
                            type="password"
                            name="password"
                            placeholder="Enter Your Password"
                            onChange={updateUser}
                            value={user.password}
                        />
                        {failed && (
                            <div>
                                <h6 className="failed">Either Username or password in incorrect  !!</h6>
                            </div>
                        )}
                        <Button
                            type="submit"
                            className="outline-button login-button"
                            onClick={login}
                        >
                            Login
                        </Button>
                        <Button
                            type="submit"
                            className="outline-button"
                            onClick={changePassword}
                        >
                            Forgot Password
                        </Button>
                        <Button
                            type="submit"
                            className="outline-button newAcc-Button"
                            onClick={redirectRegister}
                        >
                            Create A New Account
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Login