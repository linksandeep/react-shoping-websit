import React, { useState} from 'react';
import axios from "axios";
import Update from "./updateItem"
import {Button,Table, Form} from "react-bootstrap"
import "./Component.css"


function Search(){
    const [item, setItem] = useState("")
    const [list, setList] = useState([]);
    const [display, setDisplay] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [tempObj, setTemp] = useState({
        itemName: "",
        itemPrice: ""
    });
    
    function updateTemp(obj){ 
        setTemp({
            itemName : obj.itemName,
            itemPrice: obj.itemPrice
        })
    }
    
    function updateDisplay(){
        axios.get("/api1/items/get")
            .then(function(response){
                setList(response.data)
            })
        setDisplay(!display);
    }

    function updateItem(event){
        setItem(event.target.value);
    }

     return (
        <div>
            <Form>
                <Form.Control
                    
                    name="itemName"
                    onChange={updateItem}
                    onClick={updateDisplay}
                    type="text" 
                    placeholder="Search for the item to delete or update ..."
                    value = {item}
                />
                {display && (
                    <div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Item Price</th>
                                    <th>Functions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {list
                                .filter( name  => name.itemName.toLowerCase().indexOf(item.toLowerCase()) > -1)
                                .map((value, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{value.itemName}</td>
                                            <td>{value.itemPrice}</td>
                                            <td>
                                                <Button onClick={(event) => {
                                                    setItem("")
                                                    setDisplay(!display)
                                                    event.preventDefault();
                                                    axios.post("/api1/items/delete", {value})
                                                        .then(
                                                            res => console.log(res.data),
                                                        );
                                                    }}
                                                    variant="outline-primary" type="submit"
                                                    className="delete-update-buttons outline-button"
                                                >
                                                <i class="fas fa-trash"></i>
                                                </Button>
                                                <Button 
                                                    onClick={(event) => {
                                                        updateTemp(value)
                                                        setItem("");
                                                        setShowModal(true);
                                                        event.preventDefault();
                                                        }
                                                    }
                                                    variant="outline-primary" type="submit"
                                                    className="delete-update-buttons outline-button"
                                                >
                                                <i class="fas fa-pen-alt"></i>
                                                </Button>
                                                <Update 
                                                    comodity={tempObj}
                                                    show={showModal}
                                                    onHide={() => {
                                                        setShowModal(false)
                                                        }
                                                    }
                                                />
                                                
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </Table>
                    </div>
                )}
            </Form>
        </div>
    )
}

export default Search;