import { name } from 'ejs';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

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
})

//Define model
const User = mongoose.model("User", userSchema);

//Authentication handler
const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;
    if(token){
        next();
    }
    else{
        res.render("login");
    }
}

//API
app.get("/", isAuthenticated, (req, res) => {
    res.render("logout");
})

app.post("/login", async (req, res) => {

    const {name, email} = req.body;
    const user = await User.create({
        name: name,
        email: email
    })

    res.cookie("token", user._id, {
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

app.listen(5000, () => {
    console.log("Server is working");
})