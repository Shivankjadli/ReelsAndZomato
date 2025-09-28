const mongoose = require('mongoose')


function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Mongo DB connected")
    })
    .catch((err) => {
        console.log("MongoDB connection error", err); 
    })
}


module.exports = connectDB;