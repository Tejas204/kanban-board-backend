import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendCookies } from "../utils/features.js";


// Get all users
export const getAllUsers = async (req, res) => {
    const users = await User.find({});

    res.json({
        success: "true",
        users: users
    })
};

// Get user details
export const getUserDetails = (req, res) => {

    res.status(200).json({
        success: "true",
        user: req.user,
    })
};

// User Login
export const login = async (req, res) => {

    const {email, password} = req.body;

    const user = await User.findOne({email}).select("+password");

    if(!user){
        res.status(404).json({
            success: false,
            message: "Invalid email or password",
        })
    };

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        res.status(404).json({
            success: false,
            message: "Invalid email or password",
        })
    }

    sendCookies(user, res, `Welcome back, ${user.name}!`, 200);


}

// Register new user
export const registerUser = async (req, res) => {
    
    const {name, email, password} = req.body;

    let user = await User.findOne({email});

    if(user){
        res.status(404).json({
            success: false,
            message: "User already exists. Please log in."
        })
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
        name: name,
        email: email,
        password: hashedPassword
    });

    sendCookies(user, res, "Registered successfully", 201);

};

