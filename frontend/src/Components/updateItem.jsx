import React, { useState} from 'react';
import axios from "axios";
import {Modal, Button, Form} from "react-bootstrap"
import "./Component.css"

function Update(props){
    const [item, setItem] = useState({
        itemName: "",
        itemPrice: ""
    });

    function updateItem(events){
        console.log(events.target);
        setItem({
            itemName: props.comodity.itemName,
            itemPrice: events.target.value
        });
    }
    
    function onSubmit(event){
        console.log(item);
        axios.post("/api1/items/update", item)
            .then(res => console.log(res.data));
        window.location.reload(false);
    }


    return(
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div>
                    <Form>
                        <Form.Group>
                            <Form.Control 
                                name="itemPrice" 
                                onChange={updateItem} 
                                type="text" 
                                placeholder="Price" 
                                value={item.itemPrice} 
                                style= {{textAlign: "center"}} 
                            />
                            <Form.Text className="text-muted">Item name can not be changed try deleating and adding it again</Form.Text>
                        </Form.Group>
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className="outline-button" onClick={props.onHide} type="submit">Close</Button>
                <Button className="outline-button" onClick={onSubmit}  type="submit">Update</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Update;