import React, { useState, useEffect} from 'react';
import axios from "axios";
import {Button,Form,Card} from "react-bootstrap"
import "./searchBar.css"
import "./Component.css"

function Search(){
    
    const [item, setItem] = useState("")
    const [list, setList] = useState([]);
    const [display, setDisplay] = useState(false);
    const [classNames, setClassName]= useState("");

    function startStopAnimation(){
        if(classNames === ""){
            setClassName("iconAnimate")
        }
        else{
            setClassName("");
        }
    };

    /*function animationFinished(){
        setClassName("");
    }*/

    function getCart(){
        const user = {
            username: sessionStorage.getItem("username"),
        }
        axios.post("/api1/user/getCart", user)
            .then(function(response){
                console.log(response.data.cart);
                const cart = response.data.cart;
                localStorage.setItem("itemsInCart", JSON.stringify(cart))
        })
    }
    
    function updateTemp(obj){
        const detail = {
            itemName: obj.itemName,
            itemPrice: obj.itemPrice,
            Url: obj.imgUrl,
            quantity: "1",
        }
        var cart = JSON.parse(localStorage.getItem("itemsInCart"));
        var t = [];
        if(cart==null){
            localStorage.setItem("itemsInCart", JSON.stringify(t))
            cart = JSON.parse(localStorage.getItem("itemsInCart"));
        }
        cart.push(detail);
        localStorage.setItem("itemsInCart", JSON.stringify(cart));
        //console.log(cart);
        const user = {
            username: sessionStorage.getItem("username"),
            cart: cart
        }
        console.log(user);
        axios.post("/api1/user/updateCart", user)
            .then(res => {
                console.log(res);
            }
        );
    }
    
    useEffect(() => {
        const updateDisplay = async () => {
            const {data} = await axios.get("/api1/items/get");
            setList(data)
            setDisplay(!display);
        }
        var bool = sessionStorage.getItem("logout");
        console.log(bool);
        if(bool){
            getCart();
        }
        updateDisplay()
    }, []);

    function updateItem(event){
        setItem(event.target.value);
    }

    const Speechrecognition = window.SpeechRecognition ||window.webkitSpeechRecognition;

    const recognition = new Speechrecognition();

    function recognizeSpeech(){

        recognition.start();

        recognition.onresult = function(event){
            console.log(event);
            const current = event.resultIndex;
            const transcript = event.results[current][0].transcript;
            setItem(transcript);
        }
        
    }

    return (
        <div>
            <Form>
                <Form.Control
                    className="home-page-search"
                    name="itemName"
                    onChange={updateItem}
                    type="text" 
                    placeholder="Search for an item .."
                    value = {item}
                />
                </Form>
                {/*<Button
                    className="speech-recog-button simple-button" 
                    onClick={recognizeSpeech}>
                    <i className="fas fa-microphone"></i>
                </Button>}
                */}
                {display && (
                    <div className="cards">
                            {list
                                .filter( name  => name.itemName.toLowerCase().indexOf(item.toLowerCase()) > -1)
                                .slice(0,9)
                                .map((value, key) => {
                                    return (
                                        <div key={value._id} className="icards">
                                            <Card>
                                                <Card.Img className="img" variant="top" src={value.imgUrl} alt="image" />
                                                <Card.Body>
                                                    <Card.Title style={{fontSize: "30px"}} >{value.itemName}</Card.Title>
                                                    <Card.Text><span>Price - </span>{value.itemPrice}<span>/-</span>  </Card.Text>
                                                    <Button 
                                                        onClick={(event) => {
                                                            startStopAnimation();
                                                            updateTemp(value)
                                                            setItem("");
                                                            event.preventDefault();
                                                            }
                                                        }
                                                        type="submit"
                                                        className="add-to-cart-button outline-button"
                                                    >
                                                    Add to cart
                                                    </Button>
                                                </Card.Body>
                                            </Card>
                                                    
                                        </div>
                                    );
                                })
                            }
                        </div>
                )}
        </div>
    )
}

export default Search;