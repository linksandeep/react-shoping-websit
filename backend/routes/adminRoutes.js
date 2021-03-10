const express = require("express");
const router = express.Router();
const passport = require("passport");

let User = require("../models/user.model");

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.post("/adminLogin", function(req, res){
    passport.authenticate("local", (err, user, info) => {
        if(err) throw err;
        if(!user) res.send("No User Exists");
        else{
            req.logIn(user, (err) => {
                //console.log(user);
                if (err) throw err;
                else if(user.isAdmin){
                    //console.log(user.isAdmin);
                    res.send("success");
                }
                else{
                    res.send("noAdmin");
                }
            });
        }
    })(req, res);
})


module.exports = router;