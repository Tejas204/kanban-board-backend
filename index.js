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

//API
app.get("/getProducts", (req, res) => {
    res.render("index", {name: "Tejas"})
})

app.get("/add", (req, res) => {
    res.send("nice")
})

app.listen(5000, () => {
    console.log("Server is working");
})