import React , {useState} from "react"
import axios from "axios";
import "./userRegister.css"
import Header from "./landingPageHeader"
import { Form, Button, Popover, OverlayTrigger} from "react-bootstrap";
import firebase from "./firebase" 
import {Redirect} from "react-router-dom";
import "./Component.css"

function Register(){

    
    const [confirmed, setConf] = useState(false);
    const [failed, setFailed] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [already, setAl] = useState(false);
    const [notavl, setavl] = useState(false);
    const [user, setUser] = useState({
        number: "",
        password: "",
        name: "",
        address: ""
    })

    function updateUser(events){
        const {name, value} = events.target;
        setUser((prevValue) => {
            return{
                ...prevValue,
                [name]: value
            }
        })
        localStorage.setItem("phnum", events.target.number);
    }

    function updateAl(){
        setAl(true);
    }

    function handleClick(e){
        e.preventDefault()
        let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
        let countryCode = "+91"
        let num = countryCode.concat(user.number)
        firebase.auth().signInWithPhoneNumber(num, recaptcha).then(function(e){
            let code = prompt("Code", '')
            if(code == null){
                return;
            }
            else{
                console.log(e)
                e.confirm(code).then(function(result){
                    setConf(true);
                    console.log(result.user, 'user')
                    document.querySelector('label').textContent= result.user.phoneNumber + "Number Verified"
                    
                }).catch((error)=>{
                    setFailed(true)
                    console.log(error)
                })
            }
        })
    }

    function registerUser(event){
        console.log(user);
        axios.post("/api1/user/userRegister", user)
            .then(res => {
                console.log(res);
                if(res.data === "success"){
                    console.log("success");
                    sessionStorage.setItem("token", "jHsbakndcnjgoILCNOOL6514631d5as4cs5c16d");
                    sessionStorage.setItem("logout", true);
                    sessionStorage.setItem("username", user.number);
                    setRedirect(true);
                }
                else{
                    setavl(true);
                }
                
        });
        event.preventDefault();
    }

    function changeVisibility(e) {
        const password = document.querySelector('#password');
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
    };

    const popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h2s">Show Password</Popover.Title>
        </Popover>
    )

    if(redirect === true){
        return <Redirect to="/" />
    }
    else if(already === true){
        return <Redirect to="/userLogin" />
    }
    else{
        return (
            <div>
                <Header />
                <h1 className="heading">Register Yourself</h1>
                <div className="RegisterForm">
                    <Form>
                <Form.Control 
                    className="input"
                    name = "number"
                    type="number" 
                    placeholder="Enter Mobile Number" 
                    onChange={updateUser}
                    value={user.number}
                />
                {notavl && (
                            <div>
                                <h6 className="failed">User with given number already exists try logging in</h6>
                            </div>
                            )}
                {confirmed ?(
                        <div>
                            <h1 className="numberVerified">Number Verified!</h1>
                            <Form.Control
                                id="password" 
                                className="input"
                                name = "password"
                                type="password" 
                                placeholder="Enter Password" 
                                onChange={updateUser}
                                value={user.password}
                            />
                           <Form.Control 
                                className="input"
                                name="name"
                                type="text"
                                placeholder="Enter Your Name"
                                onChange={updateUser}
                                value={user.name}
                            />
                            <Form.Control 
                                className="input"
                                name="address"
                                type="text"
                                placeholder="Enter Your Address"
                                onChange={updateUser}
                                value={user.address}
                                as="textarea" 
                                rows={5}
                            />
                           <Button 
                                className="outline-button createAcc-button"
                                type="submit"
                                onClick={registerUser}
                            >
                            Create Account
                            </Button>
                        </div>
                        ):(
                        <div>
                            {failed && (
                            <div>
                                <h6 className="failed">Incorrect OTP !!</h6>
                            </div>
                            )}
                            <Button
                            className="outline-button sendOtp-button"
                            type="submit"
                            onClick = {handleClick}
                            >
                            Send OTP
                            </Button>
                            <Button
                            className="outline-button"
                            type="submit"
                            onClick={updateAl}
                            >
                            Already Have An Account
                            </Button>
                            <div id="recaptcha"></div>
                        </div>
                        )
                }
                </Form>
                </div>
            </div>
        );
    }
}

export default Register

