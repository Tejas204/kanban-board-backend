import { name } from 'ejs';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';

// Set up server
const app = express();

//Using middlewares
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.urlencoded({extended: true}));

// Set up View engine
app.set("view engine", "ejs");

//DB Connection
mongoose.connect("mongodb://localhost:27017/", {
    dbName : "SampleBackend"
})
.then(() => {console.log("DB Connected");})
.catch((e) => console.log(e));

//Define Scheema
const schema = new mongoose.Schema({
    name: String,
    email: String,
})

//Define model
const Msg = mongoose.model("Message", schema);

//API
app.get("/getProducts", (req, res) => {
    res.render("index", {name: "Tejas"})
})

app.get("/add", async (req, res) => {
    await Msg.create({name:"Tejas", email:"tdhopavkar@gmail.com"});
    res.send("nice")
})

app.get("/login", (req, res) => {
    
})

app.listen(5000, () => {
    console.log("Server is working");
})