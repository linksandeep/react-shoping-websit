import React, { useState } from 'react';
import Header from "./landingPageHeader"
import Pdf from "./generatePDF.js"
import {Form, Button} from "react-bootstrap"
import "./Component.css"
import "./deliveryDetails.css"

function Details(){

    /*const [address, setAdd] = useState("");
    const [number, setNum] = useState("");
    const [name, setName] = useState("")
    const [confirmed, setConf] = useState(false);

    function updateName(event){
        setName(event.target.value);
        var nam = lz.compress(name);
        localStorage.setItem("name", nam)
    }

    function updateAddress(event){
        setAdd(event.target.value)
        var add = lz.compress(address)
        localStorage.setItem("address", add)
    }

    function updateNum(event){
        setNum(event.target.value)
        var num = lz.compress(number);
        localStorage.setItem("phnum", num);
    }*/

    function placeOrder(e){
        e.preventDefault();
    
        Pdf();
    }

    return (
        <div>
            <Header />
            {/*<h1 className="heading">Enter Your Delivery Details</h1>
            <div className="deliveryForm">
                <Form>
                    <Form.Control 
                        name = "Name"
                        type="text" 
                        placeholder="Enter Full Name" 
                        onChange={updateName}
                        value={name}
                    />
                    <Form.Control 
                        name = "address"
                        type="text" 
                        placeholder="Enter Delivery Address" 
                        onChange={updateAddress}
                        value={address}
                        as="textarea" 
                        rows={5}
                    />
                    <Form.Control 
                        name = "number"
                        type="text" 
                        placeholder="Enter Mobile Number" 
                        onChange={updateNum}
                        value={number}
                    />
                    <Form.Label> *Only Cash On Delivery Is Available</Form.Label>
                    {confirmed ?(
                        <div>
                            <h1 className="numberVerified">Number Verified!</h1>
                            <Button
                            className="outline-button"
                            type="submit"
                            onClick = {placeOrder}
                            >
                            Place order and download reciept
                            </Button>
                        </div>
                    ):(
                        <div>
                            <Button
                            className="outline-button"
                            type="submit"
                            onClick = {placeOrder}
                            >
                            Send OTP
                            </Button>
                            <div id="recaptcha"></div>
                        </div>
                    )
                    }
                   
                </Form>
                </div>*/}
                <h1 className="head">Order Placed Successfully !!</h1>
                <Button
                className="outline-button button"
                type="submit"
                onClick = {placeOrder}
                >
                Download Bill
                </Button>
        </div>

    )
}

//onClick={() => Pdf()}

export default Details;