import { app } from "./app.js";
import { connectDB } from "./data/database.js";

//Connect with DB
connectDB();

//Server port
app.listen(5000, () => {
    console.log("Server is working");
});