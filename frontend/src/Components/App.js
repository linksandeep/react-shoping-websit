import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import UpdateList from "./updateList";
import HomePage from "./homePage";
import Login from "./login";
import Cart from "./cart";
import Delivery from "./deliveryDetails";
import userRegister from "./userRegister";
import userLogin from "./userLogin";
import changePassword from "./changePassword"
import Footer from "./footer"

function App() {
  return (
    <div style={{position:"relative", minHeight: "100vh"}}>
      <div style={{paddingBottom:"2.5rem"}}>
        <Router>
          <Route path="/" exact component={HomePage} />
          <Route path="/updateList" component={UpdateList} />
          <Route path="/login" component={Login} />
          <Route path="/cart" component={Cart} />
          <Route path="/delivery" component={Delivery} />
          <Route path="/userLogin" component={userLogin} />
          <Route path="/userRegister" component={userRegister} />
          <Route path="/changePassword" component={changePassword} />
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;


