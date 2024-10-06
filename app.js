import { name } from 'ejs';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userRouter from "./routes/user.js"
import { User } from './models/user.js';
import { connectDB } from './data/database.js';

// Set up server
export const app = express();

//Using middlewares
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(userRouter);
app.use(express.json());

// Set up View engine
app.set("view engine", "ejs");




//Authentication handler
const isAuthenticated = async (req, res, next) => {
    const token = req.cookies.token;
    if(token){
        const decoded = jwt.verify(token, "mySecret");
        req.user = await User.findById(decoded._id);
        next();
    }
    else{
        res.render("login");
    }
}

//API: GET calls
app.get("/", isAuthenticated, (req, res) => {
    res.render("logout", {name: req.user.name});
})

app.get("/register", (req, res) => {
    res.render("register");
})

app.get("/login", (req, res) => {
    res.render("login");
})


//Login: Create a token for existing users, else redirect to register page
app.post("/login", async (req, res) => {

    const {email, password} = req.body;
    
    let user = await User.findOne({email});

    if(!user){
        return res.redirect("/register");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.render("login", {message: "Incorrect password"});
    }

    const token = jwt.sign({_id: user._id}, "mySecret");

    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 180 * 1000)
    });

    res.redirect("/");
})

//Logout: Destroy the cookie and redirect to login page
app.get("/logout", (req, res) => {
    res.cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now())
    });
    res.redirect("/");
})

