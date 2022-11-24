const Login = () =>{
    return (
        <>
        <form action="">
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email"></input>
            </div>
            <div>
                <label htmlFor="password">password</label>
                <input type="text" name="password" id="password"></input>
            </div>
            <button type="submit">login</button>
        </form>
        
       
            {/* <div className="web-login">
            <div className="second-page">
            <h1 className="login-title">Pleas fill the given details</h1>
            <form className="email">Email</form>
            <form className="pass">Password</form>
            </div>
            </div> */}
</>
    );
};

export default Login;