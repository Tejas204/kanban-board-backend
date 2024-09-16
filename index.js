import { name } from 'ejs';
import express from 'express';

// Set up server
const app = express();

// Set up View engine
app.set("view engine", "ejs");

app.get("/getProducts", (req, res) => {
    res.render("index", {name: "Tejas"})
})

app.listen(5000, () => {
    console.log("Server is working");
})