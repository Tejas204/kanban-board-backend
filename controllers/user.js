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

// Register new user
export const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    let user = await User.findOne({email});

    if(user){
        return res.render("login");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
        name: name,
        email: email,
        password: hashedPassword
    })

    res.redirect("/");
};

