import { User } from "../models/user.js";
import jwt from "jsonwebtoken"

export const getAllUsers = async (req, res) => {
    const users = await User.find({});

    res.json({
        success: "true",
        users: users
    })
};

export const getUserDetails = async (req, res) => {
    const token = req.cookies.token;
    
    const loggedInUser = jwt.verify(token, "mySecret");
    const loggedInUserId = loggedInUser._id;
    const user = await User.findById({loggedInUserId});

    res.json({
        success: "true",
        user: user
    })
}

