const express = require("express");
const cors = require('cors');
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const _ = require("lodash");
const path = require('path');
const connectDB = require("./config/db");

const itemRoutes = require("./routes/itemRoutes");
const adminRoutes = require("./routes/adminRoutes")
const userRoutes = require("./routes/userRoutes");

require("dotenv"). config();
const app = express();
const port = process.env.PORT||5000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Including cookie using local strategy.

app.use(session({
    secret: "our Little Secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize()); // Initializing PassPort
app.use(passport.session());    // Passport is dealing with session

// MongoDB Connection

connectDB();

// Routes

// Items 

app.use('/api1/items', itemRoutes);

// Admin

app.use('/api1/admin', adminRoutes);

// User

app.use('/api1/user', userRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
    });
};

app.listen(port, () => {
    console.log("Server Started Successfully on " + port);
});

