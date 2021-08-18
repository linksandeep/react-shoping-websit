import React, { useState } from "react";
import axios from "axios";
import Header from "./landingPageHeader";
import {Redirect} from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "./Component.css";

function Login(){
    
    const [loginUserName, setUserName]= useState("");
    const [loginPassword, setPassword]= useState("");

    const [login, setLogin] = useState(false);

    const[correctness, setCorrectness]= useState(false);

    const[noAdmin, setNoAdmin]= useState(false);

    function updatePassword(event){
        if(noAdmin == true){
            setNoAdmin(false);
        }
        if(correctness == true){
            setCorrectness(false)
        }
        setPassword(event.target.value);
    };

    function updateUserName(event){
        if(noAdmin == true){
            setNoAdmin(false);
        }
        if(correctness == true){
            setCorrectness(false)
        }
        setUserName(event.target.value);
    };

    function onLoad(){
        const token = sessionStorage.getItem("admintoken");
        if(token == null){
            setLogin(false);
        }
        else{
            setLogin(true);
        }
    }

    window.onload = onLoad;

    function onSubmit(event){
        event.preventDefault();
        var user =  {
            username: loginUserName,
            password: loginPassword,
        }
        axios({
            method: "POST",
            data: user,
            withCredentials: true,
            url: "/api1/admin/adminLogin",
        }).then((res) => {
            if(res.data === "success"){
                console.log("success");
                setLogin(true);
                sessionStorage.setItem("admintoken", "jHsbakndcnjgoILCNOOL6514631d5as4cs5c16d");
                window.location.reload(false);
            }
            else if(res.data === "noAdmin"){
                setNoAdmin(true);
            }
            else{
                setCorrectness(true);
                console.log("failed")
            }
        });
    };
    
    if(login === true){
        console.log(login);
        return <Redirect to="/updateList" />
    }
    else{
        return (
            <div>
                <Header />
                <div className="login">
                    <h1 className="login-h1">Admin Authentication</h1>
                    <div className="login-form">
                        <Form>
                            <Form.Group>
                                <Form.Control 
                                    name="username"
                                    onChange={updateUserName}
                                    type="text" 
                                    placeholder="Enter Mobile Number"
                                    value = {loginUserName}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control 
                                    name="password"
                                    onChange={updatePassword}
                                    type="password" 
                                    placeholder="Enter Password"
                                    value = {loginPassword}
                                />
                            </Form.Group>
                            {correctness && (
                                <div>
                                    <p style={{color: "red"}}>Incorrect Password !!</p>
                                </div>
                            )}
                            {noAdmin && (
                                <div>
                                    <p style={{color: "red"}}>You do not have admin privileges !!</p>
                                </div>
                            )}
                            <Form.Group>
                                <Button
                                    className="outline-button"
                                    type="submit"
                                    onClick={onSubmit} 
                                >
                                Log In
                                </Button>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;