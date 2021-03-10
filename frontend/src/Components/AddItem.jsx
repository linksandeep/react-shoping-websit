import React, { useState } from 'react';
import axios from "axios";
import {Form, Button} from "react-bootstrap"
import "./Component.css"

function Add(){
    const [item, setItem] = useState({
        itemName: "",
        itemPrice: "",
        imgUrl: ""
    });

    function addItem(events){
        const {name, value} = events.target;
        setItem((prevValue) => {
            return{
                ...prevValue,
                [name]: value
            };
        });
    }
    
    function onSubmit(event){
        console.log(item);
        setItem({
            itemName: "",
            itemPrice: "",
            imgUrl: ""
        })
        axios.post("/api1/items/add", item)
            .then(res => console.log(res.data));
    }
    
    return (
        <div>
            <h1>Add a new item</h1>
            <Form className="add-item-form">
                <Form.Group className="add-item-component">
                    <Form.Control
                        name="itemName"
                        onChange={addItem}
                        type="text" 
                        placeholder="Enter Item Name"
                        value = {item.name} 
                    />
                </Form.Group>
                <Form.Group className="add-item-component">
                    <Form.Control
                        name="itemPrice"
                        onChange={addItem}
                        type="number"  
                        placeholder="Enter Item Price" 
                        value = {item.price}
                    />
                </Form.Group>
                <Form.Group className="add-item-component">
                    <Form.Control
                        name="imgUrl"
                        onChange={addItem}
                        type="text"  
                        placeholder="Enter image URL" 
                        value = {item.imgUrl}
                    />
                </Form.Group>
                <Button className="add-item-button outline-button" type="submit" onClick={onSubmit}>Click To Add</Button>
            </Form>
        </div>
    );
}

export default Add;