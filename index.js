import { name } from 'ejs';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import jwt from "jsonwebtoken";

// Set up server
const app = express();

//Using middlewares
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

// Set up View engine
app.set("view engine", "ejs");


//DB Connection
mongoose.connect("mongodb://localhost:27017/", {
    dbName : "SampleBackend"
})
.then(() => {console.log("DB Connected");})
.catch((e) => console.log(e));

//Define Scheema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

//Define model
const User = mongoose.model("User", userSchema);

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


// API: POST calls
app.post("/register", async (req, res) => {
    const {name, email, password} = req.body;

    let user = await User.findOne({email});

    if(user){
        console.log("User exists, please login.");
        return res.render("login");
    }

    user = await User.create({
        name: name,
        email: email,
        password: password
    })

    res.redirect("/");
});

app.post("/login", async (req, res) => {

    const {name, email} = req.body;
    
    let user = await User.findOne({email});

    if(!user){
        console.log("Please register first.")
        return res.redirect("/register");
    }

    const token = jwt.sign({_id: user._id}, "mySecret");

    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000)
    });

    res.redirect("/");
})

app.get("/logout", (req, res) => {
    res.cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now())
    });
    res.redirect("/");
})

//Server port
app.listen(5000, () => {
    console.log("Server is working");
})