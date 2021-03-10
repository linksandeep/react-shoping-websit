const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: Number},
    password: String,
    name: String,
    address: String,
    cart: {type: Array},
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;