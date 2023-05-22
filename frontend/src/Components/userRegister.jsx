import React, { useState } from "react";
import axios from "axios";
import "./userRegister.css";
import Header from "./landingPageHeader";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./Component.css";

function Register() {
  const [redirect, setRedirect] = useState(false);
  const [already, setAl] = useState(false);
  const [notavl, setavl] = useState(false);
  const [user, setUser] = useState({
    number: "",
    password: "",
    name: "",
    address: ""
  });

  function updateUser(events) {
    const { name, value } = events.target;
    setUser((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
    localStorage.setItem("phnum", events.target.number);
  }

  function updateAl() {
    setAl(true);
  }

  function registerUser(event) {
    console.log(user,'JKJKJKJKJKJKJKJHJHJHJHJHJHJHJH');
    
    axios.post("/api1/user/userRegister", user).then((res) => {
      console.log(res);
      if (res.data === "success") {
        console.log("success");
        sessionStorage.setItem(
          "token",
          "jHsbakndcnjgoILCNOOL6514631d5as4cs5c16d"
        );
        sessionStorage.setItem("logout", true);
        sessionStorage.setItem("username", user.number);
        setRedirect(true);
      } else {
        setavl(true);
      }
    });
    event.preventDefault();
  }

  function changeVisibility(e) {
    const password = document.querySelector("#password");
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
  }

  if (redirect === true) {
    return <Redirect to="/" />;
  } else if (already === true) {
    return <Redirect to="/userLogin" />;
  } else {
    return (
      <div>
        <Header />
        <h1 className="heading">Register Yourself</h1>
        <div className="RegisterForm">
          <Form>
            <Form.Control
              className="input"
              name="number"
              type="number"
              placeholder="Enter Mobile Number"
              onChange={updateUser}
              value={user.number}
            />
            {notavl && (
              <div>
                <h6 className="failed">
                  User with given number already exists. Try logging in.
                </h6>
              </div>
            )}
            <Form.Control
              id="password"
              className="input"
              name="password"
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
            <Button className="outline-button" type="submit" onClick={updateAl}>
              Already Have An Account
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Register;
