const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemName: String,
    itemPrice: Number,
    imgUrl: String
},{
    timestamps: true,
});



const Item = mongoose.model("Item", itemSchema);


module.exports = Item;
