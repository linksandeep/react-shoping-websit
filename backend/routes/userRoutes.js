const express = require("express");
const router = express.Router();
const passport = require("passport");

let User = require("../models/user.model");

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.post("/userRegister", function(req, res){
    User.register({username: req.body.number, name:req.body.name, address:req.body.address}, req.body.password, function(err, user){
        if(err){
            res.send(err);
            console.log(err);
        }
        else{
            res.send("success");
        }
    })
})

router.post("/userLogin", function(req, res){
    passport.authenticate("local", (err, user, info) => {
        if(err) throw err;
        if(!user) res.send("No User Exists");
        else{
            req.logIn(user, (err) => {
                if (err) throw err;
                else{
                    res.send("success");
                }
            });
        }
    })(req, res);
})

router.get('/userLogout', function(req, res) {
    req.logout();
});

router.post("/updateUserInfo", function(req, res){
    User.findOne({username: req.body.number}, function(err, found){
        if(found){
            User.updateOne({number: req.body.number}, {name: req.body.name}, {address: req.body.address},function(err){
                if(err){
                    res.json(err);
                }
                else{
                    res.json("User Registered successfully");
                }
            })
        }
        else{
            console.log("user not found");
        }
    })
})

router.post("/updateCart", function(req, res){
    User.findOne({username: req.body.username}, function(err, found){
        if(found){
            //console.log(found);
            found.updateOne({cart: req.body.cart},function(err){
                if(err){
                    res.json(err);
                }
                else{
                    found.save((er, user) => {
                        if(er){
                            console.log(er);
                        }
                        else if(!user){
                            console.log("Problem Updating Your Password");
                        }
                        else{
                            res.json("Cart Updated successfully");
                        }

                    })
                    
                }
            })
        }
        else{
            console.log("user not found");
        }
    })
})

router.post("/getCart" , (req, res) => {
    User.findOne({username:req.body.username}, function(err, found){
        if(err){
            res.json(err);
        }
        else{
            //console.log(found);
            console.log("Hello");
            res.json(found);
        }
    })
});

router.post("/updatePassword", function(req, res){
    console.log(req.body);
    User.findOne({username: req.body.number}, function(e, found){
        if(found){
            found.setPassword(req.body.password, function(err, user){
                if(err) throw err;
                else{
                    found.save((er, user) => {
                        if(er){
                            console.log(er)
                        }
                        if(!user){
                            console.log("Problem resetting your password")
                        }
                        else{
                            res.send("success");
                            console.log("success");
                        }
                    })
                }
            })
        }
        else{
            console.log(e)
            console.log("User Not found");
        }
    })
   
})

module.exports = router;