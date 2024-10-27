import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


// Get all users
export const getAllUsers = async (req, res) => {
    const users = await User.find({});

    res.json({
        success: "true",
        users: users
    })
};

// Get user details
export const getUserDetails = async (req, res) => {
    const token = req.cookies.token;
    
    const loggedInUser = jwt.verify(token, "mySecret");
    const loggedInUserId = loggedInUser._id;
    const user = await User.findById({loggedInUserId});

    res.json({
        success: "true",
        user: user
    })
};

// User Login
export const login = async (req, res) => {

    const {email, password} = req.body;


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

    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

    res.status(201).cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000
    }).json({
        success: true,
        message: "Registered successfully"
    });


};

