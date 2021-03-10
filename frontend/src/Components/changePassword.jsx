import React ,{useState}from "react"
import Header from "./landingPageHeader"
import "./Component.css"
import "./changePassword.css"
import { Form, Button, Popover, OverlayTrigger} from "react-bootstrap";
import firebase from "./firebase" 
import {Redirect} from "react-router-dom";
import axios from "axios"

function ChangePassword(){

    const [confirmed, setConf] = useState(false);
    const [number, setNum] = useState("");
    const [newPass, setPass] = useState("");
    const [redirect, setRed] = useState(false);

    function updateNum(event){
        setNum(event.target.value);
    }

    function updatePass(event){
        setPass(event.target.value);
    }

    function handleClick(e){
        e.preventDefault()
        let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
        let countryCode = "+91"
        let num = countryCode.concat(number)
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
                    console.log(error)
                })
            }
        })
    }

    function updatePassword(event){
        const user = {
            number: number,
            password: newPass
        }
        axios.post("/api1/user/updatePassword", user)
            .then(res => {
                if(res.data === "success"){
                    console.log("success");
                    setRed(true);
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
          <Popover.Title as="h2">Show Password</Popover.Title>
        </Popover>
    )
    if(redirect === true){
        return <Redirect to="/userLogin" />
    }
    else{
        return(
            <div>
                <Header />
                <h1 className="heading">Change Password</h1>
                <div>
                    {confirmed?(
                        <div className="changeForm">
                            <Form>
                                <Form.Control
                                    id="password" 
                                    name = "password"
                                    type="password" 
                                    placeholder="Enter New Password" 
                                    onChange={updatePass}
                                    value={newPass}
                                />
                                <OverlayTrigger trigger={"hover"} placement="bottom" overlay={popover}>
                                    <i 
                                    onClick={changeVisibility}
                                    className="fas fa-eye" 
                                    ></i>
                                </OverlayTrigger>
                                <Button
                                    className="outline-button"
                                    type="submit"
                                    onClick = {updatePassword}
                                    >
                                    Update Password
                                </Button>
                            </Form>
                        </div>
                    ):(
                        <div className="changeForm">
                            <Form>
                                <Form.Control 
                                    name = "number"
                                    type="number" 
                                    placeholder="Enter Mobile Number" 
                                    onChange={updateNum}
                                    value={number}
                                />
                                <Button
                                    className="outline-button"
                                    type="submit"
                                    onClick = {handleClick}
                                    >
                                    Send OTP
                                </Button>
                                <div id="recaptcha"></div>
                            </Form>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default ChangePassword;