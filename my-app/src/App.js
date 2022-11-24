import React from "react"; //if your using latest version so you don't need to write this
import Gift from "./component/Basic/GIft";
import Login from "./component/Basic/loginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./component/SignUp";


const App = () => {
    // return <Gift />
    // return <Login />
    return (
<>

<BrowserRouter>
<Routes>
    <Route path="SignUp" element={<SignUp />}/>
    <Route path="Login" element ={<Login />} />
</Routes>    
</BrowserRouter>
<Gift />
</>
)
};

export default App;
