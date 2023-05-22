const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const conn = await mongoose.connect("mongodb+srv://Sameer_Bajaj:sameerpriyanka@cluster0.qemwb.mongodb.net/Sameer-Project77", {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }catch(error){
        console.log(`Error: ${error.message}`)
        process.exit(1);
    }
}

module.exports = connectDB;