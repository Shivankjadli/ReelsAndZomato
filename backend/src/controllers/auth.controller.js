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

async function loginUser(req, res) {}

module.exports = { registerUser, loginUser };