import express from "express";
import User from "../models/user";

const router = express.Router();

app.get("/users/all", async (req, res) => {
    const users = await User.find({});
    console.log(users)

    res.json({
        success: "true",
        users: users
    })
})

app.get("/user/userid", async (req, res) => {
    const token = req.cookies.token;
    
    const loggedInUser = jwt.verify(token, "mySecret");
    const loggedInUserId = loggedInUser._id;
    const user = await User.findById({loggedInUserId});

    res.json({
        success: "true",
        user: user
    })
    
})

export default router;