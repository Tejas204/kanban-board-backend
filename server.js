import { app } from "./app.js";
import { connectDB } from "./data/database.js";

//DB Connection
connectDB();

//Server port
app.listen(5000, () => {
    console.log("Server is working");
})