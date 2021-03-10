const express = require("express");
const _ = require("lodash");
const router = express.Router();
let Item = require("../models/items.model");
const asyncHandler = require("express-async-handler");

router.get("/get" , asyncHandler(async (req, res) => {
    const items = await Item.find({});
    res.json(items);
}));

router.post("/update", (req, res) => {
    const name = _.capitalize(req.body.itemName);
    const price = req.body.itemPrice;

    Item.findOne({itemName: name}, function(err, found){
        if(found){
            Item.updateOne({itemName: name}, {itemPrice: price}, function(err){
                if(err){
                    res.json(err);
                }
                else{
                    res.json("Updated Successfully");
                }
            })
        }
        else{
            console.log("Item Name cannot be changed, try deleating and adding it again");
        }
    })
});

router.post("/add", (req, res) => {
    const name = _.capitalize(req.body.itemName);
    const price = req.body.itemPrice;
    const url = req.body.imgUrl;

    Item.findOne({itemName: name}, function(err, found){
        if(found){
            res.json("Item with similar name already exist");
        }
        else{
            const newItem = new Item({
                itemName: name,
                itemPrice: price,
                imgUrl: url
            })
            
            Item.insertMany(newItem, function(err){
                if(err){
                    res.json(err);
                }else{
                    res.json("Item Added");
                }
            })
        }
    })
});


router.post("/delete", (req, res) => {
    const name = req.body.value.itemName;
    console.log(name);
    Item.deleteOne({itemName: name}, function(err){
        if(err){
            res.json(err);
        }
        else{
            res.json("Item Deleted");
        }
    })
})

router.get("/search",(req, res) => {
    const keyWord = _.capitalize(req.body.itemName);
    Item.find({}, function(err, found){
        if(err){
            res.json(err);
        }else{
            res.json(found);
        }
    });
})

module.exports = router;