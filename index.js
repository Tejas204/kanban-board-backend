import { name } from 'ejs';
import express from 'express';
import path from 'path';

// Set up server
const app = express();

//Using middlewares
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.urlencoded({extended: true}));

// Set up View engine
app.set("view engine", "ejs");

app.get("/getProducts", (req, res) => {
    res.render("index", {name: "Tejas"})
})

app.listen(5000, () => {
    console.log("Server is working");
})