const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");
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
    const token = jwt.sign({id:user._id },process.env.JWT_SECRET);
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

    const token = jwt.sign({id:user._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(200).json({message: "User logged in successfully", user:{
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
    } 
});
}

 function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({message: "User logged out successfully"});
}

async function registerFoodPartner(req, res) {
    const { name, email, password } = req.body;
    const isPartnerAlreadyExists = await foodPartnerModel.findOne({ email});
    if(isPartnerAlreadyExists){
        return res.status(400).json({message: "Food Partner already exists"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const foodpartner = await foodPartnerModel.create({ name, email, password: hashedPassword });
    const token = jwt.sign({id:foodpartner._id },process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(201).json({message: "Food Partner registered successfully", foodpartner:{
        _id: foodpartner._id,
        name: foodpartner.name,
        email: foodpartner.email,       
    }, token});
}

async function loginFoodPartner(req, res) {
    const { email, password } = req.body;
    const foodpartner = await foodPartnerModel.findOne({ email
});
    if(!foodpartner){
        res.status(400).json({message: "Invalid email or password"});
    }
    const isPasswordValid = await bcrypt.compare(password, foodpartner.password);
    if(!isPasswordValid){
        return res.status(400).json({message: "Invalid email or password"});
    }
    const token = jwt.sign({id:foodpartner._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(200).json({message: "Food Partner logged in successfully", foodpartner:{
        _id: foodpartner._id,
        name: foodpartner.name,
        email: foodpartner.email,
    }, token});
}


function logoutFoodPartner(req, res) {
    res.clearCookie("token");
    res.status(200).json({message: "Food Partner logged out successfully"});
} 

module.exports = { registerUser, loginUser, logoutUser , registerFoodPartner, loginFoodPartner, logoutFoodPartner };