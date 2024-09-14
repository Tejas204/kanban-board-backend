import http from "http";
import {generatepercent} from "./features.js";

const server = http.createServer((req, res) => {
    console.log(generatepercent());
    res.end("<h1>Server is working</h1>")
});


server.listen(5000, () => {
    console.log("I am listening")
})