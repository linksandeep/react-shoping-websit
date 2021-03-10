import React, { useState} from 'react';
import {Button, Form, Card} from "react-bootstrap"
import Header from "./landingPageHeader";
import { Link, Redirect } from 'react-router-dom'
import "./cart.css"
import axios from "axios"
import Pdf from "./generatePDF.js"

function Cart(){

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState("");
    const [length, setLength] = useState("");
    const [redirect, setRedi] = useState(false);
    const [placed, setplaced] = useState(false);
    
    function updateCart(){
        var carts = JSON.parse(localStorage.getItem("itemsInCart"));
        if(carts == null){
            var t = [];
            localStorage.setItem("itemsInCart", JSON.stringify(t))
            carts = JSON.parse(localStorage.getItem("itemsInCart"));
        }
        setCart(carts);
    }

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
    
    function updateQuan(name){
      return function(event){
        var carts = JSON.parse(localStorage.getItem("itemsInCart"));
        var i;
        for(i=0;i<carts.length;i++){
          if(carts[i].itemName === name){
            carts[i].quantity = event.target.value;
            break
          }
        }
        localStorage.setItem("itemsInCart", JSON.stringify(carts));
        const user = {
          username: sessionStorage.getItem("username"),
          cart: carts
        }
        console.log(user);
        axios.post("/api1/user/updateCart", user)
            .then(res => {
                console.log(res);
            }
        );
        updateCart();
        calcTotal();
      }
    }

    function removeItem(obj){
      var carts = JSON.parse(localStorage.getItem("itemsInCart"));
      var i;
      for(i=0;i<carts.length;i++){
        if(carts[i].itemName === obj.itemName){
          carts.splice(i,1);
          break
        }
      }
      localStorage.setItem("itemsInCart", JSON.stringify(carts));
      const user = {
        username: sessionStorage.getItem("username"),
        cart: carts
      }
      console.log(user);
      axios.post("/api1/user/updateCart", user)
          .then(res => {
              console.log(res);
          }
      );
      updateCart();
      calcTotal();
    }

    function calcTotal(){
      var carts = JSON.parse(localStorage.getItem("itemsInCart"));
      if(carts == null){
        var t = [];
        localStorage.setItem("itemsInCart", JSON.stringify(t));
        carts = JSON.parse(localStorage.getItem("itemsInCart"));
      }
      var i,t=0;
      var tq=0;
      for(i=0;i<carts.length;i++){
        t=t+(carts[i].itemPrice*carts[i].quantity);
        tq = tq + Number(carts[i].quantity);
      }
      setTotal(t);
      setLength(tq);
    }

    
    window.onload = function() {
      calcTotal();
      updateCart();
      var bool = sessionStorage.getItem("logout");
      if(bool){
        getCart();
      }
    };

    function placeOrder(){
      var bool = sessionStorage.getItem("logout")
      if(bool){
        Pdf();
        setplaced(true);
        const user = {
          username: sessionStorage.getItem("username"),
          cart: []
        }
        console.log(user);
        axios.post("/api1/user/updateCart", user)
            .then(res => {
                console.log(res);
            }
        );
      }
      else{
        setRedi(true);
      }
      
    }
    if(redirect){
      return <Redirect to="/userLogin" />
    }
    else if(placed){
      return <Redirect to="/delivery" />
    }
    else{
      return (
        <div>
          <Header />
          <div className="a">
            <h1 className="cartHeading">Your Cart</h1>
            <div className="cart">
              {    
                cart.map((items, i) => {
                  return (
                      <div className="item-div" >
                        <Card className="cardf" style={{ width: '20rem' }}>
                          <Card.Img variant="top" src={items.Url} />
                          <Card.Body>
                            <Card.Title className="item-name">{items.itemName}</Card.Title>
                            <Card.Text className="item-price">
                            {items.itemPrice*items.quantity}/-
                            </Card.Text>
                            <div className="item-details">
                                <label className="qty-label">Qty: </label>
                                <Form className="item-qty">
                                  <Form.Control
                                    style={{width:"60px"}}
                                    type="number"
                                    value={items.quantity}
                                    onChange={updateQuan(items.itemName)}
                                  />
                                </Form>
                                <Button 
                                  className="remove-button"
                                  variant="danger"
                                  onClick={()=> removeItem(items)}
                                >
                                  Remove
                                </Button>
                              </div>
                          </Card.Body>
                      </Card>
                    </div>
                    )
                  })
              }
            </div>
              <div className="subtotal-div">
                <div className="subtotal-headings">
                  <h1 className="subtotal-heading">SubTotal ({length} item) : </h1>
                  <h1 className="subtotal-price-heading"> {total}/-</h1>
                </div>
                  <Button 
                    variant="warning" 
                    size="lg" 
                    block
                    className="proceed-to-buy-button"
                    onClick={placeOrder}
                  >
                    PLace Your Order
                  </Button>
              </div>
          </div>
          </div>
      );
    }
}

export default Cart