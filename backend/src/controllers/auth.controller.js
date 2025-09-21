const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {

    const { fullName, email, password } = req.body;
    const isUserAlreadyExists = await userModel.findOne({ email});
    if(isUserAlreadyExists){
        return res.status(400).json({message: "User already exists"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({ fullName, email, password: hashedPassword });
    const token = jwt.sign({id:user._id },"ea42b685fedf463ee0977b0970c80f35");
    res.cookie("token", token);
    res.status(201).json({message: "User registered successfully", user:{
        _id: user._id,
        fullName: user.fullName,
        email: user.email,       
    }, token});
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email});   
    if(!user){
        res.status(400).json({message: "Invalid email or password"});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(400).json({message: "Invalid email or password"});
    }

    const token = jwt.sign({id:user._id },"ea42b685fedf463ee0977b0970c80f35");
    res.cookie("token", token);
    res.status(200).json({message: "User logged in successfully", user:{
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
    } 
});
}

module.exports = { registerUser, loginUser };